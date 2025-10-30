"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      question: "What does a digital marketing agency offer?",
      answer:
        "A digital marketing agency like Sxentra provides services such as SEO, social media marketing, Google Ads, web development, and branding. Our goal is to help businesses enhance their online visibility, attract more customers, and grow their brand presence.",
    },
    {
      question: "Why should I hire Sxentra for my business in Pakistan?",
      answer:
        "Sxentra combines strategy, creativity, and technology to deliver measurable growth. With local and international expertise, we understand Pakistan’s market dynamics and create tailored digital solutions that drive results.",
    },
    {
      question: "How much do digital marketing advisors cost?",
      answer:
        "The cost depends on your business goals, industry, and campaign size. Sxentra offers flexible packages that fit startups, SMEs, and enterprises — ensuring top-tier services at competitive rates.",
    },
    {
      question: "How long does SEO take to show results?",
      answer:
        "SEO is a long-term investment. Typically, noticeable improvements appear within 3–6 months depending on competition, content quality, and optimization consistency.",
    },
    {
      question: "Do you only work with businesses in Pakistan?",
      answer:
        "No. While Sxentra is based in Pakistan, we serve clients globally — helping brands across industries expand their digital reach and success online.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full bg-gray-50 py-[100px]">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT COLUMN - FAQ */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left text-gray-800 font-medium text-lg focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300">
            Read More FAQs
          </button>
        </div>

        {/* RIGHT COLUMN - IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/images/dm-faqs.webp"
            alt="FAQ Discussion"
            width={1000}
            height={667}
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/images/placeholder.webp"
          />
        </div>
      </div>
    </section>
  );
}
