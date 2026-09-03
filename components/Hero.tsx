import React from 'react';
import Link from 'next/link';
import { FileCheck2, ArrowRight, BookOpen, AlertCircle, Bell } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/25 to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Real Notification Banner Strip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-[#0a5836] text-xs font-bold tracking-wide shadow-xs">
          <Bell className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>New Registration &amp; Merit Lists are now live for Undergraduate students (Fall 2025 - 2026)</span>
        </div>

        {/* Official Headline matching honhaarscholarship.punjabhec.gov.pk */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0a5836] tracking-tight uppercase font-serif">
            HONHAAR SCHOLARSHIPS
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-normal">
            Undergraduate Scholarship Program
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed pt-1">
            Financial support initiative for brilliant and deserving students enrolled in public sector universities, colleges, and medical &amp; dental colleges.
          </p>
        </div>

        {/* Action Buttons matching the official portal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/status"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0a5836] hover:bg-[#074228] text-white text-base font-bold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 ring-2 ring-emerald-600/20"
          >
            <FileCheck2 className="w-5 h-5 text-amber-300" />
            <span>Check Your Status</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </Link>

          <Link
            href="/status"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-base font-bold px-7 py-3.5 rounded-xl shadow-md transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Download eligiblestudents.pdf</span>
          </Link>

          <Link
            href="#eligibility"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0a5836] text-base font-semibold px-6 py-3.5 rounded-xl border border-slate-300 shadow-xs transition-colors"
          >
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>Eligibility Criteria</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
