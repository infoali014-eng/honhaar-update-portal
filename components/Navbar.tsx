'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Menu,
  X,
  Phone,
  Mail,
  LogIn,
  FileCheck2,
  HelpCircle,
  FileText,
  BookOpen,
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Discipline', href: '/#discipline' },
    { label: 'Institutes', href: '/#institutes' },
    { label: 'Eligibility', href: '/#eligibility' },
    { label: 'FAQs', href: '/#faqs' },
    { label: 'Help Desk', href: '/#helpdesk' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs border-b border-slate-200">
      {/* Official Top Bar */}
      <div className="bg-[#0a5836] text-emerald-50 text-xs px-4 py-2 border-b border-[#08482c]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-[11px] sm:text-xs text-emerald-100 font-medium">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>042-99231903</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>honhaar@punjabhec.gov.pk</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/status"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 hover:text-white transition-colors"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Student Portal / Status</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo matching the real portal */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-[#0a5836] flex items-center justify-center text-white shadow-md shadow-emerald-950/20 ring-2 ring-emerald-600/30 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0a5836] uppercase leading-tight font-serif">
                HONHAAR SCHOLARSHIPS
              </span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Undergraduate Scholarship Program
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? 'text-[#0a5836] bg-emerald-50'
                      : 'text-slate-700 hover:text-[#0a5836] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Check Status CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/status"
              className="inline-flex items-center gap-2 bg-[#0a5836] hover:bg-[#074228] text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-150 active:scale-95 ring-2 ring-emerald-600/20"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              <span>Check Status</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/status"
              className="bg-[#0a5836] text-white text-xs font-bold px-3 py-2 rounded-md"
            >
              Check Status
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:text-[#0a5836] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-700 hover:text-[#0a5836] hover:bg-emerald-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="/status"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#0a5836] text-white font-bold py-3 rounded-lg text-sm shadow"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              Check Status &bull; eligiblestudents.pdf
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
