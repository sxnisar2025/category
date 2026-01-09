"use client";

import Link from "next/link";

export default function HomeFilter({ data = [] }) {
  // ✅ HARD GUARD (prevents crash forever)
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const allPosts = data.flatMap((cat) => cat.posts || []);

  const featured = allPosts[0];
  const tinyPosts = allPosts.slice(1, 5);

  const getImage = (post) =>
    post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="max-w-5xl mx-auto px-4 mt-20">

      {/* FEATURED */}
      {featured && (
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <img
            src={getImage(featured)}
            alt={featured.title.rendered}
            className="w-full h-96 object-cover rounded"
            
          />

          <div>
            <h2
              className="text-3xl font-bold mb-4"
              dangerouslySetInnerHTML={{ __html: featured.title.rendered }}
            />
            <div
              className="text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: featured.excerpt.rendered }}
            />
            <Link
              href={`/${featured.slug}`}
              className="bg-blue-600 text-white px-6 py-3 rounded inline-block"
            >
              Read More...
            </Link>
          </div>
        </div>
      )}

      {/* TINY POSTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {tinyPosts.map((post) => (
          <Link key={post.id} href={`/${post.slug}`}>
            <img
              src={getImage(post)}
              alt=""
              className="h-36 w-full object-cover rounded mb-2"
            />
            <h6
              className="text-sm font-medium"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </Link>
        ))}
      </div>

      {/* STORIES FOR YOU */}
      <h2 className="text-2xl font-bold mb-6">
  Stories for you
</h2>

<div className="space-y-12">
  {data.map((cat) => {
    const post = cat.posts?.[0];
    if (!post) return null;

    return (
      <div
        key={cat.id}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-8"
      >
        {/* IMAGE */}
        <img
          src={getImage(post)}
          alt={post.title.rendered}
          className="w-full h-44 object-cover rounded"
        />

        {/* CONTENT */}
        <div className="md:col-span-3">
          {/* CATEGORY */}
          <span className="text-xs uppercase tracking-wide text-gray-500">
            {cat.name}
          </span>

          {/* TITLE */}
          <h3
            className="text-xl font-semibold mt-1 mb-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* DESCRIPTION */}
          <div
            className="text-gray-600 text-sm mb-4"
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />

          {/* CTA */}
          <a
            href={`/category/${cat.slug}`}
            className="text-blue-600 font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
}
