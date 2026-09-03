'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X, FileCheck2, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Scholarship Details', href: '/#info' },
    { label: 'Eligibility', href: '/#eligibility' },
    { label: 'Guidelines', href: '/#process' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#085e35] to-[#04331d] flex items-center justify-center text-white shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#085e35] uppercase">
                Honhaar Portal
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider -mt-0.5">
                Undergraduate Program
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#085e35] bg-emerald-50 font-semibold'
                      : 'text-slate-700 hover:text-[#085e35] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/status"
              className="inline-flex items-center gap-2 bg-[#085e35] hover:bg-[#054025] text-white text-sm font-semibold px-4.5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              <span>Check Status</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/status"
              className="bg-[#085e35] text-white text-xs font-semibold px-3 py-2 rounded-md"
            >
              Check Status
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:text-[#085e35] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#085e35] hover:bg-emerald-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/status"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#085e35] text-white font-medium py-2.5 rounded-lg text-sm shadow"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              Check Status
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
