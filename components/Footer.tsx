import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#053b23] text-slate-200 border-t border-[#042e1b] pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-emerald-900/60">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-amber-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-base text-white uppercase tracking-tight font-serif block">
                  HONHAAR SCHOLARSHIPS
                </span>
                <span className="text-[11px] text-emerald-200 font-medium">
                  Undergraduate Scholarship Program
                </span>
              </div>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-md">
              Higher Education Undergraduate financial assistance portal for deserving and talented students across recognized institutions.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-200">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#eligibility" className="hover:text-amber-300 transition-colors">
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-amber-300 transition-colors">
                  Check Status &bull; eligiblestudents.pdf
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Follow Us
            </h4>
            <p className="text-xs text-emerald-200">
              Follow us on social media for more updates and scholarship circulars.
            </p>
            <p className="text-xs text-amber-300 font-semibold pt-1">
              Powered by: Punjab Higher Education Commission
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300/80 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} Honhaar Scholarships &bull; All Rights Reserved.
          </p>
          <p className="text-[11px] text-emerald-400/60">
            Fictional educational classroom prank demonstration.
          </p>
        </div>
      </div>
    </footer>
  );
}
