import Link from "next/link";
import { notFound } from "next/navigation"; // ✅ import this

export const revalidate = 60;

export default async function CategoryPage({ params }) {
  const { category } = params;

  try {
    // ✅ Step 1: Fetch category by slug
    const categoryRes = await fetch(
      `https://sxentra.com/wp-json/wp/v2/categories?slug=${category}`,
      { next: { revalidate: 60 } }
    );

    if (!categoryRes.ok) throw new Error("Failed to fetch category data");
    const categoryData = await categoryRes.json();

    if (!categoryData.length) {
      notFound(); // ✅ trigger Next.js 404 page
    }

    const categoryId = categoryData[0].id;

    // ✅ Step 2: Fetch posts in that category
    const postsRes = await fetch(
      `https://sxentra.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!postsRes.ok) throw new Error("Failed to fetch posts");

    const posts = await postsRes.json();

    if (!posts.length) {
      notFound(); // ✅ also trigger 404 if no posts found
    }

    // ✅ Step 3: Render category page
    return (
      <main className="max-w-6xl mx-auto p-8 pt-36">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {categoryData[0].name}
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border rounded-2xl p-6 shadow-sm hover:shadow-md bg-white"
            >
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <img
                  src={post._embedded["wp:featuredmedia"][0].source_url}
                  alt={post.title.rendered}
                  className="w-full h-52 object-cover rounded-lg mb-4"
                />
              )}

              <Link href={`/${category}/${post.slug}`}>
                <h2
                  className="text-2xl font-semibold mb-3 hover:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Link>

              <div
                className="text-gray-600 text-sm"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />

              <Link
                href={`/${category}/${post.slug}`}
                className="inline-block mt-4 text-blue-500 font-medium hover:underline"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error("⚠️ WordPress API fetch error:", error);
    notFound(); // ✅ fallback if API fails entirely
  }
}
