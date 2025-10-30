import React from 'react'
// src/app/page.jsx

export const metadata = {
  title: "About- Sxentra — Pakistan’s Leading Digital Media Marketing Agency",
  description:
    "About- Transform your digital presence with Sxentra. From SEO to full-scale digital marketing, we deliver strategies that drive measurable growth.",
    alternates: {
    canonical: "https://sxentra.com",
  },

  openGraph: {
    title: "Sxentra — Pakistan’s Leading Digital Media Marketing Agency",
    description:
      "Transform your digital presence with Sxentra. From SEO to full-scale digital marketing, we deliver strategies that drive measurable growth.",
    url: "https://sxentra.com",
    siteName: "Sxentra",
    images: [
      {
        url: "https://sxentra.com/wp-content/uploads/2025/09/sxentra-hero-section-image.png",
        width: 1200,
        height: 630,
        alt: "Sxentra Digital Marketing Agency Pakistan",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};


function Aboutlayout({ children }) {
  return (
    <div>
      { children }
    </div>
  )
}

export default Aboutlayout
