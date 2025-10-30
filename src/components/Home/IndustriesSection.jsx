"use client";

import Image from "next/image";

const industries = [
  { name: "Fashion", image: "/images/02.jpg" },
  { name: "Food", image: "/images/03.jpg" },
  { name: "Retail", image: "/images/04.jpg" },
  { name: "Technology", image: "/images/05.jpg" },
  { name: "Startups", image: "/images/06.jpg" },
  { name: "Healthcare", image: "/images/07.jpg" },
  { name: "Hospitality", image: "/images/08.jpg" },
  { name: "Education", image: "/images/02.jpg" },
];

export default function IndustriesSection() {
  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Industries We Empower with Digital Innovation
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg  mx-auto mb-12">
          At{" "}
          <span className="font-semibold text-blue-600">Sxentra</span>, we
          partner with diverse industries to build brand visibility, enhance
          digital presence, and deliver measurable growth. Our tailored
          strategies adapt to each market’s unique needs, driving innovation
          across sectors.
        </p>

        {/* Industry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {industries.map((item) => (
            <div
              key={item.name}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Background Image */}
              <div className="relative w-full h-44 md:h-56">
                <Image
                  src={item.image}
                  alt={`${item.name} industry`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500 brightness-95"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              </div>

              {/* Overlay Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
