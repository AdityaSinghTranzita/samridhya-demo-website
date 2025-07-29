'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { handleAppDownload } from '@/utils/appStore';

export default function LoanNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<'loans' | 'calculators' | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('');

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  // Detect current page for gradient
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('personal-loan')) setCurrentPage('personal');
    else if (path.includes('business-loan')) setCurrentPage('business');
    else if (path.includes('education-loan')) setCurrentPage('education');
    else if (path.includes('wedding-loan')) setCurrentPage('wedding');
    else if (path.includes('travel-loan')) setCurrentPage('travel');
    else if (path.includes('medical-loan')) setCurrentPage('medical');
    else setCurrentPage('default');
  }, []);

  const handleDropdown = (menu: 'loans' | 'calculators') => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => setIsOpen(false);

  // Get gradient based on current page
  const getGradient = () => {
    if (isScrolled) return 'bg-white shadow-lg';
    
    switch (currentPage) {
      case 'personal':
        return 'bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50';
      case 'business':
        return 'bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50';
      case 'education':
        return 'bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50';
      case 'wedding':
        return 'bg-gradient-to-r from-pink-50 via-rose-50 to-red-50';
      case 'travel':
        return 'bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50';
      case 'medical':
        return 'bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50';
      default:
        return 'bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50';
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Check if we've scrolled past the hero section (approximately 100vh)
      const heroHeight = window.innerHeight;
      setIsScrolled(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${getGradient()}`}>
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
        <ul className="hidden md:flex space-x-4 lg:space-x-8 font-medium text-base lg:text-lg items-center">
          <li>
            <Link 
              href="/" 
              className={`hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
            >
              About Us
            </Link>
          </li>

          {/* Loans Dropdown */}
          <li className="relative group">
            <button
              className={`flex items-center gap-1 hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
              aria-haspopup="true"
              aria-expanded={dropdown === 'loans'}
              onClick={() => handleDropdown('loans')}
            >
              Loans <span>▾</span>
            </button>
            {dropdown === 'loans' && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-30">
                <Link href="/loans/personal-loan" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Personal Loan</Link>
                <Link href="/loans/business-loan" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Business Loan</Link>
                <Link href="/loans/education-loan" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Education Loan</Link>
                <Link href="/loans/wedding-loan" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Wedding Loan</Link>
                <Link href="/loans/travel-loan" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Travel Loan</Link>
                <Link href="/loans/medical-loan" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Medical Loan</Link>
              </div>
            )}
          </li>

          {/* Calculators Dropdown */}
          <li className="relative group">
            <button
              className={`flex items-center gap-1 hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
              aria-haspopup="true"
              aria-expanded={dropdown === 'calculators'}
              onClick={() => handleDropdown('calculators')}
            >
              Calculators <span>▾</span>
            </button>
            {dropdown === 'calculators' && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-30">
                <Link href="/calculators/loan-calculator" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Loan EMI Calculator</Link>
                <Link href="/calculators/credit-score-checker" className="block px-5 py-2 hover:bg-blue-50 text-gray-700">Credit Score Checker</Link>
              </div>
            )}
          </li>

          <li>
            <Link 
              href="/blog" 
              className={`hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
            >
              Blogs & News
            </Link>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('faqs')}
              className={`hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-900'
              }`}
            >
              FAQs
            </button>
          </li>
        </ul>

        {/* Download App Button - Desktop */}
        <button
          onClick={handleAppDownload}
          className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            isScrolled 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
              : 'bg-blue-600/10 backdrop-blur-sm border border-blue-600/20 text-blue-800 hover:bg-blue-600/20'
          }`}
        >
          <Download size={16} />
          Download App
        </button>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
            isScrolled 
              ? 'border border-gray-200' 
              : 'border border-blue-600/20 bg-blue-600/10 backdrop-blur-sm'
          }`}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X size={28} className={isScrolled ? 'text-gray-700' : 'text-blue-800'} />
          ) : (
            <Menu size={28} className={isScrolled ? 'text-gray-700' : 'text-blue-800'} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-6 rounded-b-xl shadow animate-fadeIn">
          <ul className="space-y-4 text-gray-800 font-medium text-base">
            <li><Link href="/" onClick={closeMobileMenu} className="block py-2">Home</Link></li>
            <li><Link href="/about" onClick={closeMobileMenu} className="block py-2">About Us</Link></li>

            <li className="font-semibold pt-2">Loans</li>
            <ul className="ml-4 space-y-1">
              <li><Link href="/loans/personal-loan" onClick={closeMobileMenu} className="block py-1">Personal Loan</Link></li>
              <li><Link href="/loans/business-loan" onClick={closeMobileMenu} className="block py-1">Business Loan</Link></li>
              <li><Link href="/loans/education-loan" onClick={closeMobileMenu} className="block py-1">Education Loan</Link></li>
              <li><Link href="/loans/wedding-loan" onClick={closeMobileMenu} className="block py-1">Wedding Loan</Link></li>
              <li><Link href="/loans/travel-loan" onClick={closeMobileMenu} className="block py-1">Travel Loan</Link></li>
              <li><Link href="/loans/medical-loan" onClick={closeMobileMenu} className="block py-1">Medical Loan</Link></li>
            </ul>

            <li className="font-semibold pt-3">Calculators</li>
            <ul className="ml-4 space-y-1">
                                                            <li><Link href="/calculators/loan-calculator" onClick={closeMobileMenu} className="block py-1">Loan EMI Calculator</Link></li>
              <li><Link href="/calculators/credit-score-checker" onClick={closeMobileMenu} className="block py-1">Credit Score Checker</Link></li>
            </ul>

            <li><Link href="/blog" onClick={closeMobileMenu} className="block py-2">Blogs & News</Link></li>
            <li><button onClick={() => scrollToSection('faqs')} className="block py-2 w-full text-left">FAQs</button></li>
            
            {/* Download App Button - Mobile */}
            <li className="pt-4">
              <button
                onClick={() => {
                  handleAppDownload();
                  closeMobileMenu();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                <Download size={16} />
                Download App
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
} 