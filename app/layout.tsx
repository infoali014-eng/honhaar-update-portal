import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Honhaar Scholarships | Undergraduate Scholarship Program',
  description: 'Higher Education Undergraduate Scholarship Program. Check your application status, eligibility guidelines, and download eligible students list.',
  openGraph: {
    title: 'Honhaar Scholarships | Undergraduate Scholarship Program',
    description: 'Higher Education Undergraduate Scholarship Program. Check your application status, eligibility guidelines, and download eligible students list.',
    url: 'https://honhaar-update-portal.vercel.app',
    siteName: 'Honhaar Scholarships',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Honhaar Scholarships | Undergraduate Scholarship Program',
    description: 'Higher Education Undergraduate Scholarship Program. Check your application status, eligibility guidelines, and download eligible students list.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#f8faf9] text-slate-900 antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
