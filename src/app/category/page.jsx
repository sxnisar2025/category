import Link from "next/link";

export const revalidate = 300;

export default async function CategoryIndexPage() {
  const res = await fetch(
    "https://www.williamjacket.com/blog/wp-json/wp/v2/categories?per_page=100"
  );

  const categories = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-4 mt-[150px]">
      <h1 className="text-3xl font-bold mb-8">
        All Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border rounded-lg p-5 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">
              {cat.name}
            </h2>

            {cat.description && (
              <p className="text-gray-600 mb-4">
                {cat.description}
              </p>
            )}

            <Link
              href={`/category/${cat.slug}`}
              className="inline-block text-blue-600 font-medium"
            >
              View Stories →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
