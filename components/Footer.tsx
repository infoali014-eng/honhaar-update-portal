import React from 'react';
import Link from 'next/link';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#032e1a] text-slate-300 border-t border-emerald-950 pt-10 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white uppercase tracking-tight block">
                Honhaar Portal
              </span>
              <span className="text-[11px] text-emerald-300 font-medium">
                Undergraduate Support Initiative
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-emerald-200">
            <Link href="/" className="hover:text-amber-300 transition-colors">
              Home
            </Link>
            <Link href="/#info" className="hover:text-amber-300 transition-colors">
              Criteria
            </Link>
            <Link href="/#process" className="hover:text-amber-300 transition-colors">
              Process
            </Link>
            <Link href="/status" className="hover:text-amber-300 transition-colors font-bold text-amber-400">
              Check Status
            </Link>
          </div>
        </div>

        {/* Subtle & safe legal note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80 text-center sm:text-left">
          <p>
            Honhaar Update Portal is a class project &bull; Not an official scholarship or government website. No personal information is collected.
          </p>
          <p className="flex items-center justify-center gap-1">
            <span>Classroom prank edition</span>
            <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
