import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import StatusForm from '@/components/StatusForm';

export const metadata = {
  title: 'Check Application Status | Honhaar Portal',
  description: 'Verify your scholarship application status.',
};

export default function StatusPage() {
  return (
    <div className="py-10 md:py-16 bg-[#f8faf9] min-h-[calc(100vh-140px)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-[#085e35]">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold">Check Status</span>
        </nav>

        {/* Page Title */}
        <div className="text-center space-y-2 pb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Check Your Application Status
          </h1>
          <p className="text-sm text-slate-600">
            Complete the student verification step below to view your results.
          </p>
        </div>

        {/* Status Form */}
        <StatusForm />
      </div>
    </div>
  );
}
