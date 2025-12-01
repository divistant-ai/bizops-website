import { setRequestLocale } from 'next-intl/server';
import React from 'react';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main className="flex-grow">
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
