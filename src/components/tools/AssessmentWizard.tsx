'use client';

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  RefreshCcw,
  Target,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Button, Card } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';
import {
  budgets,
  goals,
  industries,
  modules,
  painPoints,
  serviceSolutions,
  timelines,
} from '@/data/needsAnalysisData';

type Step = 'industry' | 'painPoints' | 'goals' | 'constraints' | 'result';

export default function AssessmentWizard() {
  const [step, setStep] = useState<Step>('industry');
  const [answers, setAnswers] = useState({
    industry: '',
    painPoints: [] as string[],
    goals: [] as string[],
    timeline: '',
    budget: '',
  });

  const handleSelect = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelect = (key: 'painPoints' | 'goals', value: string) => {
    setAnswers((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const nextStep = () => {
    if (step === 'industry') {
      setStep('painPoints');
    } else if (step === 'painPoints') {
      setStep('goals');
    } else if (step === 'goals') {
      setStep('constraints');
    } else if (step === 'constraints') {
      setStep('result');
    }
  };

  const prevStep = () => {
    if (step === 'painPoints') {
      setStep('industry');
    } else if (step === 'goals') {
      setStep('painPoints');
    } else if (step === 'constraints') {
      setStep('goals');
    } else if (step === 'result') {
      setStep('constraints');
    }
  };

  const calculateResults = () => {
    // Score modules based on pain points and industry
    const scoredModules = modules.map((mod) => {
      let score = 0;
      // Add points for matching pain points
      answers.painPoints.forEach((ppId) => {
        if (mod.relevance.includes(ppId)) {
          score += 3;
        }
      });
      // Add points for matching industry
      if (mod.relevance.includes(answers.industry)) {
        score += 2;
      }

      return { ...mod, score };
    }).sort((a, b) => b.score - a.score).filter(m => m.score > 0);

    // Score services (Change Mgmt, SOP, etc)
    const scoredServices = serviceSolutions.map((srv) => {
      let score = 0;
      // Services often relate to "holistic" issues, but for simplicity mapped to pain points here
      answers.painPoints.forEach((ppId) => {
        if (srv.relevance.includes(ppId)) {
          score += 2;
        }
      });
      return { ...srv, score };
    }).sort((a, b) => b.score - a.score).filter(s => s.score > 0);

    return {
      topModules: scoredModules.slice(0, 4),
      topServices: scoredServices.slice(0, 2),
    };
  };

  const results = step === 'result' ? calculateResults() : null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="bg-primary-600 h-full transition-all duration-500 ease-out"
            style={{
              width: step === 'industry'
                ? '20%'
                : step === 'painPoints'
                  ? '40%'
                  : step === 'goals'
                    ? '60%'
                    : step === 'constraints' ? '80%' : '100%',
            }}
          >
          </div>
        </div>
        <div className="mt-2 flex justify-between text-xs font-medium tracking-wider text-neutral-500 uppercase">
          <span className={step === 'industry' ? 'text-primary-600' : ''}>Industry</span>
          <span className={step === 'painPoints' ? 'text-primary-600' : ''}>Challenges</span>
          <span className={step === 'goals' ? 'text-primary-600' : ''}>Goals</span>
          <span className={step === 'constraints' ? 'text-primary-600' : ''}>Context</span>
          <span className={step === 'result' ? 'text-primary-600' : ''}>Results</span>
        </div>
      </div>

      <Card className="flex min-h-[500px] flex-col border-neutral-200 bg-white p-8 shadow-xl shadow-neutral-200/50 md:p-10">

        {/* STEP 1: INDUSTRY */}
        {step === 'industry' && (
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="bg-primary-50 text-primary-600 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Briefcase className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 md:text-3xl">Apa industri bisnis Anda?</h2>
              <p className="text-neutral-600">Kami akan menyesuaikan rekomendasi modul spesifik untuk sektor Anda.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {industries.map(ind => (
                <button
                  key={ind.id}
                  onClick={() => handleSelect('industry', ind.id)}
                  className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all hover:scale-105 ${
                    answers.industry === ind.id
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'hover:border-primary-200 border-neutral-100 text-neutral-600'
                  }`}
                >
                  <ind.icon className="h-8 w-8" />
                  <span className="text-center text-sm font-medium">{ind.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* STEP 2: PAIN POINTS */}
        {step === 'painPoints' && (
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 md:text-3xl">Apa tantangan terbesar saat ini?</h2>
              <p className="text-neutral-600">Pilih semua yang relevan (Max 3 agar fokus).</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {painPoints.map(pp => (
                <button
                  key={pp.id}
                  onClick={() => toggleSelect('painPoints', pp.id)}
                  className={`flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                    answers.painPoints.includes(pp.id)
                      ? 'border-red-500 bg-red-50'
                      : 'border-neutral-100 hover:border-red-200'
                  }`}
                >
                  <div className={`mt-1 rounded-lg p-2 ${answers.painPoints.includes(pp.id) ? 'bg-white text-red-500' : 'bg-neutral-100 text-neutral-500'}`}>
                    <pp.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${answers.painPoints.includes(pp.id) ? 'text-red-700' : 'text-neutral-900'}`}>{pp.label}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{pp.desc}</p>
                  </div>
                  {answers.painPoints.includes(pp.id) && <CheckCircle2 className="ml-auto h-6 w-6 flex-shrink-0 text-red-500" />}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* STEP 3: GOALS */}
        {step === 'goals' && (
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <Target className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 md:text-3xl">Apa goal utama transformasi ini?</h2>
              <p className="text-neutral-600">Apa definisi sukses bagi Anda?</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {goals.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => toggleSelect('goals', goal.id)}
                  className={`flex items-center gap-4 rounded-xl border-2 p-6 text-left transition-all ${
                    answers.goals.includes(goal.id)
                      ? 'border-green-500 bg-green-50'
                      : 'border-neutral-100 hover:border-green-200'
                  }`}
                >
                  <goal.icon className={`h-8 w-8 ${answers.goals.includes(goal.id) ? 'text-green-600' : 'text-neutral-400'}`} />
                  <div>
                    <h3 className={`font-bold ${answers.goals.includes(goal.id) ? 'text-green-800' : 'text-neutral-900'}`}>{goal.label}</h3>
                    <p className="text-sm text-neutral-500">{goal.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* STEP 4: CONSTRAINTS (Timeline & Budget) */}
        {step === 'constraints' && (
          <FadeIn>
            <div className="mb-10 text-center">
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 md:text-3xl">Sedikit lagi... Konteks Proyek</h2>
              <p className="text-neutral-600">Agar kami bisa menyarankan roadmap yang realistis.</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="mb-4 block flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <Calendar className="h-4 w-4" />
                  {' '}
                  Timeline Implementasi
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  {timelines.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelect('timeline', t.id)}
                      className={`rounded-xl border-2 p-4 text-left text-sm transition-all ${
                        answers.timeline === t.id
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'hover:border-primary-200 border-neutral-100'
                      }`}
                    >
                      <div className="mb-1 font-bold">{t.label}</div>
                      <div className="text-xs text-neutral-500">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-4 block flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <Wallet className="h-4 w-4" />
                  {' '}
                  Estimasi Budget Investasi
                </label>
                <div className="grid gap-4 md:grid-cols-3">
                  {budgets.map(b => (
                    <button
                      key={b.id}
                      onClick={() => handleSelect('budget', b.id)}
                      className={`rounded-xl border-2 p-4 text-left text-sm transition-all ${
                        answers.budget === b.id
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'hover:border-primary-200 border-neutral-100'
                      }`}
                    >
                      <div className="mb-1 font-bold">{b.label}</div>
                      <div className="text-xs text-neutral-500">{b.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* STEP 5: RESULTS */}
        {step === 'result' && results && (
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="bg-primary-100 relative mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary-600 h-10 w-10" />
                <div className="bg-primary-400/20 absolute inset-0 animate-ping rounded-full"></div>
              </div>
              <h2 className="mb-2 text-3xl font-bold text-neutral-900">Rekomendasi Solusi BizOps</h2>
              <p className="text-neutral-600">
                Berdasarkan analisis kebutuhan
                {industries.find(i => i.id === answers.industry)?.label}
              </p>
            </div>

            <div className="mb-10 grid gap-8 lg:grid-cols-2">
              {/* Module Recommendations */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-bold text-neutral-900">
                  <div className="bg-primary-600 h-6 w-2 rounded-full"></div>
                  Modul Prioritas
                </h3>
                {results.topModules.map((mod, i) => (
                  <div key={mod.id} className="bg-primary-50/50 border-primary-100 flex items-start gap-4 rounded-xl border p-4">
                    <div className="text-primary-600 border-primary-100 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border bg-white font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-primary-900 font-bold">{mod.title}</h4>
                      <p className="text-primary-800/70 text-sm">{mod.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Recommendations */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 font-bold text-neutral-900">
                  <div className="h-6 w-2 rounded-full bg-amber-500"></div>
                  Layanan Pendukung
                </h3>
                {results.topServices.length > 0
                  ? results.topServices.map(srv => (
                      <div key={srv.id} className="flex items-start gap-4 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                        <div className="mt-1">
                          <srv.icon className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-900">{srv.title}</h4>
                          <p className="text-sm text-amber-800/70">{srv.desc}</p>
                        </div>
                      </div>
                    ))
                  : (
                      <div className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-500 italic">
                        Tidak ada layanan spesifik yang mendesak, fokus pada implementasi teknis.
                      </div>
                    )}

                <div className="mt-6 rounded-xl bg-neutral-900 p-6 text-center text-white">
                  <p className="mb-4 font-medium">Ingin diskusi lebih dalam tentang hasil ini?</p>
                  <Button className="w-full bg-white text-neutral-900 hover:bg-neutral-100">
                    Jadwalkan Konsultasi Gratis
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* Footer Actions */}
        <div className="mt-auto flex justify-between border-t border-neutral-100 pt-8">
          {step !== 'industry' && step !== 'result' && (
            <Button variant="ghost" onClick={prevStep} className="text-neutral-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {' '}
              Kembali
            </Button>
          )}

          {step === 'result'
            ? (
                <Button variant="ghost" onClick={() => setStep('industry')} className="text-neutral-500">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  {' '}
                  Ulangi Assessment
                </Button>
              )
            : (
                <Button
                  onClick={nextStep}
                  className="bg-primary-600 hover:bg-primary-700 ml-auto text-white"
                  disabled={
                    (step === 'industry' && !answers.industry)
                    || (step === 'painPoints' && answers.painPoints.length === 0)
                    || (step === 'goals' && answers.goals.length === 0)
                    || (step === 'constraints' && (!answers.timeline || !answers.budget))
                  }
                >
                  {step === 'constraints' ? 'Lihat Hasil Analisis' : 'Lanjut'}
                  {' '}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
        </div>

      </Card>
    </div>
  );
}
