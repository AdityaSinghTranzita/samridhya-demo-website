'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loansOpen, setLoansOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <header className="w-full shadow-sm bg-white z-50 sticky top-0 left-0">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56 xl:w-60 transition-all duration-200">
            <Image
              src="https://framerusercontent.com/images/eoFn6ZAhFTjiRuWZQ7B34zClMM.png?scale-down-to=512"
              alt="Samridhya Logo"
              width={868}
              height={224}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-wrap space-x-4 lg:space-x-8 text-gray-600 font-medium items-center text-base lg:text-lg">
          <li><a href="#home" className="hover:text-blue-700 transition-colors">Home</a></li>

          {/* Loans Dropdown */}
          <li className="relative group">
            <button
              className="hover:text-blue-700 transition-colors flex items-center gap-1"
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
              onClick={() => setLoansOpen((v) => !v)}
            >
              Loans <span className="ml-1">▾</span>
            </button>
            <div
              className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-30 transition-all duration-200 ${loansOpen ? 'block' : 'hidden'} group-hover:block`}
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
            >
              <Link href="#process" className="block px-5 py-2 hover:bg-blue-50 hover:text-blue-700">Personal Loan</Link>
              <Link href="#process" className="block px-5 py-2 hover:bg-blue-50 hover:text-blue-700">Business Loan</Link>
             </div>
          </li>

          {/* Calculators Dropdown */}
          <li className="relative group">
            <button
              className="hover:text-blue-700 transition-colors flex items-center gap-1"
              onMouseEnter={() => setCalcOpen(true)}
              onMouseLeave={() => setCalcOpen(false)}
              onClick={() => setCalcOpen((v) => !v)}
            >
              Calculators <span className="ml-1">▾</span>
            </button>
            <div
              className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-30 transition-all duration-200 ${calcOpen ? 'block' : 'hidden'} group-hover:block`}
              onMouseEnter={() => setCalcOpen(true)}
              onMouseLeave={() => setCalcOpen(false)}
            >
              <Link href="/loan-calculator" className="block px-5 py-2 hover:bg-blue-50 hover:text-blue-700">Loan EMI Calculator</Link>
              <Link href="/repayment-calculator" className="block px-5 py-2 hover:bg-blue-50 hover:text-blue-700">Loan Repayment Calculator</Link>
              <Link href="/credit-score-checker" className="block px-5 py-2 hover:bg-blue-50 hover:text-blue-700">Credit Score Checker</Link>
            </div>
          </li>

          <li><a href="#about" className="hover:text-blue-700 transition-colors">About Us</a></li>
          <li><a href="#process" className="hover:text-blue-700 transition-colors">How to Apply</a></li>
          <li><Link href="/blog" className="hover:text-blue-700 transition-colors">Blogs & News</Link></li>
          <li><a href="#faqs" className="hover:text-blue-700 transition-colors">FAQs</a></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 rounded-b-xl shadow-lg animate-fadeIn">
          <ul className="space-y-4 text-gray-700 font-medium text-base">
            <li><a href="#home" onClick={() => setIsOpen(false)} className="block py-2">Home</a></li>
            <li className="font-semibold">Loans</li>
            <ul className="ml-4 space-y-2">
              <li><Link href="/personal-loan" onClick={() => setIsOpen(false)} className="block py-2">Personal Loan</Link></li>
              <li><Link href="/business-loan" onClick={() => setIsOpen(false)} className="block py-2">Business Loan</Link></li>
            </ul>
            <li className="font-semibold mt-2">Calculators</li>
            <ul className="ml-4 space-y-2">
              <li><Link href="/loan-calculator" onClick={() => setIsOpen(false)} className="block py-2">Loan EMI Calculator</Link></li>
              <li><Link href="/repayment-calculator" onClick={() => setIsOpen(false)} className="block py-2">Loan Repayment Calculator</Link></li>
              <li><Link href="/credit-score-checker" onClick={() => setIsOpen(false)} className="block py-2">Credit Score Checker</Link></li>
            </ul>
            <li><a href="#about" onClick={() => setIsOpen(false)} className="block py-2">About Us</a></li>
            <li><a href="#process" onClick={() => setIsOpen(false)} className="block py-2">How to Apply</a></li>
            <li><Link href="/blog" onClick={() => setIsOpen(false)} className="block py-2">Blogs & News</Link></li>
            <li><a href="#faqs" onClick={() => setIsOpen(false)} className="block py-2">FAQs</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
