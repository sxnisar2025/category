
import HomeFilter from "@/components/Home/HomeFilter";

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
    console.error(error);
  }

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
     
      {/* ✅ data IS PASSED HERE */}
      <HomeFilter data={categoryWithPosts} />
    </main>
  );
}
