import { notFound } from "next/navigation";
import BlogPostClient from "@/components/BlogPostClient";

export const revalidate = 60;

// Utility function to extract headings from content
function extractHeadings(html) {
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
  const headings = [];
  let match;
  while ((match = regex.exec(html))) {
    const level = match[1];
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    const id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
    headings.push({ level, text, id });
  }
  return headings;
}

export default async function PostPage({ params }) {
  // ✅ Wait for params
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  try {
    // ✅ Fetch post by slug
    const res = await fetch(
      `https://sxentra.com/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      console.error("⚠️ Failed to fetch post data");
      notFound(); // trigger 404
    }

    const posts = await res.json();
    const post = posts?.[0];

    // ✅ If post doesn’t exist → show 404
    if (!post) notFound();

    // ✅ Extract headings for Table of Contents
    const headings = extractHeadings(post.content.rendered);

    // Add anchor IDs to headings
    let contentWithAnchors = post.content.rendered;
    headings.forEach((h) => {
      const pattern = new RegExp(
        `<h${h.level}[^>]*>\\s*(${escapeRegExp(h.text)})\\s*<\\/h${h.level}>`,
        "g"
      );
      contentWithAnchors = contentWithAnchors.replace(
        pattern,
        `<h${h.level} id="${h.id}">$1</h${h.level}>`
      );
    });

    return (
      <BlogPostClient
        post={post}
        headings={headings}
        content={contentWithAnchors}
        categorySlug={category}
      />
    );
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    notFound(); // ✅ fallback to 404 page
  }
}

// Helper to escape regex characters safely
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
