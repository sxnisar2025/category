"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="w-full bg-gray-50 py-[120px]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
            About us <span className="text-blue-600">Sxentra</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            At <span className="font-semibold text-gray-800">Sxentra</span>, we specialize in helping
            brands grow through data-driven digital strategies. Our mission is to empower
            businesses by combining creativity, innovation, and technology — ensuring your
            brand connects with the right audience and achieves measurable results.
          </p>

          <p className="text-gray-600 text-lg leading-relaxed">
            Whether you’re a startup or an established business, we provide tailored digital
            marketing, SEO, branding, and development services that elevate your presence in
            today’s competitive digital world.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://sxentra.com/wp-content/uploads/2025/09/sxentra-hero-section-image.png"
            alt="About Sxentra"
            className="rounded-2xl shadow-lg w-full max-w-md md:max-w-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
