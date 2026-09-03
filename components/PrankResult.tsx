'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import {
  Award,
  Sparkles,
  RotateCcw,
  Share2,
  Check,
  PartyPopper,
  ShieldCheck,
  Flame,
  AlertOctagon,
} from 'lucide-react';

interface PrankResultProps {
  answer: string;
}

export default function PrankResult({ answer }: PrankResultProps) {
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [votesStats, setVotesStats] = useState<{ total: number; agreement: number } | null>(null);

  // Pure click-based reactions (0 initial dummy numbers)
  const [reactions, setReactions] = useState<{ [key: string]: number }>({
    '😂': 0,
    '💀': 0,
    '😭': 0,
    '☕': 0,
    '🔥': 0,
  });

  useEffect(() => {
    // Fetch real global live votes
    const fetchRealStats = async () => {
      try {
        const res = await fetch('/api/votes', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const total = data.total || 0;
          const myCount = answer.includes('Khatta') ? data.khatta || 0 : data.khatti || 0;
          const agreement = total > 0 ? Math.round((myCount / total) * 100) : 100;
          setVotesStats({ total, agreement });
        }
      } catch {
        // ignore
      }
    };

    fetchRealStats();

    try {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() * 0.4,
          },
          colors: ['#085e35', '#f59e0b', '#10b981', '#fbbf24', '#ef4444'],
        });
      }, 350);

      return () => clearInterval(interval);
    } catch {
      // Fallback
    }
  }, [answer]);

  const handleMessageClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setEasterEggActive(true);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1,
    }));
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + '/status');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const todayDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto space-y-7 animate-in zoom-in-95 duration-300">
      {/* Easter Egg Modal/Alert */}
      {easterEggActive && (
        <div className="p-4 bg-emerald-950 text-amber-300 rounded-2xl border-2 border-amber-400 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-400 shrink-0 animate-bounce" />
            <div className="text-sm font-semibold">
              <span className="text-white font-extrabold uppercase tracking-wide block text-xs">
                Easter Egg Unlocked! 🕵️
              </span>
              Relax! This is only a class prank. No real personal information was collected.
            </div>
          </div>
          <button
            onClick={() => setEasterEggActive(false)}
            className="text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg"
          >
            Got it
          </button>
        </div>
      )}

      {/* Main Humorous Roman Urdu Banner */}
      <div
        onClick={handleMessageClick}
        title="Click me for a surprise!"
        className="bg-gradient-to-r from-emerald-800 via-[#085e35] to-emerald-900 rounded-3xl p-7 sm:p-10 text-white text-center shadow-2xl relative overflow-hidden cursor-pointer select-none border-4 border-amber-400/80 transition-transform active:scale-[0.99]"
      >
        <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Status: Busted</span>
        </div>

        <div className="space-y-4 pt-1">
          <div className="inline-block text-5xl animate-bounce">😂</div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-300 tracking-tight leading-snug drop-shadow-md">
            &ldquo;Janab, application check karne se pehle thori attendance bhi check kar liya karein 😂&rdquo;
          </h1>

          <p className="text-base sm:text-xl font-medium text-emerald-100 max-w-xl mx-auto">
            Congratulations! Aap officially <span className="text-amber-300 font-bold underline decoration-wavy">class prank</span> ka shikar ho chukay hain.
          </p>

          <p className="text-xs text-emerald-200/70 pt-1">
            (💡 Tip: Click this banner 3 times for a secret easter egg &bull; {clickCount}/3 clicks)
          </p>
        </div>
      </div>

      {/* Aura Points Penalty & Fake Progress Meter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Aura Penalty Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Aura Calculation
            </span>
            <span className="text-xl font-black text-red-600 font-mono">
              -100,000 AURA 📉💀
            </span>
            <p className="text-[11px] text-slate-500">
              Dahi chahe khatta ho ya khatti, aap ka prank confirm ho chuka hai!
            </p>
          </div>
        </div>

        {/* 100% Pranked Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-center space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-700 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-amber-500" />
              Prank Severity
            </span>
            <span className="text-emerald-700 font-mono">100% Pranked</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 via-emerald-600 to-green-600 h-full rounded-full w-full animate-pulse"></div>
          </div>
          <span className="text-[10px] text-slate-400 text-right">
            Verification status: Completely Exposed
          </span>
        </div>
      </div>

      {/* Funny Certificate Card */}
      <div className="bg-gradient-to-b from-[#fdfbf7] to-white rounded-3xl p-6 sm:p-9 border-4 border-double border-amber-600/50 shadow-xl relative overflow-hidden text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-amber-700 shadow-inner">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-800">
            Department of Backbenchers &bull; Section B
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900">
            Certified Class Prank Victim
          </h2>
          <p className="text-xs text-slate-500 italic">
            This certifies that the student answered with high confidence only to get pranked by their classmates.
          </p>
        </div>

        {/* Certificate Metadata */}
        <div className="max-w-md mx-auto my-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-left space-y-2 font-mono text-xs">
          <div className="flex justify-between border-b border-amber-200/50 pb-1.5">
            <span className="text-slate-500">Selected Answer:</span>
            <span className="font-bold text-slate-900">&ldquo;{answer}&rdquo;</span>
          </div>
          {votesStats && votesStats.total > 0 && (
            <div className="flex justify-between border-b border-amber-200/50 pb-1.5">
              <span className="text-slate-500">Real Class Agreement:</span>
              <span className="font-bold text-emerald-800">
                {votesStats.agreement}% of total {votesStats.total} real votes
              </span>
            </div>
          )}
          <div className="flex justify-between border-b border-amber-200/50 pb-1.5">
            <span className="text-slate-500">Date:</span>
            <span className="font-bold text-slate-900">{todayDate}</span>
          </div>
          <div className="flex justify-between border-b border-amber-200/50 pb-1.5">
            <span className="text-slate-500">Class Attendance:</span>
            <span className="font-bold text-red-600">Pending Attendance Verification ☕</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Verdict:</span>
            <span className="font-bold text-[#085e35]">100% Certified Prank</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-around gap-4 border-t border-slate-200 text-center">
          <div className="space-y-1">
            <div className="font-serif italic text-sm text-slate-700 border-b border-slate-300 pb-1 px-4">
              Class CR &amp; Friends
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Chief Prankster
            </p>
          </div>

          <div className="w-18 h-18 rounded-full border-2 border-dashed border-[#085e35] text-[#085e35] flex flex-col items-center justify-center p-1 transform rotate-[-6deg]">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-[8px] font-black uppercase text-center leading-tight">
              Class Approved
            </span>
          </div>

          <div className="space-y-1">
            <div className="font-serif italic text-sm text-slate-700 border-b border-slate-300 pb-1 px-4">
              Canteen Chai Committee
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider">
              Attendance Witness
            </p>
          </div>
        </div>
      </div>

      {/* Emoji Reactions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-2">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Class Reactions:
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {Object.entries(reactions).map(([emoji, count]) => (
            <button
              key={emoji}
              type="button"
              onClick={() => handleEmojiClick(emoji)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-800 rounded-lg border border-slate-200 text-sm font-semibold transition-transform active:scale-95"
            >
              <span className="text-lg">{emoji}</span>
              {count > 0 && (
                <span className="font-mono text-xs text-slate-600">{count}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1 pb-8">
        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              <span>Link Copied! Send to Friends</span>
            </>
          ) : (
            <>
              <Share2 className="w-5 h-5" />
              <span>Prank a Classmate (Copy Link)</span>
            </>
          )}
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3.5 rounded-xl border border-slate-300 transition-colors active:scale-95"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>Try Again</span>
        </Link>
      </div>
    </div>
  );
}
