"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-gray-50 overflow-hidden">
      {/* Right Half Image (Desktop) */}
      <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
        <Image
          src="/images/01.webp"
          alt="Sxentra Hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Mobile Image */}
      <div className="md:hidden w-full h-64 relative">
        <Image
          src="/images/01.webp"
          alt="Sxentra Hero Mobile"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Area */}
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-16 md:py-24">
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-6 z-10">
          <h2 className="text-gray-600 text-lg font-semibold tracking-wide">
            Welcome
          </h2>

          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
            Your Growth, Our Strategy — Pakistan’s Leading
          </h1>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl">
            Turn your creative ideas into powerful business strategies with{" "}
            <span className="font-semibold text-gray-800">Sxentra</span>, Pakistan’s leading SEO company.
            From SEO to digital marketing, we transform your goals into strategies that deliver real success,
            providing a platform to boost your brand’s visibility, engagement, and growth.
          </p>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-transform transform hover:scale-105 active:scale-95"
          >
            Contact Us Now
          </button>
        </div>
      </div>
    </section>
  );
}
