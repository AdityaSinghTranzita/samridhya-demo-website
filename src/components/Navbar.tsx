'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<'loans' | 'calculators' | null>(null);

  const handleDropdown = (menu: 'loans' | 'calculators') => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56 xl:w-60 shrink-0">
          <Image
            src="https://framerusercontent.com/images/eoFn6ZAhFTjiRuWZQ7B34zClMM.png?scale-down-to=512"
            alt="Samridhya Logo"
            width={868}
            height={224}
            className="w-full h-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 lg:space-x-8 text-gray-700 font-medium text-base lg:text-lg items-center">
          <li><a href="#home" className="hover:text-blue-700">Home</a></li>
          <li><a href="#about" className="hover:text-blue-700">About Us</a></li>

          {/* Loans Dropdown */}
          <li className="relative group">
            <button
              className="flex items-center gap-1 hover:text-blue-700"
              aria-haspopup="true"
              aria-expanded={dropdown === 'loans'}
              onClick={() => handleDropdown('loans')}
            >
              Loans <span>▾</span>
            </button>
            {dropdown === 'loans' && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-30">
                <Link href="#process" className="block px-5 py-2 hover:bg-blue-50">Personal Loan</Link>
                <Link href="#process" className="block px-5 py-2 hover:bg-blue-50">Business Loan</Link>
              </div>
            )}
          </li>

          {/* Calculators Dropdown */}
          <li className="relative group">
            <button
              className="flex items-center gap-1 hover:text-blue-700"
              aria-haspopup="true"
              aria-expanded={dropdown === 'calculators'}
              onClick={() => handleDropdown('calculators')}
            >
              Calculators <span>▾</span>
            </button>
            {dropdown === 'calculators' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-30">
                <Link href="/loan-calculator" className="block px-5 py-2 hover:bg-blue-50">Loan EMI Calculator</Link>
                <Link href="/repayment-calculator" className="block px-5 py-2 hover:bg-blue-50">Loan Repayment Calculator</Link>
                <Link href="/credit-score-checker" className="block px-5 py-2 hover:bg-blue-50">Credit Score Checker</Link>
              </div>
            )}
          </li>

          
        
          <li><Link href="/blog" className="hover:text-blue-700">Blogs & News</Link></li>
          <li><a href="#faqs" className="hover:text-blue-700">FAQs</a></li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-6 rounded-b-xl shadow animate-fadeIn">
          <ul className="space-y-4 text-gray-800 font-medium text-base">
            <li><a href="#home" onClick={closeMobileMenu} className="block py-2">Home</a></li>
            <li><a href="#about" onClick={closeMobileMenu} className="block py-2">About Us</a></li>

            <li className="font-semibold pt-2">Loans</li>
            <ul className="ml-4 space-y-1">
              <li><Link href="/personal-loan" onClick={closeMobileMenu} className="block py-1">Personal Loan</Link></li>
              <li><Link href="/business-loan" onClick={closeMobileMenu} className="block py-1">Business Loan</Link></li>
            </ul>

            <li className="font-semibold pt-3">Calculators</li>
            <ul className="ml-4 space-y-1">
              <li><Link href="/loan-calculator" onClick={closeMobileMenu} className="block py-1">Loan EMI Calculator</Link></li>
              <li><Link href="/repayment-calculator" onClick={closeMobileMenu} className="block py-1">Loan Repayment Calculator</Link></li>
              <li><Link href="/credit-score-checker" onClick={closeMobileMenu} className="block py-1">Credit Score Checker</Link></li>
            </ul>

            <li><Link href="/blog" onClick={closeMobileMenu} className="block py-2">Blogs & News</Link></li>
            <li><a href="#faqs" onClick={closeMobileMenu} className="block py-2">FAQs</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
