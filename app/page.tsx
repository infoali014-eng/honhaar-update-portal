import React from 'react';
import Hero from '@/components/Hero';
import InfoCard from '@/components/InfoCard';
import FAQSection from '@/components/FAQSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <InfoCard />
      <FAQSection />
    </div>
  );
}
