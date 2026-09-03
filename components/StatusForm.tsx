'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileCheck2,
  ArrowRight,
  Flame,
  AlertTriangle,
  Users,
} from 'lucide-react';

const STORAGE_KEY = 'honhaar_dahi_votes';

interface VoteState {
  khatta: number;
  khatti: number;
  hasVoted: boolean;
  userChoice: string | null;
}

export default function StatusForm() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [votes, setVotes] = useState<VoteState>({
    khatta: 0,
    khatti: 0,
    hasVoted: false,
    userChoice: null,
  });

  // Load purely real votes from localStorage (no dummy data)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setVotes(parsed);
        if (parsed.userChoice) {
          setSelectedOption(parsed.userChoice);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const totalVotes = votes.khatta + votes.khatti;
  const khattaPercent = totalVotes > 0 ? Math.round((votes.khatta / totalVotes) * 100) : 0;
  const khattiPercent = totalVotes > 0 ? Math.round((votes.khatti / totalVotes) * 100) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedOption) {
      setError('Pehle answer select karein, warna seedha -50,000 Aura ho jaye ga! 💀');
      return;
    }

    setIsSubmitting(true);

    const choice = selectedOption as 'khatta' | 'khatti';
    const isFirstTimeVote = !votes.hasVoted;
    const isChangedVote = votes.hasVoted && votes.userChoice !== choice;

    let updatedKhatta = votes.khatta;
    let updatedKhatti = votes.khatti;

    if (isFirstTimeVote) {
      if (choice === 'khatta') updatedKhatta += 1;
      if (choice === 'khatti') updatedKhatti += 1;
    } else if (isChangedVote) {
      if (choice === 'khatta') {
        updatedKhatta += 1;
        updatedKhatti = Math.max(0, updatedKhatti - 1);
      } else {
        updatedKhatti += 1;
        updatedKhatta = Math.max(0, updatedKhatta - 1);
      }
    }

    const updatedVotes: VoteState = {
      khatta: updatedKhatta,
      khatti: updatedKhatti,
      hasVoted: true,
      userChoice: selectedOption,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVotes));
    } catch {
      // ignore
    }

    const chosenText = selectedOption === 'khatta' ? 'Dahi Khatta hota hai' : 'Dahi Khatti hoti hai';
    router.push(`/status/result?answer=${encodeURIComponent(chosenText)}`);
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden max-w-xl mx-auto">
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
              {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
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
              Cast your vote to unlock and verify your scholarship status.
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
                    {/* Real percentage fill when votes exist */}
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
                              {opt.count} {opt.count === 1 ? 'vote' : 'votes'} ({opt.percent}%)
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
                  <span>{totalVotes} {totalVotes === 1 ? 'vote cast' : 'total votes cast'}</span>
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
                  <span>Checking Status...</span>
                </>
              ) : (
                <>
                  <span>Submit &amp; Show Status</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
