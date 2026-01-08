export default async function CategoryPage({ params }) {
  const { slug } = params;

  const catRes = await fetch(
    `https://www.williamjacket.com/blog/wp-json/wp/v2/categories?slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const categories = await catRes.json();
  if (!categories.length) return notFound();

  const postsRes = await fetch(
    `https://www.williamjacket.com/blog/wp-json/wp/v2/posts?categories=${categories[0].id}&_embed`,
    { next: { revalidate: 60 } }
  );
  const posts = await postsRes.json();

  const featured = posts[0];
  const smallPosts = posts.slice(1, 5);
  const listPosts = posts.slice(5);

  const getImage = (post) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-[150px]">
      {/* 1️⃣ CATEGORY TITLE */}
      <h1 className="text-3xl font-bold mb-6">
        {categories[0].name}
      </h1>

      {/* 2️⃣ FEATURED ROW */}
      {featured && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <img
            src={getImage(featured)}
            alt={featured.title.rendered}
            className="w-full h-80 object-cover rounded"
          />

          <div>
            <h2
              className="text-2xl font-semibold mb-3"
              dangerouslySetInnerHTML={{ __html: featured.title.rendered }}
            />

            <div
              className="text-gray-600 mb-4"
              dangerouslySetInnerHTML={{
                __html: featured.excerpt.rendered,
              }}
            />

            <a
              href={`/${featured.slug}`}
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded"
            >
              Read More
            </a>
          </div>
        </div>
      )}

      {/* 3️⃣ STORIES FOR YOU */}
      <h2 className="text-xl font-semibold mb-4">
        Stories for you
      </h2>

      {/* 4️⃣ FOUR SMALL POSTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {smallPosts.map((post) => (
          <a
            key={post.id}
            href={`/${post.slug}`}
            className="block"
          >
            <img
              src={getImage(post)}
              alt={post.title.rendered}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3
              className="text-xs font-medium"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </a>
        ))}
      </div>

      {/* 5️⃣ LIST POSTS (YAHOO STYLE ROWS) */}
      <div className="space-y-8">
        {listPosts.map((post) => (
          <div
            key={post.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 border-b pb-6"
          >
            <img
              src={getImage(post)}
              alt={post.title.rendered}
              className="w-full h-40 object-cover rounded"
            />

            <div className="md:col-span-3">
              <h2
                className="text-xl font-semibold mb-2"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div
                className="text-gray-600 mb-3"
                dangerouslySetInnerHTML={{
                  __html: post.excerpt.rendered,
                }}
              />

              <a
                href={`/${post.slug}`}
                className="text-blue-600 font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
