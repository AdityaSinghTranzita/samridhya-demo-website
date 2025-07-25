'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaXTwitter,
} from 'react-icons/fa6';
import { MdPhone, MdQuestionAnswer, MdWork, MdOutlineAppShortcut } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-300 text-xs sm:text-sm">
      {/* Top CTA */}
      <div className="bg-[#181818] border-b border-yellow-500 px-4 sm:px-6 py-4 sm:py-6 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-2 sm:gap-0">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-white">
        Streamline your borrowing, minimize your stress. Your loan journey begins now with <span className="text-yellow-400">Samridhya</span>
        </p>
        <Link href="#">
          <button className="ml-0 sm:ml-3 mt-3 sm:mt-0 bg-yellow-400 text-black font-bold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-200">
            Apply Now
          </button>
        </Link>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {/* Brand and contact links */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-4">Samridhya</h2>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <MdPhone className="text-lg" />
              <Link href="#" className="hover:text-white transition">Contact Us</Link>
            </li>
            <li className="flex items-center gap-2">
              <MdQuestionAnswer className="text-lg" />
              <Link href="#" className="hover:text-white transition">FAQ</Link>
            </li>
            <li className="flex items-center gap-2">
              <HiOutlineDocumentText className="text-lg" />
              <Link href="#" className="hover:text-white transition">Responsible Lending</Link>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineAppShortcut className="text-lg" />
              <Link href="#" className="hover:text-white transition">Loan App</Link>
            </li>
            <li className="flex items-center gap-2">
              <MdWork className="text-lg" />
              <Link href="#" className="hover:text-white transition">Careers</Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b-2 border-yellow-500 inline-block">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#" className="hover:text-white">Personal Loan</Link></li>
            <li><Link href="#" className="hover:text-white">Business Loan</Link></li>
            <li><Link href="#" className="hover:text-white">Two Wheeler Loan</Link></li>
            <li><Link href="#" className="hover:text-white">Loan Against Property</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b-2 border-yellow-500 inline-block">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Partner With Us</Link></li>
            <li><Link href="#" className="hover:text-white">Blog</Link></li>
            <li><Link href="#" className="hover:text-white">News Board</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b-2 border-yellow-500 inline-block">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Grievance Redressal</Link></li>
          </ul>
        </div>
      </div>

      {/* App downloads & social */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex gap-4">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            width={150}
            height={50}
          />
          <Image
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            width={150}
            height={50}
          />
        </div>

        <div className="flex gap-4 text-lg">
          <Link href="#"><FaFacebookF className="hover:text-white" /></Link>
          <Link href="#"><FaLinkedinIn className="hover:text-white" /></Link>
          <Link href="#"><FaXTwitter className="hover:text-white" /></Link>
          <Link href="#"><FaInstagram className="hover:text-white" /></Link>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-gray-700 text-center text-xs py-3 sm:py-4 text-gray-500">
        © {new Date().getFullYear()} Samridhya. All rights reserved.
      </div>
    </footer>
  );
}
