import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const { postSlug } = params;

  const res = await fetch(
    `https://www.williamjacket.com/blog/wp-json/wp/v2/posts?slug=${postSlug}&_embed`
  );

  const posts = await res.json();

  if (!posts.length) return notFound();

  const post = posts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 mt-[150px]">
    <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

      <div
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
    </div>
  );
}
