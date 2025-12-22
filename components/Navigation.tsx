"use client";

import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="text-2xl font-serif font-bold text-primary-700">
              Outerra
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="#categories"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Categories
            </a>
            <a
              href="#configurator"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Configurator
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#configurator"
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
            >
              Design Yours
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#home"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#categories"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </a>
            <a
              href="#configurator"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Configurator
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#configurator"
              className="block px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Design Yours
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

