import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function CategoryPage({ params }) {
  const { category } = params;

  try {
    // ✅ Step 1: Fetch category info
    const categoryRes = await fetch(
      `https://sxentra.com/wp-json/wp/v2/categories?slug=${category}`,
      { next: { revalidate: 60 } }
    );

    if (!categoryRes.ok) throw new Error("Failed to fetch category data");
    const categoryData = await categoryRes.json();
    if (!categoryData.length) notFound();

    const categoryId = categoryData[0].id;

    // ✅ Step 2: Fetch posts by category
    const postsRes = await fetch(
      `https://sxentra.com/wp-json/wp/v2/posts?categories=${categoryId}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!postsRes.ok) throw new Error("Failed to fetch posts");
    const posts = await postsRes.json();
    if (!posts.length) notFound();

    // ✅ Split posts into sections
    const latestPost = posts[0];
    const nextFive = posts.slice(1, 6);
    const remaining = posts.slice(6);

    return (
      <div className="max-w-7xl mx-auto p-6 pt-36">
      <main className="max-w-5xl  ">
        {/* Page Title */}
        <h1 className="text-4xl font-bold mb-10 capitalize">
          {categoryData[0].name}
        </h1>
        

        {/* ✅ Section 1 — Latest Post */}
        {latestPost && (
          <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src={
                latestPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/placeholder.jpg"
              }
              alt={latestPost.title.rendered}
              className="w-full h-80 object-cover rounded-xl shadow-md"
              loading="lazy"
            />
            <div>
              <Link href={`/${category}/${latestPost.slug}`}>
                <h2
                  className="text-3xl font-bold mb-4 hover:text-blue-600 transition"
                  dangerouslySetInnerHTML={{ __html: latestPost.title.rendered }}
                />
              </Link>
              <div
                className="text-gray-700 mb-6 line-clamp-4"
                dangerouslySetInnerHTML={{
                  __html: latestPost.excerpt.rendered,
                }}
              />
              <Link
                href={`/${category}/${latestPost.slug}`}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Read Full Story →
              </Link>
            </div>
          </section>
        )}

        {/* ✅ Section 2 — 5-Column Highlights */}
        {nextFive.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Top Stories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {nextFive.map((post) => (
                <Link
                  key={post.id}
                  href={`/${category}/${post.slug}`}
                  className="block bg-white border rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "/placeholder.jpg"
                    }
                    alt={post.title.rendered}
                    className="w-full h-32 object-cover"
                    loading="lazy"
                  />
                  <h5
                    className="text-sm font-medium p-3 hover:text-blue-600"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ✅ Section 3 — Remaining Posts */}
        {remaining.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">More Articles</h2>
            <div className="space-y-8">
              {remaining.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col md:flex-row gap-6 border-b pb-6"
                >
                  <img
                    src={
                      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                      "/placeholder.jpg"
                    }
                    alt={post.title.rendered}
                    className="w-full md:w-60 h-40 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <Link href={`/${category}/${post.slug}`}>
                      <h3
                        className="text-xl font-semibold mb-3 hover:text-blue-600"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />
                    </Link>
                    <div
                      className="text-gray-600 text-sm mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />

                    {/* ✅ Added Button */}
                    <Link
                      href={`/${category}/${post.slug}`}
                      className="inline-block text-blue-600 font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      </div>
    );
  } catch (error) {
    console.error("⚠️ WordPress API fetch error:", error);
    notFound();
  }
}
