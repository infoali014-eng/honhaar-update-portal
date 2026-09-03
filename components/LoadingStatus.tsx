'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

interface LoadingStatusProps {
  answer: string;
  onComplete: () => void;
}

const MESSAGES = [
  'Verifying student record & response...',
  'Checking academic and lecture attendance...',
  'Analyzing answer with linguistic archives...',
  'Calculating student Aura balance...',
  'Finalizing application result...',
];

export default function LoadingStatus({ answer, onComplete }: LoadingStatusProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < MESSAGES.length - 1 ? prev + 1 : prev));
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 6;
      });
    }, 130);

    const completionTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-lg mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Status
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Answer submitted: <span className="text-emerald-800 font-bold">&ldquo;{answer}&rdquo;</span>
        </p>
      </div>

      {/* Modern Spinner */}
      <div className="py-4 flex flex-col items-center justify-center">
        <div className="relative w-18 h-18">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#085e35] border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-emerald-900 font-mono">
            {Math.min(progress, 100)}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#085e35] to-amber-500 h-full rounded-full transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Rotating Status Message */}
      <div className="min-h-[44px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-700 font-medium text-sm sm:text-base animate-pulse">
          <Loader2 className="w-4 h-4 text-[#085e35] animate-spin shrink-0" />
          <span>{MESSAGES[currentStep]}</span>
        </div>
      </div>
    </div>
  );
}
