import Link from "next/link";
import Hero from "@/components/Home/Hero";

export const revalidate = 60;

export default async function HomePage() {
  let categories = [];

  try {
    const categoryRes = await fetch(
      "https://www.williamjacket.com/blog/wp-json/wp/v2/categories?per_page=20",
      { next: { revalidate: 60 } }
    );
    if (categoryRes.ok) {
      categories = await categoryRes.json();
    }
  } catch (error) {
    console.error("Category API error:", error);
  }

  return (
    <main className="pt-20">
      <Hero />

      {/* 🔥 Loop through each category and render 5 posts */}
      {categories.length > 0 ? (
        categories.map(async (cat) => {
          let posts = [];

          try {
            const postRes = await fetch(
              `https://www.williamjacket.com/blog/wp-json/wp/v2/posts?categories=${cat.id}&per_page=5&_embed`,
              { next: { revalidate: 60 } }
            );
            if (postRes.ok) posts = await postRes.json();
          } catch (err) {
            console.error(`Post API error for category ${cat.slug}`, err);
          }

          if (posts.length === 0) return null;

          return (
            <section
              key={cat.id}
              className="max-w-6xl mx-auto px-6 py-14 border-b last:border-none"
            >
              {/* Title + view all button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">{cat.name}</h2>
                <Link
                  href={`/${cat.slug}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  View All →
                </Link>
              </div>

              {/* Posts grid */}
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {posts.map((post) => {
                  const image =
                    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg";

                  return (
                    <Link
                      key={post.id}
                      href={`/${cat.slug}/${post.slug}`}
                      className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-xl border transition-all group"
                    >
                      <img
                        src={image}
                        alt={post.title.rendered}
                        className="w-full h-36 object-cover rounded-lg mb-4"
                        loading="lazy"
                      />

                      <h3 className="text-lg font-semibold group-hover:text-blue-600 line-clamp-2">
                        {post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                      </h3>

                      <div
                        className="text-gray-600 text-sm mt-2 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                      />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })
      ) : (
        <p className="text-center text-gray-500 py-20 text-lg">
          Categories are being updated — please check again soon.
        </p>
      )}
    </main>
  );
}
