'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full shadow-sm bg-white z-50 sticky top-0 left-0 ">
      <nav className="max-w-7xl mx-[4%]  py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-60">
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
        <ul className="hidden md:flex space-x-8 text-gray-500 font-medium">
          <li><a href="#about" className="hover:text-black">About us</a></li>
          <li><a href="#gst" className="hover:text-black">GST Based Loan</a></li>
          <li><a href="#process" className="hover:text-black">Loan Process</a></li>
          <li><a href="#personal" className="hover:text-black">Personal Loan</a></li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4">
          <ul className="space-y-4 text-gray-700 font-medium">
            <li><a href="#about" onClick={() => setIsOpen(false)}>About us</a></li>
            <li><a href="#gst" onClick={() => setIsOpen(false)}>GST Based Loan</a></li>
            <li><a href="#process" onClick={() => setIsOpen(false)}>Loan Process</a></li>
            <li><a href="#personal" onClick={() => setIsOpen(false)}>Personal Loan</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
