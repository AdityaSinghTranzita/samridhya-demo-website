'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, ChevronDown, ChevronRight, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { handleAppDownload } from '@/utils/appStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState<'loans' | 'calculators' | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState({
    loans: false,
    calculators: false
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const loansDropdownRef = useRef<HTMLLIElement>(null);
  const calculatorsDropdownRef = useRef<HTMLLIElement>(null);

  const handleDropdown = (menu: 'loans' | 'calculators') => {
    setDropdown(dropdown === menu ? null : menu);
  };

  const toggleMobileDropdown = (section: 'loans' | 'calculators') => {
    setMobileDropdowns(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const closeMobileMenu = () => setIsOpen(false);

  // Click outside handler to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside both dropdowns
      const isOutsideLoans = loansDropdownRef.current && !loansDropdownRef.current.contains(target);
      const isOutsideCalculators = calculatorsDropdownRef.current && !calculatorsDropdownRef.current.contains(target);
      
      if (isOutsideLoans && isOutsideCalculators) {
        setDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Smooth scroll to section with offset for fixed navbar
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
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

  // Get gradient based on scroll state
  const getGradient = () => {
    if (isScrolled) return 'bg-white shadow-lg';
    return 'bg-white/90 backdrop-blur-sm shadow-sm';
  };

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
            unoptimized
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 lg:space-x-8 font-medium text-sm lg:text-base items-center">
          <li>
            <Link 
              href="/" 
              className={`hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              About Us
            </Link>
          </li>

          {/* Loans Dropdown */}
          <li className="relative group" ref={loansDropdownRef}>
            <button
              className={`flex items-center gap-1 hover:text-blue-700 transition-colors duration-300 focus:outline-none ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
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
          <li className="relative group" ref={calculatorsDropdownRef}>
            <button
              className={`flex items-center gap-1 hover:text-blue-700 transition-colors duration-300 focus:outline-none ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
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
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              Blogs & News
            </Link>
          </li>
          <li>
            <Link 
              href="/contact" 
              className={`flex items-center gap-2 hover:text-blue-700 transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              <Phone size={16} />
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Download App Button - Desktop */}
        <button
            onClick={handleAppDownload}
            className={`cursor-pointer hidden md:flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium focus:outline-none ${
                isScrolled
                    ? 'bg-blue-600/10 backdrop-blur-sm border border-blue-600/20 text-blue-800 hover:bg-blue-600/20'
                    : 'bg-blue-600/10 backdrop-blur-sm border border-blue-600/20 text-blue-800 hover:bg-blue-600/20'
            }`}
        >
          <Download size={16} />
          Download App
        </button>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-3 rounded-xl focus:outline-none transition-all duration-300 border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X size={24} className="text-gray-700" />
          ) : (
            <Menu size={24} className="text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-2xl border-t border-gray-100">
          <div className="px-4 py-6">
            <ul className="space-y-2">
              {/* Main Menu Items */}
              <li>
                <Link 
                  href="/" 
                  onClick={closeMobileMenu} 
                  className="block py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              
              <li>
                <Link 
                  href="/about" 
                  onClick={closeMobileMenu} 
                  className="block py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>

              {/* Collapsible Loans Section */}
              <li>
                <button
                  onClick={() => toggleMobileDropdown('loans')}
                  className="w-full flex items-center justify-between py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm focus:outline-none"
                >
                  <span>Loans</span>
                  {mobileDropdowns.loans ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                </button>
                
                {mobileDropdowns.loans && (
                  <div className="ml-4 mt-2 space-y-1">
                    <Link 
                      href="/loans/personal-loan" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Personal Loan
                    </Link>
                    <Link 
                      href="/loans/business-loan" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Business Loan
                    </Link>
                    <Link 
                      href="/loans/education-loan" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Education Loan
                    </Link>
                    <Link 
                      href="/loans/wedding-loan" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Wedding Loan
                    </Link>
                    <Link 
                      href="/loans/travel-loan" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Travel Loan
                    </Link>
                    <Link 
                      href="/loans/medical-loan" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Medical Loan
                    </Link>
                  </div>
                )}
              </li>

              {/* Collapsible Calculators Section */}
              <li>
                <button
                  onClick={() => toggleMobileDropdown('calculators')}
                  className="w-full flex items-center justify-between py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm focus:outline-none"
                >
                  <span>Calculators</span>
                  {mobileDropdowns.calculators ? (
                    <ChevronDown size={20} className="text-gray-500" />
                  ) : (
                    <ChevronRight size={20} className="text-gray-500" />
                  )}
                </button>
                
                {mobileDropdowns.calculators && (
                  <div className="ml-4 mt-2 space-y-1">
                    <Link 
                      href="/calculators/loan-calculator" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Loan EMI Calculator
                    </Link>
                    <Link 
                      href="/calculators/credit-score-checker" 
                      onClick={closeMobileMenu} 
                      className="block py-2 px-4 text-gray-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Credit Score Checker
                    </Link>
                  </div>
                )}
              </li>

              <li>
                <Link 
                  href="/blog" 
                  onClick={closeMobileMenu} 
                  className="block py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Blogs & News
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  onClick={closeMobileMenu} 
                  className="flex items-center gap-2 py-3 px-4 text-gray-800 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Phone size={16} />
                  Contact Us
                </Link>
              </li>
            </ul>
            
            {/* Download App Button - Mobile */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  handleAppDownload();
                  closeMobileMenu();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium focus:outline-none"
              >
                <Download size={18} />
                Download App
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
