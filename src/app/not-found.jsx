// src/app/not-found.jsx
import Link from "next/link";

export const metadata = {
  title: "404 Page Not Found | SXENTRA",
  description:
    "Sorry, the page you're looking for could not be found. Visit SXENTRA home or explore our services.",
  robots: "noindex, follow", // 🚫 Prevent indexing, allow crawling
};

export default function NotFound() {
  const schema404 = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "404 Page Not Found",
    description:
      "The page you’re looking for could not be found or may have been moved.",
    url: "https://sxentra.com/404", // ✅ Update with your live domain
    isPartOf: {
      "@type": "WebSite",
      name: "SXENTRA",
      url: "https://sxentra.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sxentra.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white text-center px-6">
      {/* Error Code */}
      <h1 className="text-[120px] md:text-[160px] font-extrabold text-blue-600 leading-none mb-4">
        404
      </h1>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-lg max-w-xl mb-8">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
        Please check the URL or return to the homepage.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </Link>

        <Link
          href="/contact"
          className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition"
        >
          Contact Support
        </Link>
      </div>

      {/* Decorative Illustration */}
      <div className="mt-12">
        <img
          src="/assets/images/404-illustration.svg"
          alt="Page not found illustration"
          className="w-64 mx-auto opacity-80"
        />
      </div>

      {/* ✅ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema404),
        }}
      />
    </main>
  );
}
