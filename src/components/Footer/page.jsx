import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-white pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* ✅ Logo + About */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
           <img
            src="/images/logo-white.svg"
            alt="Sxentra Logo"
            width={180}
            height={50}
            className="object-contain"
          />
          </Link>
          <p className="text-sm text-sky-100 leading-relaxed">
            We help businesses grow online with data-driven marketing, 
            SEO optimization, and web solutions that convert visitors into customers.
          </p>
        </div>

        {/* ✅ Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sky-100">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* ✅ Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sky-100">
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
          </ul>
        </div>

        {/* ✅ Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition"
            >
              <i className="fab fa-instagram text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Footer Bottom */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-sky-200">
        © {new Date().getFullYear()} <strong>YourCompany</strong>. All Rights Reserved.
      </div>
    </footer>
  );
}
