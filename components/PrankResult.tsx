'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { RotateCcw, Share2, Check, MessageCircle } from 'lucide-react';

interface PrankResultProps {
  answer?: string;
  autoDownload?: boolean;
}

export default function PrankResult({}: PrankResultProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#085e35', '#f59e0b', '#10b981', '#fbbf24', '#ef4444'],
      });
    } catch {
      // Fallback
    }
  }, []);

  const getShareText = () => {
    const url = typeof window !== 'undefined' ? window.location.origin + '/status' : '';
    return `📢 *Honhaar Scholarship 2026 - Eligibility & Merit List Released!*\n\nCheck your status and download eligiblestudents.pdf here:\n👉 ${url}`;
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== 'undefined') {
      const text = encodeURIComponent(getShareText());
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6 text-center animate-in zoom-in-95 duration-300">
      {/* 1. The Simple Message */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug px-4">
        14 september ko university start ho rahi hai un sai hi poch lena 😏
      </h1>

      {/* 2. Salman Khan Meme Image */}
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden border-2 border-slate-900 shadow-2xl bg-black">
        <Image
          src="/aapna-kya-lena-dena.jpg"
          alt="Aapna kya lena dena"
          width={640}
          height={320}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* 3. Minimal Clean Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 px-4">
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 text-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Send on WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0a5836] hover:bg-[#074228] text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 text-sm"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Message &amp; Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-amber-300" />
              <span>Copy WhatsApp Text</span>
            </>
          )}
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-3 rounded-xl border border-slate-300 transition-colors active:scale-95 text-sm"
        >
          <RotateCcw className="w-4 h-4 text-slate-600" />
          <span>Try Again</span>
        </Link>
      </div>
    </div>
  );
}
