"use client";

import Image from "next/image";

const services = [
  {
    id: 1,
    image: "/images/01.webp",
    title: "SEO Optimization",
    description:
      "Improve your website’s visibility and drive more organic traffic with our proven SEO strategies.",
    button: "Learn More",
  },
  {
    id: 2,
    image: "/images/02.jpg",
    title: "Content Marketing",
    description:
      "Engage your audience with impactful content crafted to boost brand authority and conversions.",
    button: "Learn More",
  },
  {
    id: 3,
    image: "/images/03.jpg",
    title: "Social Media Management",
    description:
      "Grow and engage your community with our strategic social media marketing campaigns.",
    button: "Learn More",
  },
  {
    id: 4,
    image: "/images/04.jpg",
    title: "Google Ads (PPC)",
    description:
      "Maximize ROI with data-driven Google Ads campaigns that attract qualified leads.",
    button: "Learn More",
  },
  {
    id: 5,
    image: "/images/05.jpg",
    title: "Web Development",
    description:
      "Create user-friendly, stunning websites optimized for performance and conversions.",
    button: "Learn More",
  },
  {
    id: 6,
    image: "/images/06.jpg",
    title: "Graphic Design",
    description:
      "Bring your brand to life through visually compelling designs and creative branding materials.",
    button: "Learn More",
  },
  {
    id: 7,
    image: "/images/07.jpg",
    title: "Brand Strategy",
    description:
      "Build a memorable brand with clear messaging and a strong market positioning strategy.",
    button: "Learn More",
  },
  {
    id: 8,
    image: "/images/08.jpg",
    title: "Email Marketing",
    description:
      "Engage customers and nurture leads with high-converting, automated email campaigns.",
    button: "Learn More",
  },
];

export default function ServicesSection() {
  return (
    <section className="w-full bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Digital Marketing Services
        </h2>

        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-12">
          Explore our wide range of digital services crafted to grow your
          business, increase visibility, and deliver measurable results.
        </p>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-6 text-left flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <button
                  aria-label={`Learn more about ${service.title}`}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full self-start transition-colors"
                >
                  {service.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
