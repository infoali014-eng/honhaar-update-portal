'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I check my scholarship status?',
      a: 'Click "Check Status" on the navbar or hero section and complete the verification question.',
    },
    {
      q: 'Why does the verification ask about Dahi?',
      a: 'Because critical grammatical debates determine student aura and class attention span! 😂',
    },
    {
      q: 'Is any CNIC or password required?',
      a: 'No. This website does not ask for or collect CNIC numbers, passwords, or personal credentials.',
    },
    {
      q: 'What if my class attendance is low?',
      a: 'Students with frequent cafeteria chai breaks are closely monitored by the backbenchers committee.',
    },
  ];

  return (
    <section id="faq" className="py-14 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Quick answers about the portal and status verification.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#085e35]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
