// src/components/BlogPostClient.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function BlogPostClient({ post, headings = [], content = '', categorySlug }) {
  const [showTOC, setShowTOC] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!headings || !headings.length) return;

    // Observe headings (h2, h3) for active state
    const handleIntersections = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersections, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 1],
    });

    const els = Array.from(document.querySelectorAll('h2[id], h3[id]'));
    els.forEach(el => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [headings]);

  // Close menu on navigation (mobile)
  useEffect(() => {
    const handler = () => setShowTOC(false);
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return (
    <article className="max-w-6xl mx-auto p-6 pt-28 flex flex-col lg:flex-row gap-8">
      {/* Mobile TOC toggle (visible only on small screens) */}
      {headings.length > 0 && (
        <div className="lg:hidden w-full">
          <button
            onClick={() => setShowTOC(s => !s)}
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md mb-4"
            aria-expanded={showTOC}
            aria-controls="toc-list"
          >
            {showTOC ? 'Hide Contents ▲' : 'Show Contents ▼'}
          </button>
        </div>
      )}

      {/* TOC sidebar: mobile (toggleable) & desktop (always visible) */}
      {headings.length > 0 && (
        <aside
          id="toc-list"
          className={`${showTOC ? 'block' : 'hidden'} lg:block lg:w-1/4 bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm lg:sticky lg:top-28 h-fit`}
        >
          <h3 className="font-semibold text-lg mb-3 text-gray-800">Contents</h3>
          <ul className="space-y-2 text-sm">
            {headings.map(h => (
              <li key={h.id} className={`${h.level === '3' ? 'ml-4' : ''}`}>
                <a
                  href={`#${h.id}`}
                  className={`block ${activeId === h.id ? 'text-sky-600 font-semibold' : 'text-gray-700'} hover:text-sky-600`}
                  onClick={() => setShowTOC(false)}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Main content */}
      <div className="prose prose-lg lg:w-3/4" dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
