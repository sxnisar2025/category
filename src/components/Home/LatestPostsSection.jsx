import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // Rebuild every 60s with ISR

export default async function LatestPostsSection() {
  // ✅ Fetch latest 3 posts from WordPress
  const res = await fetch(
    "https://sxentra.com/wp-json/wp/v2/posts?per_page=3&_embed",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    console.error("❌ Failed to fetch latest posts");
    return null;
  }

  const posts = await res.json();

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Latest Insights
          </h2>
          <p className="text-gray-600">
            Stay updated with the newest trends and articles from SXENTRA.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => {
            const featured =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <article
                key={post.id}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Image */}
                {featured && (
                  <Image
                    src={featured}
                    alt={post.title.rendered}
                    width={400}
                    height={250}
                    className="w-full h-52 object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-3 hover:text-blue-600 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />

                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered,
                    }}
                  />

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block text-blue-600 font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
