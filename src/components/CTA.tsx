'use client';

import Link from 'next/link';
import { FaTwitter, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';

const footerLinks = [
  'Instant Personal Loan',
  'Instant Business Loan',
  'EMI Calculator',
  'Best Instant Loan App Online',
  'Loan in 10 Minutes',
  'Apply for Business Loan Online',
  'Emergency Loan App',
  'Online Digital Loan App',
  'Personal Loan App',
  'Instant Loan App',
  'Small Business Loan App',
  'Loan Without CIBIL Check',
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: <FaTwitter /> },
  { name: 'LinkedIn', href: '#', icon: <FaLinkedinIn /> },
  { name: 'Facebook', href: '#', icon: <FaFacebookF /> },
  { name: 'Instagram', href: '#', icon: <FaInstagram /> },
];

export default function CTA() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h4 className="text-2xl font-bold mb-3">Samridhya</h4>
          <p className="text-sm text-gray-400">
            ONDC-registered digital loan platform. Secure, fast, and paperless loans backed by leading financial institutions.
          </p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map((social, i) => (
              <Link
                key={i}
                href={social.href}
                className="text-gray-400 hover:text-white text-lg transition"
                title={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            {footerLinks.slice(0, 6).map((link, i) => (
              <li key={i}>
                <Link href="#" className="hover:text-white transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* More Services */}
        <div>
          <h5 className="text-lg font-semibold mb-3">More Services</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            {footerLinks.slice(6).map((link, i) => (
              <li key={i}>
                <Link href="#" className="hover:text-white transition">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h5 className="text-lg font-semibold mb-3">Subscribe</h5>
          <p className="text-sm text-gray-400 mb-2">
            Get the latest on offers, tips, and updates.
          </p>
          <div className="flex border border-gray-700 rounded overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 text-sm text-white px-4 py-2 w-full focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 hover:bg-blue-700 transition">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 pt-6 border-t border-gray-700 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-4">
        <span>© {new Date().getFullYear()} Samridhya. All rights reserved.</span>
        <div className="flex gap-4 flex-wrap">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
          <Link href="#" className="hover:text-white">Support</Link>
        </div>
      </div>
    </footer>
  );
}
