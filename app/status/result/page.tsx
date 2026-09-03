'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import LoadingStatus from '@/components/LoadingStatus';
import PrankResult from '@/components/PrankResult';

function ResultContent() {
  const searchParams = useSearchParams();
  const answer = searchParams.get('answer') || 'Dahi Khatta hota hai';
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="flex items-center gap-1 hover:text-[#085e35]">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/status" className="hover:text-[#085e35]">
          Status Inquiry
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-bold">Result</span>
      </nav>

      {/* Dynamic View: Loading or Prank Reveal */}
      {isLoading ? (
        <LoadingStatus
          answer={answer}
          onComplete={() => setIsLoading(false)}
        />
      ) : (
        <PrankResult answer={answer} />
      )}
    </div>
  );
}

export default function StatusResultPage() {
  return (
    <div className="py-10 md:py-16 bg-[#f8faf9] min-h-[calc(100vh-140px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-8 h-8 border-4 border-[#085e35] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-600 text-sm font-medium">Loading status...</p>
            </div>
          }
        >
          <ResultContent />
        </Suspense>
      </div>
    </div>
  );
}
