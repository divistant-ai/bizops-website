// React not needed 'react';
import { BarChart3, Layers, ShieldCheck, TrendingUp } from 'lucide-react';
import React from 'react';

type MethodologyReferenceProps = {
  className?: string;
};

const levels = [
  {
    level: 1,
    label: 'Ad-Hoc',
    desc: 'Inisiatif reaktif, manual, dan tidak terkoordinasi.',
    color: 'bg-red-500',
  },
  {
    level: 2,
    label: 'Opportunistic',
    desc: 'Mulai ada proyek digital parsial (silo) tanpa strategi terpusat.',
    color: 'bg-orange-500',
  },
  {
    level: 3,
    label: 'Repeatable',
    desc: 'Proses terstandarisasi, dokumentasi jelas, strategi mulai terbentuk.',
    color: 'bg-yellow-500',
  },
  {
    level: 4,
    label: 'Managed',
    desc: 'Terintegrasi penuh, berbasis data, dan terukur secara kuantitatif.',
    color: 'bg-blue-500',
  },
  {
    level: 5,
    label: 'Optimized',
    desc: 'Inovasi berkelanjutan, adaptif, dan memimpin pasar (Disruptor).',
    color: 'bg-green-500',
  },
];

export const MethodologyReference: React.FC<MethodologyReferenceProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {/* Framework Explanation */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
        <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <ShieldCheck className="text-primary-400 h-5 w-5" />
          Standar & Metodologi
        </h4>
        <p className="mb-4 text-sm leading-relaxed text-slate-400">
          Assessment ini dikembangkan dengan mengadaptasi kerangka kerja standar industri global untuk memastikan akurasi dan relevansi:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="bg-primary-500/10 mt-1 rounded-full p-1">
              <Layers className="text-primary-400 h-3 w-3" />
            </div>
            <div className="text-sm">
              <strong className="block text-slate-200">TM Forum Digital Maturity Model (DMM)</strong>
              <span className="text-slate-500">Mencakup 5 dimensi holistik: Customer, Strategy, Technology, Operations, dan Culture.</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-primary-500/10 mt-1 rounded-full p-1">
              <TrendingUp className="text-primary-400 h-3 w-3" />
            </div>
            <div className="text-sm">
              <strong className="block text-slate-200">CMMI (Capability Maturity Model Integration)</strong>
              <span className="text-slate-500">Digunakan untuk penjenjangan level kedewasaan proses dari tahap inisiasi hingga optimasi.</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Maturity Levels */}
      <div>
        <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
          <BarChart3 className="text-primary-400 h-5 w-5" />
          Tingkatan Maturity (Leveling)
        </h4>
        <div className="grid gap-3">
          {levels.map(lvl => (
            <div key={lvl.level} className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-3 transition-colors hover:border-white/10">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-bold text-white ${lvl.color}`}>
                {lvl.level}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-200">{lvl.label}</div>
                <div className="text-xs text-slate-500">{lvl.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
