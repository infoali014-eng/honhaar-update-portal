'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileCheck2,
  ArrowRight,
  Flame,
  AlertTriangle,
  Users,
  FileText,
  Download,
  Lock,
  CheckCircle2,
  Sparkles,
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVotedLocally, setHasVotedLocally] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
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

  const handleDownloadClick = () => {
    setShowQuestion(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
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
      badge: 'Option A',
      count: votes.khatta,
      percent: khattaPercent,
    },
    {
      id: 'khatti',
      label: 'Dahi Khatti hoti hai',
      badge: 'Option B',
      count: votes.khatti,
      percent: khattiPercent,
    },
  ];

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* 1. Official PDF Download Showcase Card */}
      <div className="bg-white rounded-2xl border-2 border-emerald-800/20 shadow-lg p-5 sm:p-6 relative overflow-hidden">
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
                <span className="bg-emerald-100 text-[#085e35] text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  Merit List
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Official List of Selected &amp; Eligible Candidates &bull; 2.4 MB
              </p>
              <p className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                <Lock className="w-3 h-3 text-amber-600" />
                <span>Student verification question required to download</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#085e35] hover:bg-[#054025] text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Verification Step Form (Requested question UI) */}
      <div
        ref={formRef}
        className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-300"
      >
        {/* Header */}
        <div className="bg-[#085e35] px-6 py-5 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-700/80 flex items-center justify-center text-amber-300">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Portal Verification Step</h2>
              <p className="text-xs text-emerald-100">Identity &amp; Student Validation</p>
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

              {/* Voting Options */}
              <div className="space-y-3.5 pt-2">
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
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${
                        isSelected
                          ? 'border-[#085e35] bg-emerald-50/70 shadow-sm ring-1 ring-[#085e35]'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {totalVotes > 0 && (
                        <div
                          className={`absolute left-0 top-0 bottom-0 pointer-events-none transition-all duration-500 ${
                            isSelected ? 'bg-emerald-100/60' : 'bg-slate-100/60'
                          }`}
                          style={{ width: `${opt.percent}%` }}
                        />
                      )}

                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'border-[#085e35] bg-[#085e35]'
                                : 'border-slate-300 group-hover:border-slate-400'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <div>
                            <span className="font-bold text-slate-800 text-sm sm:text-base block">
                              {opt.label}
                            </span>
                            {totalVotes > 0 && (
                              <span className="text-[11px] text-slate-500 font-mono">
                                {opt.count} {opt.count === 1 ? 'real vote' : 'real votes'} ({opt.percent}%)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isSelected
                                ? 'bg-[#085e35] text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {opt.badge}
                          </span>
                          {totalVotes > 0 && (
                            <span className="text-xs font-black font-mono text-slate-600 mt-1">
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

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#085e35] hover:bg-[#054025] text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] disabled:opacity-75"
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
    </div>
  );
}
