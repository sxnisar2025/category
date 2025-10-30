"use client";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-blue-600 text-white px-5 py-2 ">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto  items-center">

        {/* Left Section - Email */}
        <div className="text-sm">
          <Link href="mailto:info@sxentra.com" className="hover:underline">
            info@sxentra.com
          </Link>
        </div>

        {/* Right Section - Menu + Social Icons */}
        <div className="flex items-center gap-4">

          {/* Menu */}
          <ul className="flex items-center gap-4 text-sm">
            <li>
              <Link href="/about-us" className="hover:underline">About</Link>
            </li>
            <li>
              <Link href="/news" className="hover:underline">News</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>

          {/* Separator Line */}
          <div className="h-5 w-px bg-white/50 mx-2"></div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaFacebookF size={16} />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaInstagram size={16} />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaLinkedinIn size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
