import React from 'react';
import Link from 'next/link';
import { FileCheck2, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-white pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/70 border border-emerald-300/60 text-[#085e35] text-xs font-bold tracking-wide">
          <span>Honhaar Undergraduate Scholarships &bull; Batch 2025–2026</span>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Supporting Students. <br />
            <span className="text-[#085e35]">Building Futures.</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Merit-based undergraduate financial assistance initiative for higher education students across selected universities and colleges.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/status"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#085e35] hover:bg-[#054025] text-white text-base font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <FileCheck2 className="w-5 h-5 text-amber-300" />
            <span>Check Your Status</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </Link>

          <Link
            href="#info"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-[#085e35] text-base font-semibold px-7 py-4 rounded-xl border border-slate-300 hover:border-emerald-600/40 shadow-xs transition-colors"
          >
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <span>View Scholarship Information</span>
          </Link>
        </div>

        {/* Minimal Highlights */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#085e35]" />
            <span>100% Tuition Coverage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#085e35]" />
            <span>Merit-Based Selection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#085e35]" />
            <span>Instant Status Verification</span>
          </div>
        </div>
      </div>
    </section>
  );
}
