'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award, Calculator, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import PricingCalculator from '@/components/PricingCalculator';

export default function PricingCalculatorPage() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="selection:bg-primary-500/30 flex min-h-screen flex-col overflow-hidden bg-[#0B0F19] font-sans text-white">
      <AnimatePresence mode="wait">
        {!isStarted
          ? (
              <motion.section
                key="intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeInOut' } }}
                className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6"
              >
                <div className="pointer-events-none absolute inset-0">
                  <div className="bg-primary-600/10 absolute top-[-10%] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 mix-blend-screen blur-[120px]" />
                  <div className="absolute right-0 bottom-[-10%] h-[500px] w-[800px] rounded-full bg-indigo-600/10 opacity-40 mix-blend-screen blur-[120px]" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                </div>

                <Container size="5xl" className="relative z-10 flex h-full flex-col items-center justify-center pb-20 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-primary-300 mb-8 inline-flex cursor-default items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold tracking-widest uppercase shadow-lg backdrop-blur-md transition-colors hover:bg-white/10"
                  >
                    <Calculator className="h-3 w-3" />
                    {' '}
                    Enterprise Cost Estimator
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="mb-6 text-5xl leading-tight font-bold tracking-tight text-white md:text-7xl"
                  >
                    Transparansi Biaya
                    {' '}
                    <br />
                    <span className="bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
                      Transformasi Digital
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed font-light text-slate-400 md:text-xl"
                  >
                    Dapatkan estimasi investasi akurat untuk implementasi BizOps ERP. Sesuaikan skala pengguna, modul, dan infrastruktur tanpa biaya tersembunyi.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-8"
                  >
                    <button
                      onClick={() => setIsStarted(true)}
                      className="group relative inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-base font-bold tracking-wide text-[#0B0F19] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)]"
                    >
                      <span>Mulai Simulasi Harga</span>
                      <div className="rounded-full bg-[#0B0F19]/10 p-1 transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </button>

                    <div className="flex items-center gap-8 border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span>ISO 27001 Certified</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Lock className="h-4 w-4 text-blue-500" />
                        <span>Data Encrypted</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>Industry Leader</span>
                      </div>
                    </div>
                  </motion.div>
                </Container>
              </motion.section>
            )
          : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex h-screen flex-col overflow-hidden bg-[#0B0F19]"
              >
                <div className="z-20 flex h-16 flex-shrink-0 items-center justify-between border-b border-white/5 bg-[#0B0F19]/80 px-6 backdrop-blur-md">
                  <button
                    onClick={() => setIsStarted(false)}
                    className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span className="hidden sm:inline">Back to Intro</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="hidden items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-slate-500 md:flex">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></div>
                      Live Estimation
                    </div>
                  </div>
                </div>

                <div className="relative flex-grow overflow-hidden">
                  <PricingCalculator />
                </div>
              </motion.div>
            )}
      </AnimatePresence>
    </div>
  );
}
