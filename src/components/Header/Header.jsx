"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleServices = () => setServicesOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo.svg"
            alt="Sxentra Logo"
            width={180}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* ✅ Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>

          {/* ✅ Services Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center hover:text-blue-600 transition"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown size={16} className="ml-1" />
            </button>

            {servicesOpen && (
              <div className="absolute left-0 mt-2 w-52 rounded-lg border bg-white shadow-lg py-2">
                <Link href="/services/digital-marketing" className="block px-4 py-2 hover:bg-gray-100">
                  Digital Marketing
                </Link>
                <Link href="/services/website-maintenance" className="block px-4 py-2 hover:bg-gray-100">
                  Website Maintenance
                </Link>
                <Link href="/services/web-designing" className="block px-4 py-2 hover:bg-gray-100">
                  Web Designing
                </Link>
              </div>
            )}
          </div>

          <Link href="/about-us" className="hover:text-blue-600 transition">About Us</Link>
          <Link href="/portfolio" className="hover:text-blue-600 transition">Portfolio</Link>
          <Link href="/blog" className="hover:text-blue-600 transition">Blog</Link>
          <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* ✅ Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            aria-label="Call us now"
          >
            <Phone size={18} aria-hidden="true" />
            Call Us Now
          </button>
          <Link
            href="/free-audit"
            className="rounded-full border border-blue-600 px-4 py-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            Free Audit
          </Link>
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <button
          className="text-gray-800 md:hidden"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          title={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 border-t border-gray-200 bg-white px-4 pb-4 shadow-sm">
          <Link href="/" className="py-2 text-gray-700 hover:text-blue-600 transition">Home</Link>

          {/* ✅ Mobile Services Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={toggleServices}
              className="flex items-center justify-between py-2 text-gray-700 hover:text-blue-600"
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                size={16}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div className="ml-4 flex flex-col space-y-1">
                <Link href="/services/digital-marketing" className="py-1 text-gray-600 hover:text-blue-600">
                  Digital Marketing
                </Link>
                <Link href="/services/website-maintenance" className="py-1 text-gray-600 hover:text-blue-600">
                  Website Maintenance
                </Link>
                <Link href="/services/web-designing" className="py-1 text-gray-600 hover:text-blue-600">
                  Web Designing
                </Link>
              </div>
            )}
          </div>

          <Link href="/about-us" className="py-2 text-gray-700 hover:text-blue-600 transition">About Us</Link>
          <Link href="/portfolio" className="py-2 text-gray-700 hover:text-blue-600 transition">Portfolio</Link>
          <Link href="/blog" className="py-2 text-gray-700 hover:text-blue-600 transition">Blog</Link>
          <Link href="/contact" className="py-2 text-gray-700 hover:text-blue-600 transition">Contact</Link>

          <button
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
            aria-label="Call us now"
          >
            <Phone size={18} aria-hidden="true" />
            Call Us Now
          </button>

          <Link
            href="/free-audit"
            className="rounded-full border border-blue-600 px-4 py-2 text-center text-blue-600 transition hover:bg-blue-600 hover:text-white"
          >
            Free Audit
          </Link>
        </div>
      )}
    </header>
  );
}
