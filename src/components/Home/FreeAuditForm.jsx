'use client';

import { useState } from 'react';

export default function FreeAuditSection() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    setStatus('loading');

    try {
      const data = new FormData(form);
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] opacity-10"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          Get Your <span className="text-sky-600">Free Analysis Report</span>
        </h2>
        <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
          Discover how to improve your website’s performance, SEO, and conversion rate.
          Fill out the form below — our experts will analyze your site and send you a detailed report.
        </p>

        {/* The Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-sky-400 focus:outline-none"
            />
          </div>

          <input
            type="text"
            name="website"
            placeholder="Your Website (optional)"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-sky-400 focus:outline-none"
          />

          <textarea
            name="message"
            required
            rows="5"
            placeholder="Tell us about your project or goals..."
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-sky-400 focus:outline-none"
          ></textarea>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {status === 'loading' ? 'Sending...' : 'Submit Request'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center mt-2">
              ✅ Thank you! We’ll send your analysis soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center mt-2">
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
