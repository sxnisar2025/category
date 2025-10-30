"use client";
import Image from "next/image";
import { Sparkles, Rocket, Star } from "lucide-react"; // lightweight, tree-shakeable icons

export default function BrandingSection() {
  return (
    <section className="w-full bg-gray-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
            Sxentra — The Digital Branding Agency That Shapes Your Business Story
          </h2>

          <div className="w-full h-72 md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/faq.webp"
              alt="Sxentra Digital Branding"
              width={800}
              height={600}
              className="w-full h-full object-cover"
              loading="lazy"
              placeholder="empty"
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col space-y-4">
          {/* 1️⃣ Creativity */}
          <FeatureCard
            icon={<Sparkles size={28} />}
            color="blue"
            title="Creativity"
            text="At Sxentra, creativity extends beyond concepts; it’s about transforming powerful thoughts into action plans. Our digital branding services turn ideas into designs, campaigns, and visuals that connect with audiences and drive growth."
          />

          {/* 2️⃣ Impact */}
          <FeatureCard
            icon={<Rocket size={28} />}
            color="green"
            title="Impact"
            text="Our solutions create a lasting impact on your brand’s growth. We blend creativity and innovation to deliver results that simplify your workflow and help your business stand out digitally."
          />

          {/* 3️⃣ Branding */}
          <FeatureCard
            icon={<Star size={28} />}
            color="purple"
            title="Branding"
            text="We help define your brand’s identity and market position through strategy, design, and advertising — creating outcomes that delight customers and expand your reach."
          />
        </div>
      </div>
    </section>
  );
}

/* ✅ Reusable Feature Card component for clarity */
function FeatureCard({ icon, color, title, text }) {
  const bgColor = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
  }[color];

  return (
    <div className="grid grid-cols-[60px_1fr] gap-4 items-start bg-white border border-gray-200 rounded-xl shadow-sm p-6 transition hover:shadow-md">
      <div className="flex justify-center items-start">
        <div className={`p-4 rounded-full shadow ${bgColor}`}>{icon}</div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed text-sm md:text-base">{text}</p>
      </div>
    </div>
  );
}
