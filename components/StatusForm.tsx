'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  Flame,
  AlertTriangle,
  Users,
  FileText,
  Download,
  Lock,
  Building2,
  Award,
  Clock,
  CheckCircle2,
  ShieldAlert,
  Info,
} from 'lucide-react';

const STORAGE_KEY = 'honhaar_voted_status';

interface VoteData {
  khatta: number;
  khatti: number;
  total: number;
}

export default function StatusForm() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [acknowledged, setAcknowledged] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVotedLocally, setHasVotedLocally] = useState(false);
  const [votes, setVotes] = useState<VoteData>({
    khatta: 0,
    khatti: 0,
    total: 0,
  });

  // Fetch real live vote counts from server API
  useEffect(() => {
    try {
      const savedChoice = localStorage.getItem(STORAGE_KEY);
      if (savedChoice) {
        setHasVotedLocally(true);
        setSelectedOption(savedChoice);
      }
    } catch {
      // ignore
    }

    const loadRealVotes = async () => {
      try {
        const res = await fetch('/api/votes', { cache: 'no-store' });
        if (res.ok) {
          const data: VoteData = await res.json();
          setVotes(data);
        }
      } catch {
        // ignore
      }
    };

    loadRealVotes();
  }, []);

  const totalVotes = votes.total;
  const khattaPercent = totalVotes > 0 ? Math.round((votes.khatta / totalVotes) * 100) : 0;
  const khattiPercent = totalVotes > 0 ? Math.round((votes.khatti / totalVotes) * 100) : 0;

  const handleStep1Proceed = () => {
    setStep(2);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedOption) {
      setError('Pehle answer select karein, warna seedha -50,000 Aura ho jaye ga! 💀');
      return;
    }

    setIsSubmitting(true);

    try {
      if (!hasVotedLocally) {
        const res = await fetch('/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ choice: selectedOption }),
        });

        if (res.ok) {
          const updated: VoteData = await res.json();
          setVotes(updated);
        }

        try {
          localStorage.setItem(STORAGE_KEY, selectedOption);
        } catch {
          // ignore
        }
      }
    } catch {
      // Fallback
    }

    const chosenText = selectedOption === 'khatta' ? 'Dahi Khatta hota hai' : 'Dahi Khatti hoti hai';
    router.push(`/status/result?answer=${encodeURIComponent(chosenText)}&autoDownload=true`);
  };

  const options = [
    {
      id: 'khatta',
      label: 'Dahi Khatta hota hai',
      subtitle: 'Bro is fighting for his life with that sour dahi 🍋',
      badge: 'Option A',
      image: '/man-khatta.jpg',
      count: votes.khatta,
      percent: khattaPercent,
    },
    {
      id: 'khatti',
      label: 'Dahi Khatti hoti hai',
      subtitle: 'She is ready to start a 3rd World War for khatti dahi 📢',
      badge: 'Option B',
      image: '/woman-khatti.jpg',
      count: votes.khatti,
      percent: khattiPercent,
    },
  ];

  return (
    <div ref={formRef} className="space-y-6 max-w-2xl mx-auto">
      {/* 1. Official PDF Download Showcase Card */}
      <div className="bg-white rounded-2xl border-2 border-emerald-800/20 shadow-md p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center shrink-0 shadow-inner">
              <FileText className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  eligiblestudents.pdf
                </span>
                <span className="bg-emerald-100 text-[#0a5836] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  Merit List
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Official List of Selected &amp; Eligible Candidates &bull; 2.4 MB
              </p>
              <p className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Verification &amp; Faculty Instructions required before download</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (step === 1) handleStep1Proceed();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0a5836] hover:bg-[#074228] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* STEP 1: FORMAL FACULTY & ACADEMIC INSTRUCTIONS */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300">
          {/* Header */}
          <div className="bg-[#0a5836] px-6 py-5 text-white flex items-center justify-between border-b border-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-800/90 flex items-center justify-center text-amber-300">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-serif">Faculty Notice &amp; Merit Directives</h2>
                <p className="text-xs text-emerald-100">Step 1 of 2: Academic Compliance Check</p>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-amber-400 text-emerald-950 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Directive
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Directive Alert */}
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-[#0a5836] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                All candidates seeking to view or download <span className="font-mono font-bold">eligiblestudents.pdf</span> are required to carefully read and comply with the following institutional regulations before accessing the list.
              </p>
            </div>

            {/* Structured Guidelines List */}
            <div className="space-y-4">
              {/* Point 1: CGPA / GPA */}
              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0a5836] flex items-center justify-center font-bold text-sm shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Mandatory CGPA / GPA Benchmark:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Applicant&apos;s cumulative <strong>CGPA must be strictly higher than 3.00</strong> (or semester <strong>GPA greater than 2.70</strong> in the preceding academic evaluation cycle). Candidates falling below this threshold will be deferred to the standby review list.
                  </p>
                </div>
              </div>

              {/* Point 2: Faculty Office Visit */}
              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Faculty Office Verification &amp; In-Person Reporting:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Students appearing in <span className="font-mono font-semibold">eligiblestudents.pdf</span> are strongly advised to <strong>visit their respective Faculty / Department Office (Student Affairs Section)</strong> within 7 working days with original transcripts, identity verification, and fee records.
                  </p>
                </div>
              </div>

              {/* Point 3: Attendance Threshold */}
              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0a5836] flex items-center justify-center font-bold text-sm shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900">
                    Minimum 75% Classroom Attendance Compliance:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Tuition waiver approval is strictly tied to lecture presence. Attendance will be cross-checked with departmental registers prior to scholarship disbursement.
                  </p>
                </div>
              </div>
            </div>

            {/* Acknowledgment & Next Button */}
            <div className="pt-2 border-t border-slate-100 space-y-4">
              <button
                type="button"
                onClick={handleStep1Proceed}
                className="w-full py-4 px-6 bg-[#0a5836] hover:bg-[#074228] text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-950/15 hover:shadow-emerald-950/25 flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99]"
              >
                <span>Next: Student Identity Verification &amp; Download</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <p className="text-[11px] text-center text-slate-500">
                Official Directive issued by the Higher Education Assistance Committee
              </p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: THE DAHI VERIFICATION QUESTION (WITH FUNNY IMAGES) */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300">
          {/* Header */}
          <div className="bg-[#0a5836] px-6 py-5 text-white flex items-center justify-between border-b border-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-800/90 flex items-center justify-center text-amber-300">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-serif">Portal Verification Step</h2>
                <p className="text-xs text-emerald-100">Step 2 of 2: Identity &amp; Student Validation</p>
              </div>
            </div>

            {totalVotes > 0 && (
              <div className="flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-full text-[11px] text-emerald-200 border border-emerald-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono font-semibold">
                  {totalVotes} {totalVotes === 1 ? 'real vote' : 'real votes'}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Warning: Aura penalty text */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium flex items-start gap-3">
              <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <strong className="text-amber-900 font-bold block">Important Advisory:</strong>
                <p className="leading-relaxed">
                  We have not created poll k agar answer na kia tou aura minus ho jaye ga! 📉💀
                </p>
              </div>
            </div>

            {/* The Question Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-base sm:text-lg font-bold text-slate-900">
                  Dahi Khatta hota hai ya Dahi Khatti hoti hai? <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-slate-500">
                  Cast your real vote to unlock and download <span className="font-mono font-bold text-slate-800">eligiblestudents.pdf</span>.
                </p>

                {/* Voting Options with Funny Images */}
                <div className="space-y-4 pt-2">
                  {options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedOption(opt.id);
                          if (error) setError(null);
                        }}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all relative overflow-hidden group ${
                          isSelected
                            ? 'border-[#0a5836] bg-emerald-50/70 shadow-md ring-2 ring-[#0a5836]/30'
                            : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {totalVotes > 0 && (
                          <div
                            className={`absolute left-0 top-0 bottom-0 pointer-events-none transition-all duration-500 ${
                              isSelected ? 'bg-emerald-100/70' : 'bg-slate-100/60'
                            }`}
                            style={{ width: `${opt.percent}%` }}
                          />
                        )}

                        <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-4">
                          <div className="flex items-center gap-3 sm:gap-4 flex-1">
                            {/* Radio Indicator */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'border-[#0a5836] bg-[#0a5836]'
                                  : 'border-slate-300 group-hover:border-slate-400'
                              }`}
                            >
                              {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>

                            {/* Funny Meme Photo Thumbnail */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-slate-100">
                              <Image
                                src={opt.image}
                                alt={opt.label}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                                sizes="(max-width: 640px) 64px, 80px"
                                priority
                              />
                            </div>

                            {/* Label & Subtitle */}
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <span className="font-extrabold text-slate-900 text-sm sm:text-base block truncate">
                                {opt.label}
                              </span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">
                                {opt.subtitle}
                              </span>
                              {totalVotes > 0 && (
                                <span className="text-[11px] text-emerald-800 font-mono font-bold block pt-0.5">
                                  {opt.count} {opt.count === 1 ? 'real vote' : 'real votes'} ({opt.percent}%)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-col items-end shrink-0 pl-1">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-[#0a5836] text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              {opt.badge}
                            </span>
                            {totalVotes > 0 && (
                              <span className="text-xs font-black font-mono text-slate-700 mt-1">
                                {opt.percent}%
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {totalVotes > 0 && (
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 px-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{totalVotes} {totalVotes === 1 ? 'total real vote' : 'total real votes'} across users</span>
                    </span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 animate-in fade-in">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm font-semibold transition-colors order-2 sm:order-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Instructions</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-4 px-6 bg-[#0a5836] hover:bg-[#074228] text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-950/15 hover:shadow-emerald-950/25 flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] disabled:opacity-75 order-1 sm:order-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying &amp; Unlocking PDF...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit &amp; Download eligiblestudents.pdf</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
