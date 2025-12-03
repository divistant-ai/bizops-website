import type { Metadata } from 'next';
import { Clock, Hammer, Linkedin, Mail, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Maintenance - System Update | BizOps',
  description: 'Sistem sedang dalam maintenance terjadwal.',
};

export default function MaintenancePage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B1120] px-4 text-center font-sans text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute -top-[20%] left-1/2 size-[800px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl">
        <div className="mx-auto mb-10 flex size-28 items-center justify-center rounded-[2.5rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md">
          <Hammer className="size-12 text-blue-400" />
        </div>

        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/30 px-4 py-2 text-xs font-bold tracking-wider text-blue-300 uppercase">
          <Clock className="size-3" />
          {' '}
          Scheduled Maintenance
        </div>

        <h1 className="mb-6 text-4xl leading-tight font-extrabold text-white md:text-6xl">We'll be back soon.</h1>

        <p className="mx-auto mb-12 max-w-xl text-lg leading-relaxed font-light text-slate-400 md:text-xl">
          Sistem sedang melakukan pembaruan infrastruktur terjadwal untuk meningkatkan performa dan keamanan. Estimasi
          waktu selesai:
          {' '}
          <strong>2 Jam</strong>
          .
        </p>

        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          <h3 className="mb-6 font-bold text-white">Need urgent help?</h3>
          <div className="flex justify-center gap-4">
            <a href="mailto:support@bizops.id" className="group flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 transition-all group-hover:bg-white group-hover:text-slate-900">
                <Mail className="size-5" />
              </div>
              <span className="text-xs text-slate-400">Email</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 transition-all group-hover:bg-[#1DA1F2] group-hover:text-white">
                <Twitter className="size-5" />
              </div>
              <span className="text-xs text-slate-400">Twitter</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-2">
              <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 transition-all group-hover:bg-[#0077b5] group-hover:text-white">
                <Linkedin className="size-5" />
              </div>
              <span className="text-xs text-slate-400">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
