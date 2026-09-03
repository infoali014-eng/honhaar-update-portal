import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  FileDown,
  HelpCircle,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Building2,
  FileCheck2,
} from 'lucide-react';

export default function InfoCard() {
  const criteriaPoints = [
    'No Age Limit',
    'Have domicile of Punjab province / selected approved districts',
    'No Gender specific (Open to male, female, and transgender candidates)',
    'Monthly Family income of the applicant must be less than Rs. 350,000/- (Affidavit on E-Stamp Required)',
    'The applicant must be enrolled in BS degree programs in selected Disciplines in any Public University, College & Medical & Dental College (Fall 2025 and onward)',
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'How to Apply', href: '/#process', isNew: true },
    { label: 'FAQs', href: '/#faqs' },
    { label: 'Check Status / Download Merit List', href: '/status' },
    { label: 'Terms & Conditions', href: '/#terms' },
    { label: 'SOPs of Program', href: '/#sops' },
  ];

  return (
    <section className="py-14 bg-white space-y-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Official Eligibility Criteria Box */}
        <div id="eligibility" className="border border-slate-200 rounded-2xl p-6 sm:p-9 bg-[#fdfdfd] shadow-xs scroll-mt-24">
          <div className="border-b border-slate-200 pb-4 mb-6">
            <span className="text-xs font-bold text-[#0a5836] uppercase tracking-wider block">
              Selection Guidelines
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Eligibility Criteria
            </h3>
            <h4 className="text-sm font-semibold text-slate-600 mt-1">
              Applicant Must fulfill the following conditions:
            </h4>
          </div>

          <ul className="space-y-4">
            {criteriaPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0a5836] shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {pt}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/status"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0a5836] hover:text-[#074228] underline underline-offset-4"
            >
              <FileDown className="w-4 h-4" />
              <span>Download eligiblestudents.pdf (Merit List)</span>
            </Link>

            <Link
              href="/status"
              className="inline-flex items-center gap-2 bg-[#0a5836] hover:bg-[#074228] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              <span>Verify &amp; Download List</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. Helpdesk & Support Box */}
        <div id="helpdesk" className="bg-[#f2f8f4] border-2 border-[#0a5836]/30 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-[#0a5836]">
              Facing issues regarding Scholarship or Status?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Contact the Honhaar Undergraduate Help Desk for inquiries and assistance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a
              href="mailto:honhaar@punjabhec.gov.pk"
              className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 shadow-xs hover:border-[#0a5836]"
            >
              <Mail className="w-4 h-4 text-[#0a5836]" />
              <span>honhaar@punjabhec.gov.pk</span>
            </a>
            <a
              href="tel:04299231903"
              className="inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 shadow-xs hover:border-[#0a5836]"
            >
              <Phone className="w-4 h-4 text-[#0a5836]" />
              <span>042-99231903</span>
            </a>
          </div>
        </div>

        {/* 3. Quick Links Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 font-serif border-b border-slate-200 pb-2">
            Quick Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {quickLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="p-3.5 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200/80 hover:border-emerald-300 flex items-center justify-between text-sm font-semibold text-slate-700 hover:text-[#0a5836] transition-colors"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="bg-amber-400 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded">
                    New
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
