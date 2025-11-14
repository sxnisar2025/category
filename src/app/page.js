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
    if (categoryRes.ok) categories = await categoryRes.json();
  } catch (error) {
    console.error("Category API error:", error);
  }

  // ❗ Fetch posts for all categories first — avoids async map issue
  const categoryWithPosts = await Promise.all(
    categories.map(async (cat) => {
      try {
        const res = await fetch(
          `https://www.williamjacket.com/blog/wp-json/wp/v2/posts?categories=${cat.id}&per_page=8&_embed`,
          { next: { revalidate: 60 } }
        );
        const posts = res.ok ? await res.json() : [];
        return { ...cat, posts };
      } catch {
        return { ...cat, posts: [] };
      }
    })
  );

  return (
    <main className="pt-20">
      <Hero />

      {categoryWithPosts.map((cat) => {
        if (cat.posts.length < 3) return null; // Skip category with too few posts

        const [bigPost, post2, post3, ...remaining] = cat.posts;

        return (
          <section
            key={cat.id}
            className="max-w-7xl mx-auto px-6 py-16 border-b last:border-none"
          >
            {/* Title */}
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-4xl font-bold">{cat.name}</h2>
              <Link
                href={`/${cat.slug}`}
                className="text-blue-600 hover:underline font-medium"
              >
                View All →
              </Link>
            </div>

            {/* 🔥 Row 1: Layout 1 big + 2 small */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
              {/* Left big post */}
              <Link
                href={`/${cat.slug}/${bigPost.slug}`}
                className="group col-span-2"
              >
                <img
                  src={
                    bigPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg"
                  }
                  alt={bigPost.title.rendered}
                  className="w-full h-[380px] object-cover rounded-xl mb-5"
                />
                <h3 className="text-3xl font-bold group-hover:text-blue-600 mb-4">
                  {bigPost.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                </h3>
                <div
                  className="text-gray-700 text-lg line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: bigPost.excerpt.rendered }}
                />
              </Link>

              {/* Right side two posts */}
              <div className="flex flex-col gap-8">
                {[post2, post3].map((post) => (
                  <Link
                    key={post.id}
                    href={`/${cat.slug}/${post.slug}`}
                    className="group flex flex-col"
                  >
                    <img
                      src={
                        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.jpg"
                      }
                      alt={post.title.rendered}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-xl font-semibold group-hover:text-blue-600 mb-2">
                      {post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                    </h4>
                    <div
                      className="text-gray-600 text-sm line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* 🔵 Row 2: 5-post grid */}
            {remaining.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {remaining.slice(0, 5).map((post) => (
                  <Link
                    key={post.id}
                    href={`/${cat.slug}/${post.slug}`}
                    className="bg-white p-4 rounded-xl shadow-sm hover:shadow-lg border transition"
                  >
                    <img
                      src={
                        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.jpg"
                      }
                      alt={post.title.rendered}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h5 className="text-base font-semibold line-clamp-2 hover:text-blue-600">
                      {post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                    </h5>
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
