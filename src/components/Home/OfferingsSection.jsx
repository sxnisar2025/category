"use client";

import { useEffect, useState } from "react";

const counters = [
  { id: 1, value: 1000, suffix: "", label: "Projects Delivered" },
  { id: 2, value: 50, suffix: "K", label: "Keywords Ranked" },
  { id: 3, value: 8, suffix: "+", label: "Years of Experience" },
  { id: 4, value: 25, suffix: "+", label: "Websites Delivered" },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(counters.map(() => 0));

  // Simple count-up animation
  useEffect(() => {
    const duration = 2000; // ms
    const intervalTime = 20;

    const timers = counters.map((counter, i) => {
      const increment = counter.value / (duration / intervalTime);

      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[i] < counter.value) {
            updated[i] = Math.min(updated[i] + increment, counter.value);
          }
          return updated;
        });
      }, intervalTime);
    });

    return () => timers.forEach(clearInterval);
  }, []);

  return (
    <section className="w-full bg-white py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-700 ease-out opacity-100">
          What Sxentra is offering as a Top Digital Media Marketing Solution in Pakistan?
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg  mx-auto mb-12">
          We always fulfill our responsibility to provide progressive plans and innovative
          services that ensure your business prospers. Our highly skilled and knowledgeable
          team remains available to assure your satisfaction with the services we offer.
          Here, we are providing easy, fast, and efficient solutions to your digital problems.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-gray-200 shadow-xl rounded-2xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {counters.map((counter, i) => (
            <div
              key={counter.id}
              className="flex flex-col justify-center items-center py-10 px-6 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="text-4xl font-bold text-blue-600 transition-transform duration-500 transform hover:scale-110">
                {Math.floor(counts[i])}
                {counter.suffix}
              </div>
              <h3 className="text-gray-700 text-base md:text-lg font-medium mt-2">
                {counter.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
