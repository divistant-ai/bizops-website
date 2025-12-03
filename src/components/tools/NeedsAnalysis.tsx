'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calculator,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Crosshair,
  Layers,
  Lightbulb,
  PieChart,
  RefreshCw,
  Search,
  Server,
  Users,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import {
  budgets,
  goals,
  holisticIssues,
  industries,
  modules,
  painPoints,
  serviceSolutions,
  techStackOptions,
  timelines,
} from '@/data/needsAnalysisData';
import { logger } from '@/utils/logger';

type StepType
  = | 'intro'
    | 'context'
    | 'tech-stack'
    | 'operational-context'
    | 'pain-points'
    | 'goals'
    | 'expectations'
    | 'analyzing'
    | 'result';

const STEPS_ORDER: StepType[] = [
  'intro',
  'context',
  'tech-stack',
  'operational-context',
  'pain-points',
  'goals',
  'expectations',
  'result',
];

// --- ISOLATED COMPONENTS ---

const ProgressBar = ({
  step,
  displayStep,
  totalSteps,
}: {
  step: StepType;
  displayStep: number;
  totalSteps: number;
}) => {
  if (step === 'intro' || step === 'analyzing' || step === 'result') {
    return null;
  }
  const progress = (displayStep / totalSteps) * 100;

  return (
    <div className="fixed top-20 left-0 z-50 h-1 w-full bg-slate-900">
      <motion.div
        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

const StepLayout = ({
  title,
  desc,
  children,
  prevStep,
  nextStep,
  disableNext,
  setStep,
  displayStep,
  totalSteps,
  handleFinish,
}: any) => (
  <div className="min-h-screen bg-slate-950 px-4 pt-24 pb-12 text-white">
    <ProgressBar step="context" displayStep={displayStep} totalSteps={totalSteps} />
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <div className="mb-2 text-xs font-bold tracking-widest text-blue-500 uppercase">
          Step
          {' '}
          {displayStep}
          {' '}
          of
          {' '}
          {totalSteps}
        </div>
        <h2 className="mb-2 text-3xl font-bold">{title}</h2>
        <p className="text-slate-400">{desc}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 min-h-[400px]"
      >
        {children}
      </motion.div>

      <div className="flex justify-between border-t border-white/10 pt-6">
        <button
          onClick={() => setStep(prevStep)}
          className="flex items-center gap-2 text-slate-500 hover:text-white"
        >
          <ArrowLeft className="size-4" />
          {' '}
          Kembali
        </button>
        <Button
          onClick={typeof nextStep === 'string' ? () => setStep(nextStep) : nextStep}
          disabled={disableNext}
          className={
            disableNext ? 'opacity-50' : nextStep === handleFinish ? 'bg-emerald-600 hover:bg-emerald-500' : ''
          }
        >
          {nextStep === handleFinish ? 'Lihat Hasil Analisis' : 'Lanjut'}
          {nextStep !== handleFinish && <ChevronRight className="ml-2 size-4" />}
          {nextStep === handleFinish && <Search className="ml-2 size-4" />}
        </Button>
      </div>
    </div>
  </div>
);

// --- MAIN COMPONENT ---

export default function NeedsAnalysis() {
  const [step, setStep] = useState<StepType>('intro');

  // Selections
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedHolisticIssues, setSelectedHolisticIssues] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const [contextData, setContextData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    role: '',
    teamSize: '',
    industry: '',
    techStack: '',
  });

  // --- LOGIC ---
  const toggleSelection = (list: string[], item: string, setList: (l: string[]) => void, max: number = 10) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      if (list.length < max) {
        setList([...list, item]);
      }
    }
  };

  const currentStepIndex = STEPS_ORDER.indexOf(step);
  const totalSteps = STEPS_ORDER.length - 2;
  const displayStep = currentStepIndex;

  const getRecommendedModules = () => {
    const allTags = [
      ...selectedPainPoints,
      ...selectedGoals,
      ...selectedHolisticIssues,
      contextData.techStack,
      contextData.industry,
    ];

    return modules
      .map((mod) => {
        const matchCount = mod.relevance.filter(tag => allTags.includes(tag)).length;
        const industryBonus = mod.relevance.includes(contextData.industry) ? 3 : 0;
        const holisticBonus = mod.relevance.some(r => selectedHolisticIssues.includes(r)) ? 2 : 0;
        return { ...mod, matchScore: matchCount + industryBonus + holisticBonus };
      })
      .filter(mod => mod.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  };

  const getRecommendedServices = () => {
    const allTags = [...selectedPainPoints, ...selectedHolisticIssues, contextData.techStack];

    return serviceSolutions
      .map((svc) => {
        const matchCount = svc.relevance.filter(tag => allTags.includes(tag)).length;
        return { ...svc, matchScore: matchCount };
      })
      .filter(svc => svc.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 2);
  };

  const handleFinish = () => {
    logger.info('Lead Data:', contextData);
    setStep('analyzing');
    setTimeout(() => {
      setStep('result');
    }, 2500);
  };

  const handleReset = () => {
    setStep('intro');
    setSelectedPainPoints([]);
    setSelectedGoals([]);
    setSelectedHolisticIssues([]);
    setSelectedTimeline('');
    setSelectedBudget('');
    setContextData({
      name: '',
      company: '',
      email: '',
      phone: '',
      role: '',
      teamSize: '',
      industry: '',
      techStack: '',
    });
  };

  // --- RENDERERS ---

  if (step === 'intro') {
    return (
      <div className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 text-white">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute top-0 right-0 size-[500px] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 size-[500px] rounded-full bg-emerald-900/10 blur-[120px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-20 pb-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left Column: Headline & CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 backdrop-blur-sm">
                <Crosshair className="size-4" />
                {' '}
                Solution Finder 2.0
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight md:text-6xl">
                Temukan Solusi BizOps
                {' '}
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Yang Paling Tepat.
                </span>
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-400">
                Bingung mulai dari mana? Dapatkan
                {' '}
                <strong>Strategic Blueprint</strong>
                {' '}
                yang dipersonalisasi—mencakup
                rekomendasi software dan strategi implementasi (PPT) hanya dalam 2 menit.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  onClick={() => setStep('context')}
                  size="lg"
                  className="h-14 rounded-xl bg-blue-600 px-8 text-lg shadow-lg shadow-blue-900/20 hover:bg-blue-500"
                >
                  Mulai Diagnosa Gratis
                  {' '}
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-emerald-500" />
                  {' '}
                  Free Analysis
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-emerald-500" />
                  {' '}
                  No Sign-up Required
                </div>
              </div>
            </motion.div>

            {/* Right Column: Feature Visuals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Floating Cards */}
              <div className="relative z-10 grid gap-5">
                {/* Card 1: Holistic */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                  <div className="rounded-xl bg-blue-500/20 p-3 text-blue-400">
                    <Layers className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">Holistic Diagnosis</h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Kami tidak hanya melihat software, tapi juga kesiapan tim (People) dan alur kerja (Process).
                    </p>
                  </div>
                </div>

                {/* Card 2: Roadmap */}
                <div className="flex translate-x-8 items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-transform duration-300 hover:translate-x-8 hover:-translate-y-1">
                  <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-400">
                    <Calendar className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">Actionable Roadmap</h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Dapatkan timeline implementasi langkah demi langkah, dari Quick Win hingga Optimization.
                    </p>
                  </div>
                </div>

                {/* Card 3: Difference */}
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                  <div className="rounded-xl bg-amber-500/20 p-3 text-amber-400">
                    <Lightbulb className="size-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">Practical Solution</h3>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Berbeda dengan Maturity Assessment yang hanya memberi skor, kami memberi resep solusi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -z-10 size-[400px] -translate-x-1/2 -translate-y-1/2 animate-[spin_60s_linear_infinite] rounded-full border border-blue-500/20" />
              <div className="absolute top-1/2 left-1/2 -z-10 size-[250px] -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite_reverse] rounded-full border border-emerald-500/20" />
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'context') {
    return (
      <StepLayout
        title="Profil & Kontak"
        desc="Data ini digunakan untuk personalisasi laporan Anda."
        prevStep="intro"
        nextStep="tech-stack"
        disableNext={!contextData.company || !contextData.email}
        setStep={setStep}
        displayStep={displayStep}
        totalSteps={totalSteps}
        handleFinish={handleFinish}
      >
        <div className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Nama Lengkap</label>
              <input
                type="text"
                value={contextData.name}
                onChange={e => setContextData({ ...contextData, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Nama Perusahaan
                {' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contextData.company}
                onChange={e => setContextData({ ...contextData, company: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="PT. Contoh Indonesia"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
                {' '}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={contextData.email}
                onChange={e => setContextData({ ...contextData, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">No. Telepon (WA)</label>
              <input
                type="tel"
                value={contextData.phone}
                onChange={e => setContextData({ ...contextData, phone: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="+62 812 3456 7890"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Posisi/Jabatan</label>
              <input
                type="text"
                value={contextData.role}
                onChange={e => setContextData({ ...contextData, role: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="IT Manager"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Jumlah Karyawan</label>
              <select
                value={contextData.teamSize}
                onChange={e => setContextData({ ...contextData, teamSize: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Pilih...</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">Industri</label>
            <select
              value={contextData.industry}
              onChange={e => setContextData({ ...contextData, industry: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Pilih Industri...</option>
              {industries.map(ind => (
                <option key={ind.id} value={ind.id}>
                  {ind.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </StepLayout>
    );
  }

  if (step === 'tech-stack') {
    return (
      <StepLayout
        title="Tech Stack & Infrastruktur"
        desc="Bantu kami memahami kondisi teknologi Anda saat ini."
        prevStep="context"
        nextStep="operational-context"
        disableNext={false}
        setStep={setStep}
        displayStep={displayStep}
        totalSteps={totalSteps}
        handleFinish={handleFinish}
      >
        <div className="space-y-6">
          <div>
            <label className="mb-3 block text-sm font-bold text-white">Sistem yang Sedang Digunakan</label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {techStackOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setContextData({ ...contextData, techStack: opt.id })}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                    contextData.techStack === opt.id
                      ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-medium">{opt.label}</span>
                  {opt.desc && <span className="text-[10px] opacity-70">{opt.desc}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </StepLayout>
    );
  }

  if (step === 'operational-context') {
    return (
      <StepLayout
        title="Tantangan Operasional"
        desc="Pilih masalah holistik (People, Process, Technology) yang sedang dihadapi."
        prevStep="tech-stack"
        nextStep="pain-points"
        disableNext={selectedHolisticIssues.length === 0}
        setStep={setStep}
        displayStep={displayStep}
        totalSteps={totalSteps}
        handleFinish={handleFinish}
      >
        <div className="space-y-4">
          <div className="mb-2 text-sm text-slate-400">Pilih minimal 1, maksimal 5 masalah.</div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ...holisticIssues.people,
              ...holisticIssues.process,
              ...(contextData.techStack && holisticIssues.technology[contextData.techStack as keyof typeof holisticIssues.technology]
                ? holisticIssues.technology[contextData.techStack as keyof typeof holisticIssues.technology]
                : []),
            ].map((issue: { id: string; label: string; desc?: string; icon?: any }) => (
              <button
                key={issue.id}
                onClick={() => toggleSelection(selectedHolisticIssues, issue.id, setSelectedHolisticIssues, 5)}
                disabled={!selectedHolisticIssues.includes(issue.id) && selectedHolisticIssues.length >= 5}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                  selectedHolisticIssues.includes(issue.id)
                    ? 'border-amber-500 bg-amber-500/10 text-white ring-1 ring-amber-500'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
                }`}
              >
                {issue.icon && <issue.icon className="mt-1 size-5 flex-shrink-0" />}
                <div>
                  <div className="mb-1 text-sm font-bold">{issue.label}</div>
                  {issue.desc && <div className="text-xs leading-relaxed opacity-80">{issue.desc}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </StepLayout>
    );
  }

  if (step === 'pain-points') {
    return (
      <StepLayout
        title="Pain Points Spesifik"
        desc="Apa masalah teknis/operasional yang paling mengganggu?"
        prevStep="operational-context"
        nextStep="goals"
        disableNext={selectedPainPoints.length === 0}
        setStep={setStep}
        displayStep={displayStep}
        totalSteps={totalSteps}
        handleFinish={handleFinish}
      >
        <div className="space-y-4">
          <div className="mb-2 text-sm text-slate-400">Pilih minimal 1, maksimal 5 pain points.</div>
          <div className="grid gap-3 md:grid-cols-2">
            {painPoints.map(pain => (
              <button
                key={pain.id}
                onClick={() => toggleSelection(selectedPainPoints, pain.id, setSelectedPainPoints, 5)}
                disabled={!selectedPainPoints.includes(pain.id) && selectedPainPoints.length >= 5}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                  selectedPainPoints.includes(pain.id)
                    ? 'border-red-500 bg-red-500/10 text-white ring-1 ring-red-500'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
                }`}
              >
                <pain.icon className="mt-1 size-5 flex-shrink-0" />
                <div>
                  <div className="mb-1 text-sm font-bold">{pain.label}</div>
                  <div className="text-xs leading-relaxed opacity-80">{pain.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </StepLayout>
    );
  }

  if (step === 'goals') {
    return (
      <StepLayout
        title="Tujuan Transformasi"
        desc="Apa yang ingin Anda capai dengan solusi baru?"
        prevStep="pain-points"
        nextStep="expectations"
        disableNext={selectedGoals.length === 0}
        setStep={setStep}
        displayStep={displayStep}
        totalSteps={totalSteps}
        handleFinish={handleFinish}
      >
        <div className="space-y-4">
          <div className="mb-2 text-sm text-slate-400">Pilih minimal 1, maksimal 5 goals.</div>
          <div className="grid gap-3 md:grid-cols-2">
            {goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => toggleSelection(selectedGoals, goal.id, setSelectedGoals, 5)}
                disabled={!selectedGoals.includes(goal.id) && selectedGoals.length >= 5}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                  selectedGoals.includes(goal.id)
                    ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50'
                }`}
              >
                <goal.icon className="mt-1 size-5 flex-shrink-0" />
                <div>
                  <div className="mb-1 text-sm font-bold">{goal.label}</div>
                  <div className="text-xs leading-relaxed opacity-80">{goal.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </StepLayout>
    );
  }

  if (step === 'expectations') {
    return (
      <StepLayout
        title="Timeline & Budget"
        desc="Kapan Anda ingin Go-Live dan berapa budget yang tersedia?"
        prevStep="goals"
        nextStep={handleFinish}
        disableNext={!selectedTimeline || !selectedBudget}
        setStep={setStep}
        displayStep={displayStep}
        totalSteps={totalSteps}
        handleFinish={handleFinish}
      >
        <div className="space-y-8">
          <div>
            <label className="mb-3 block text-sm font-bold text-white">Timeline Implementasi</label>
            <div className="grid gap-3 md:grid-cols-3">
              {timelines.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTimeline(t.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                    selectedTimeline === t.id
                      ? 'border-blue-500 bg-blue-500/10 text-white ring-1 ring-blue-500'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <Clock className="size-6" />
                  <div className="text-sm font-bold">{t.label}</div>
                  <div className="text-xs opacity-80">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-bold text-white">Budget Range (Tahunan)</label>
            <div className="grid gap-3 md:grid-cols-3">
              {budgets.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBudget(b.id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${
                    selectedBudget === b.id
                      ? 'border-emerald-500 bg-emerald-500/10 text-white ring-1 ring-emerald-500'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <Wallet className="size-6" />
                  <div className="text-sm font-bold">{b.label}</div>
                  <div className="text-xs opacity-80">{b.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </StepLayout>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            className="mx-auto mb-6 size-16 rounded-full border-4 border-blue-500 border-t-transparent"
          />
          <h2 className="mb-2 text-2xl font-bold">Menganalisis Data Anda...</h2>
          <p className="text-slate-400">Mohon tunggu sebentar.</p>
        </div>
      </div>
    );
  }

  if (step === 'result') {
    const recommended = getRecommendedModules();
    const recommendedServices = getRecommendedServices();
    const timelineLabel = timelines.find(t => t.id === selectedTimeline)?.label || 'N/A';
    const budgetLabel = budgets.find(b => b.id === selectedBudget)?.label || 'N/A';

    return (
      <div className="min-h-screen bg-slate-950 px-4 pt-24 pb-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400"
            >
              <CheckCircle className="size-10" />
            </motion.div>
            <h1 className="mb-4 text-4xl font-bold">Analisis Selesai!</h1>
            <p className="text-lg text-slate-400">
              Berikut rekomendasi solusi yang dipersonalisasi untuk
              {' '}
              {contextData.company}
              .
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left: Summary */}
            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-blue-100">
                  <Briefcase className="size-5 text-blue-500" />
                  {' '}
                  Ringkasan Profil
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">Perusahaan</span>
                    <span className="font-medium">{contextData.company}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">Industri</span>
                    <span className="font-medium">
                      {industries.find(i => i.id === contextData.industry)?.label || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">Tim Size</span>
                    <span className="font-medium">{contextData.teamSize || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">Budget</span>
                    <span className="font-medium">{budgetLabel}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-slate-500">Timeline</span>
                    <span className="font-medium">{timelineLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Recommendations */}
            <div className="space-y-8 lg:col-span-8">
              {/* 1. VISUAL ROADMAP */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
                <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-blue-100">
                  <Calendar className="size-5 text-blue-500" />
                  {' '}
                  Rencana Implementasi (Roadmap)
                </h2>
                <div className="relative px-2 pt-6 pb-2">
                  <div className="absolute top-8 left-0 h-1 w-full rounded-full bg-slate-800" />
                  <div className="relative z-10 grid grid-cols-3 gap-4">
                    {/* Phase 1 */}
                    <div className="text-center">
                      <div className="mx-auto mb-3 size-4 rounded-full border-4 border-slate-900 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                      <div className="mb-1 text-xs font-bold text-blue-400 uppercase">Bulan 1</div>
                      <div className="rounded-lg border border-white/5 bg-slate-800 p-3 text-sm">
                        <div className="mb-1 font-medium text-white">Quick Win</div>
                        <div className="text-xs text-slate-400">
                          Setup
                          {' '}
                          {recommended[0]?.title}
                          {' '}
                          & Data Migration
                        </div>
                      </div>
                    </div>
                    {/* Phase 2 */}
                    <div className="text-center">
                      <div className="mx-auto mb-3 size-4 rounded-full border-4 border-slate-900 bg-slate-700" />
                      <div className="mb-1 text-xs font-bold text-slate-500 uppercase">Bulan 2-3</div>
                      <div className="rounded-lg border border-white/5 bg-slate-800 p-3 text-sm">
                        <div className="mb-1 font-medium text-white">Expansion</div>
                        <div className="text-xs text-slate-400">
                          Integrasi
                          {' '}
                          {recommended[1]?.title}
                          {' '}
                          & User Training
                        </div>
                      </div>
                    </div>
                    {/* Phase 3 */}
                    <div className="text-center">
                      <div className="mx-auto mb-3 size-4 rounded-full border-4 border-slate-900 bg-slate-700" />
                      <div className="mb-1 text-xs font-bold text-slate-500 uppercase">Bulan 4+</div>
                      <div className="rounded-lg border border-white/5 bg-slate-800 p-3 text-sm">
                        <div className="mb-1 font-medium text-white">Optimization</div>
                        <div className="text-xs text-slate-400">Full Automation & Dashboarding</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* 2. TECHNOLOGY SOLUTIONS */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
                    <Server className="size-4" />
                    {' '}
                    Solusi Teknologi
                  </h3>
                  <div className="space-y-3">
                    {recommended.map(mod => (
                      <div
                        key={mod.id}
                        className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900 p-4"
                      >
                        <div className="mt-1 rounded-lg bg-blue-500/10 p-1.5 text-blue-400">
                          <Layers className="size-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{mod.title}</h4>
                          <p className="mt-1 line-clamp-2 text-xs text-slate-400">{mod.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. SERVICE SOLUTIONS */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-widest text-slate-400 uppercase">
                    <Users className="size-4" />
                    {' '}
                    Pendampingan (Services)
                  </h3>
                  <div className="space-y-3">
                    {recommendedServices.length > 0
                      ? (
                          recommendedServices.map(svc => (
                            <div
                              key={svc.id}
                              className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900 p-4"
                            >
                              <div className="mt-1 rounded-lg bg-emerald-500/10 p-1.5 text-emerald-400">
                                <svc.icon className="size-4" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white">{svc.title}</h4>
                                <p className="mt-1 line-clamp-2 text-xs text-slate-400">{svc.desc}</p>
                              </div>
                            </div>
                          ))
                        )
                      : (
                          <div className="rounded-xl border border-dashed border-white/5 p-4 text-center text-sm text-slate-500">
                            Tidak ada rekomendasi service khusus diperlukan.
                          </div>
                        )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT STEPS / CROSS-SELL SECTION */}
          <div className="mt-16 border-t border-white/10 pt-10 print:hidden">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="size-5 text-amber-400" />
              {' '}
              Langkah Selanjutnya
            </h3>

            <div className="grid gap-5 md:grid-cols-3">
              {/* ROI Calculator */}
              <Link
                href="/tools/roi-calculator"
                className="group cursor-pointer rounded-xl border border-white/5 bg-slate-900/40 p-5 transition-all hover:border-blue-500/30 hover:bg-slate-800"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Calculator className="size-5" />
                </div>
                <h4 className="mb-2 font-bold text-white group-hover:text-blue-400">Hitung Potensi ROI</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  Hitung potensi penghematan operasional dan keuntungan investasi (ROI) dari solusi ini.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-500">
                  Buka Kalkulator ROI
                  {' '}
                  <ChevronRight className="ml-1 size-3" />
                </div>
              </Link>

              {/* Maturity Assessment */}
              <Link
                href="/tools/assessment"
                className="group cursor-pointer rounded-xl border border-white/5 bg-slate-900/40 p-5 transition-all hover:border-emerald-500/30 hover:bg-slate-800"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <PieChart className="size-5" />
                </div>
                <h4 className="mb-2 font-bold text-white group-hover:text-emerald-400">Maturity Assessment</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  Belum yakin dengan skor kematangan Anda? Lakukan audit komprehensif (0-5 Level).
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-500">
                  Mulai Audit
                  {' '}
                  <ChevronRight className="ml-1 size-3" />
                </div>
              </Link>

              {/* Expert Consultation */}
              <Link
                href="/contact"
                className="group cursor-pointer rounded-xl border border-white/5 bg-slate-900/40 p-5 transition-all hover:border-amber-500/30 hover:bg-slate-800"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                  <Briefcase className="size-5" />
                </div>
                <h4 className="mb-2 font-bold text-white group-hover:text-amber-400">Konsultasi Ahli</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  Diskusi mendalam tentang temuan ini dengan konsultan BizOps senior kami.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-amber-500">
                  Hubungi Kami
                  {' '}
                  <ChevronRight className="ml-1 size-3" />
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center print:hidden">
            <button
              onClick={handleReset}
              className="mx-auto flex items-center justify-center gap-2 text-sm text-slate-500 transition-colors hover:text-white"
            >
              <RefreshCw className="size-3" />
              {' '}
              Ulangi Diagnosa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
