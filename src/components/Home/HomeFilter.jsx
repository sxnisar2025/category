"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function HomeFilter({ data }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter valid categories (hide uncategorized & empty)
  const validCategories = useMemo(
    () =>
      data.filter(
        (cat) => cat.posts?.length > 0 && cat.slug !== "uncategorized"
      ),
    [data]
  );

  // Merge all posts for "All" view — remove duplicates and sort
  const allPosts = useMemo(() => {
    if (selectedCategory !== "all") return [];

    const merged = validCategories.flatMap((cat) => cat.posts);

    // remove duplicates by post.id
    const uniqueMap = new Map();
    merged.forEach((p) => uniqueMap.set(p.id, p));

    const uniquePosts = Array.from(uniqueMap.values());

    // sort by latest
    uniquePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return uniquePosts;
  }, [validCategories, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 mb-10">
      {/* CATEGORY BUTTONS */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible scrollbar-hide">
        {/* ALL button */}
        <button
          onClick={() => setSelectedCategory("all")}
          className={`whitespace-nowrap px-4 py-2 rounded-full border transition ${
            selectedCategory === "all"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700"
          }`}
        >
          All
        </button>

        {/* category buttons */}
        {validCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border transition ${
              selectedCategory === cat.slug
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* ALL POSTS VIEW */}
      {selectedCategory === "all" && allPosts.length > 0 && (
        <>
          {/* LATEST POSTS (ROW FORMAT) */}
{/* LATEST POSTS (ROW FORMAT) */}
<section className="py-12 border-b mb-10">
  <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>

  <div className="flex flex-col gap-8">
    {allPosts.slice(0, 16).map((post) => {
      const category =
        post._embedded?.["wp:term"]?.[0]?.[0] || { slug: "uncategorized", name: "Blog" };

      return (
        <div
          key={`${post.id}-${post.slug}`}
          className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl border shadow hover:shadow-lg transition"
        >
          {/* IMAGE */}
          <Link href={`/${category.slug}/${post.slug}`} className="shrink-0">
            <img
              src={
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/placeholder.jpg"
              }
              className="w-full md:w-64 h-44 object-cover rounded-xl"
            />
          </Link>

          {/* CONTENT */}
          <div className="flex flex-col justify-between flex-1">

            {/* CATEGORY NAME CLICKABLE */}
            <Link
              href={`/${category.slug}`}
              className="text-sm text-blue-600 font-semibold mb-1 hover:underline w-fit"
            >
              {category.name}
            </Link>

            {/* POST TITLE */}
            <Link href={`/${category.slug}/${post.slug}`}>
              <h3 className="text-xl font-bold hover:text-blue-600 mb-2">
                {post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
              </h3>
            </Link>

            {/* SHORT DESCRIPTION */}
            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.excerpt?.rendered
                ?.replace(/(<([^>]+)>)/gi, "")
                ?.slice(0, 150) || ""}
              ...
            </p>

            {/* READ MORE BUTTON */}
            <Link
              href={`/${category.slug}/${post.slug}`}
              className="inline-block w-fit px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Read More →
            </Link>
          </div>
        </div>
      );
    })}
  </div>
</section>


        </>
      )}

      {/* SINGLE CATEGORY VIEW */}
      {selectedCategory !== "all" &&
        validCategories
          .filter((cat) => cat.slug === selectedCategory)
          .map((cat) => {
            const posts = cat.posts;

            const [bigPost, post2, post3, ...remaining] = posts;
            return (
              <section key={cat.id} className="py-12 border-b last:border-none">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">{cat.name}</h2>
                  <Link href={`/${cat.slug}`} className="text-blue-600 font-medium">
                    View All →
                  </Link>
                </div>

                {/* Big + 2 small */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                  <Link href={`/${cat.slug}/${bigPost.slug}`} className="group col-span-2">
                    <img
                      src={
                        bigPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                        "/placeholder.jpg"
                      }
                      className="w-full h-[380px] object-cover rounded-xl mb-5"
                    />
                    <h3 className="text-2xl font-bold group-hover:text-blue-600">
                      {bigPost.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                    </h3>
                  </Link>

                  <div className="flex flex-col gap-8">
                    {[post2, post3].map((post) => (
                      <Link
                        key={`${post.id}-${post.slug}`}
                        href={`/${cat.slug}/${post.slug}`}
                        className="group"
                      >
                        <img
                          src={
                            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                            "/placeholder.jpg"
                          }
                          className="w-full h-40 object-cover rounded-lg mb-3"
                        />
                        <h4 className="text-lg font-semibold group-hover:text-blue-600">
                          {post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* remaining grid */}
                {remaining.length > 0 && (
                  <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
                    {remaining.slice(0, 5).map((post) => (
                      <Link
                        key={`${post.id}-${post.slug}`}
                        href={`/${cat.slug}/${post.slug}`}
                        className="bg-white p-4 rounded-xl border shadow hover:shadow-lg transition"
                      >
                        <img
                          src={
                            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                            "/placeholder.jpg"
                          }
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <h5 className="text-base font-medium line-clamp-2 hover:text-blue-600">
                          {post.title.rendered.replace(/(<([^>]+)>)/gi, "")}
                        </h5>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
    </div>
  );
}
