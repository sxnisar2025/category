"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahsan Raza",
      role: "CEO, BrandNest",
      image: "/images/c1.jpg",
      comment:
        "Sxentra transformed our online presence completely. Their SEO and content strategies brought in more traffic and genuine leads — truly a team that delivers results.",
      rating: 5,
    },
    {
      name: "Sara Khan",
      role: "Project Lead, TechNova",
      image: "/images/c2.jpg",
      comment:
        "Their attention to detail and deep understanding of digital marketing impressed us. Our engagement rates improved dramatically after their campaigns.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          What Our Happy Clients Say
        </h2>
        <p className="text-gray-600 text-lg  mx-auto mb-16">
          We’re proud to have worked with inspiring brands and individuals.
          Here’s what some of our clients have to say about their experience
          with Sxentra.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {testimonials.map((t, index) => (
            <article
              key={index}
              className="flex bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Left Image */}
              <div className="w-1/3 relative h-48 md:h-auto">
                <Image
                  src={t.image}
                  alt={`${t.name} - ${t.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>

              {/* Right Content */}
              <div className="w-2/3 p-6 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{t.role}</p>
                  <p className="text-gray-700 text-base leading-relaxed">
                    “{t.comment}”
                  </p>
                </div>

                {/* Rating */}
                <div className="flex mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 w-5 h-5 fill-yellow-400"
                      aria-label="Star rating"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
