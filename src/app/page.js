import Link from "next/link";
import Hero from "@/components/Home/Hero";
import DigitalMarketingSection from "@/components/Home/DigitalMarketingSection";
import ServicesSection from "@/components/Home/ServicesSection";
import OfferingsSection from "@/components/Home/OfferingsSection";
import BrandingSection from "@/components/Home/BrandingSection";
import IndustriesSection from "@/components/Home/IndustriesSection";
import FAQSection from "@/components/Home/FAQSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import FreeAuditForm from "@/components/Home/FreeAuditForm";
import LatestPostsSection from "@/components/Home/LatestPostsSection";

export const revalidate = 60;

export default async function HomePage() {
  // ✅ Fetch categories from WordPress
  const res = await fetch(
    "https://sxentra.com/wp-json/wp/v2/categories?per_page=20",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return (
      <main className="text-center py-20">
        <h1 className="text-3xl font-bold text-red-500">
          Failed to load categories.
        </h1>
      </main>
    );
  }

  const categories = await res.json();

  return (
    <main className="pt-20">
      {/* ✅ Hero and other homepage sections */}
      <Hero />
      <DigitalMarketingSection />
      <ServicesSection />
      <OfferingsSection />
      <BrandingSection />
      <IndustriesSection />
      <FAQSection />
      <TestimonialsSection />
      <FreeAuditForm />
       <LatestPostsSection />

      {/* ✅ Category Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Explore Our Blog Categories
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="p-6 bg-white shadow-md hover:shadow-lg rounded-2xl border transition-all text-center"
            >
              <h3 className="text-xl font-semibold capitalize text-gray-800 hover:text-blue-600">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {cat.description}
                </p>
              )}
            </Link>
          ))}
        </div>

      </section>
    </main>
  );
}
