import React from 'react';
import {
  GraduationCap,
  Award,
  Coins,
  FileText,
  CalendarDays,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default function InfoCard() {
  const criteria = [
    {
      title: 'Undergraduate Program',
      desc: 'Enrolled in 4-year BS degree program in recognized public institutions.',
      icon: GraduationCap,
    },
    {
      title: 'Academic Standing',
      desc: 'Satisfactory semester GPA performance and regular student status.',
      icon: Award,
    },
    {
      title: 'Income Limit',
      desc: 'Monthly family income below the designated assistance threshold.',
      icon: Coins,
    },
    {
      title: 'Attendance Quota',
      desc: 'Mandatory minimum 75% classroom attendance throughout the semester.',
      icon: CheckCircle2,
    },
  ];

  const steps = [
    { num: '01', title: 'Answer Verification', desc: 'Complete the student verification inquiry.' },
    { num: '02', title: 'Attendance Audit', desc: 'System checks lecture attendance records.' },
    { num: '03', title: 'Merit Assessment', desc: 'Academic profile is processed.' },
    { num: '04', title: 'Instant Result', desc: 'Receive real-time scholarship status.' },
  ];

  return (
    <section id="info" className="py-16 bg-[#f8faf9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Eligibility Section */}
        <div id="eligibility" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Eligibility Criteria
            </h2>
            <p className="text-slate-600 text-sm">
              Key standards required for student scholarship consideration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {criteria.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-[#085e35]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#085e35] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4-Step Process */}
        <div id="process" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm">
              Simple 4-stage evaluation workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2"
              >
                <span className="text-xs font-black text-[#085e35] font-mono block">
                  {st.num}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Dates & Documents Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <FileText className="w-5 h-5 text-[#085e35]" />
              <h3 className="font-bold text-slate-900 text-base">Key Documents</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center justify-between">
                <span>Student ID Card Copy</span>
                <span className="text-emerald-700 font-semibold text-[11px]">Required</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Academic Transcript (Latest Semester)</span>
                <span className="text-emerald-700 font-semibold text-[11px]">Required</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Family Income Certificate</span>
                <span className="text-emerald-700 font-semibold text-[11px]">Required</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Class Attendance Clearance Slip</span>
                <span className="text-amber-700 font-semibold text-[11px]">75% Mandatory</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <CalendarDays className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-base">Program Timeline</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2.5">
              <li className="flex items-center justify-between">
                <span>Application Window</span>
                <span className="text-slate-500 font-mono">February 2026</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Status Inquiries</span>
                <span className="text-emerald-700 font-semibold text-[11px]">Active Now</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Attendance Verification</span>
                <span className="text-emerald-700 font-semibold text-[11px]">In Progress</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Merit List Announcement</span>
                <span className="text-slate-500 font-mono">March 2026</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
