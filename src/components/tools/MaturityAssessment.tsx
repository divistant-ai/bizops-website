'use client';

import type { Question } from '@/data/assessmentQuestions';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BarChart,
  Briefcase,
  Building2,
  Calculator,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Cpu,
  Crosshair,
  Download,
  FileText,
  Heart,
  Info,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import {
  assessmentQuestions,
  maturityLevels,

  recommendations,
} from '@/data/assessmentQuestions';
import { MethodologyReference } from './MethodologyReference';

// --- TYPES ---
type ViewState = 'intro' | 'lead-form' | 'assessment' | 'analyzing' | 'results';
type CategoryKey = 'strategy' | 'customer' | 'operations' | 'technology' | 'people';

type LeadForm = {
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
};

const STORAGE_KEY = 'bizops_assessment_state';

export default function MaturityAssessment() {
  // --- STATE ---
  const [viewState, setViewState] = useState<ViewState>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: '',
    company: '',
    email: '',
    phone: '',
    role: '',
  });
  const [emailError, setEmailError] = useState('');
  const [showMethodology, setShowMethodology] = useState(false);
  const [assessmentDate, setAssessmentDate] = useState<string>('');

  // --- CONSTANTS ---
  const currentQuestion = assessmentQuestions[currentStep] || assessmentQuestions[0];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = assessmentQuestions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  const currentCategory = (currentQuestion?.category as CategoryKey) || 'strategy';

  const categoryIcons: Record<CategoryKey, React.ReactElement> = {
    strategy: <Lightbulb className="size-5" />,
    customer: <Heart className="size-5" />,
    operations: <Settings className="size-5" />,
    technology: <Cpu className="size-5" />,
    people: <Users className="size-5" />,
  };

  const categoryLabels: Record<CategoryKey, string> = {
    strategy: 'Strategy & Leadership',
    customer: 'Customer Experience',
    operations: 'Operations & Process',
    technology: 'Technology & Data',
    people: 'People & Culture',
  };

  // Group questions
  const questionsByCategory = assessmentQuestions.reduce(
    (acc, q, idx) => {
      const cat = q.category as CategoryKey;
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push({ ...q, index: idx });
      return acc;
    },
    {} as Record<CategoryKey, (Question & { index: number })[]>,
  );

  // --- EFFECTS (PERSISTENCE) ---
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.viewState === 'assessment' || parsed.viewState === 'lead-form') {
          setViewState(parsed.viewState);
          setAnswers(parsed.answers || {});
          setLeadForm(parsed.leadForm || { name: '', company: '', email: '', phone: '', role: '' });

          const answeredIds = Object.keys(parsed.answers || {});
          const lastAnsweredIndex = assessmentQuestions.findIndex(q => !answeredIds.includes(q.id));
          setCurrentStep(lastAnsweredIndex !== -1 ? lastAnsweredIndex : 0);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (viewState === 'assessment' || viewState === 'lead-form') {
      const stateToSave = {
        viewState,
        answers,
        leadForm,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }
  }, [viewState, answers, leadForm]);

  // --- HANDLERS ---
  const handleStartIntro = () => {
    setViewState('lead-form');
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i,
      );
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!leadForm.name || !leadForm.company) {
      alert('Mohon lengkapi nama dan perusahaan.');
      return;
    }

    if (!validateEmail(leadForm.email)) {
      setEmailError('Format email tidak valid.');
      return;
    }

    setViewState('assessment');
  };

  const handleAnswer = (score: number) => {
    if (!currentQuestion) {
      return;
    }
    const newAnswers = { ...answers, [currentQuestion.id]: score };
    setAnswers(newAnswers);

    if (currentStep < assessmentQuestions.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 250);
    } else if (Object.keys(newAnswers).length >= assessmentQuestions.length) {
      finishAssessment();
    }
  };

  const finishAssessment = () => {
    setAssessmentDate(
      new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    );
    setViewState('analyzing');
    localStorage.removeItem(STORAGE_KEY);

    setTimeout(() => {
      setViewState('results');
    }, 2500);
  };

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin mengulang dari awal? Semua progres akan dihapus.')) {
      localStorage.removeItem(STORAGE_KEY);
      setViewState('intro');
      setCurrentStep(0);
      setAnswers({});
      setLeadForm({ name: '', company: '', email: '', phone: '', role: '' });
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    const categoryScores: Record<CategoryKey, { total: number; count: number }> = {
      strategy: { total: 0, count: 0 },
      customer: { total: 0, count: 0 },
      operations: { total: 0, count: 0 },
      technology: { total: 0, count: 0 },
      people: { total: 0, count: 0 },
    };

    Object.entries(answers).forEach(([qId, score]) => {
      totalScore += score;
      const question = assessmentQuestions.find(q => q.id === qId);
      if (question) {
        const cat = question.category as CategoryKey;
        if (categoryScores[cat]) {
          categoryScores[cat].total += score;
          categoryScores[cat].count += 1;
        }
      }
    });

    const avgScore = totalScore / assessmentQuestions.length;

    const maturityLevel
      = maturityLevels.find(m => avgScore >= m.minScore && avgScore <= m.maxScore) || maturityLevels[0]!;

    return { avgScore, categoryScores, maturityLevel };
  };

  const results = viewState === 'results' ? calculateResults() : null;

  const getRecommendationLevel = (avgCategoryScore: number) => {
    if (avgCategoryScore <= 2.5) {
      return 'low';
    }
    if (avgCategoryScore <= 4) {
      return 'medium';
    }
    return 'high';
  };

  const handlePrint = () => {
    window.print();
  };

  // --- RENDER STATES ---

  // 1. INTRO SCREEN
  if (viewState === 'intro') {
    return (
      <div className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 text-white">
        {/* Ambient Background */}
        <div className="pointer-events-none absolute top-0 left-0 z-0 size-full overflow-hidden">
          <div className="bg-primary-900/20 absolute -top-[10%] -left-[10%] size-[60%] rounded-full blur-[80px] md:size-[40%] md:blur-[120px]" />
          <div className="absolute -right-[10%] -bottom-[10%] size-[60%] rounded-full bg-indigo-900/20 blur-[80px] md:size-[40%] md:blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 px-4 pt-20 pb-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-primary-400 mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/50 px-4 py-1.5 text-sm font-medium backdrop-blur-md">
              <LayoutDashboard className="size-4" />
              <span>Executive Assessment Tool</span>
            </div>

            <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-white lg:text-6xl">
              Unlock Your
              {' '}
              <br />
              <span className="from-primary-400 bg-gradient-to-r to-indigo-400 bg-clip-text text-transparent">
                Digital Potential
              </span>
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-400">
              Evaluasi tingkat kematangan digital perusahaan Anda secara komprehensif. Dapatkan roadmap strategis yang
              dipersonalisasi dalam hitungan menit.
            </p>

            <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { icon: Clock, text: '5-7 Menit', desc: 'Waktu pengerjaan' },
                { icon: Crosshair, text: '5 Dimensi', desc: 'Analisis Holistik' },
                { icon: FileText, text: 'Laporan PDF', desc: 'Langsung diunduh' },
                { icon: ShieldCheck, text: 'Data Aman', desc: 'Enkripsi Enterprise' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="text-primary-400 flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-900">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{item.text}</div>
                    <div className="text-xs text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={handleStartIntro}
              size="lg"
              className="from-primary-600 shadow-primary-900/20 hover:from-primary-500 h-14 bg-gradient-to-r to-indigo-600 px-8 text-lg shadow-lg hover:to-indigo-500"
            >
              Mulai Assessment Sekarang
              {' '}
              <ArrowRight className="ml-2 size-5" />
            </Button>

            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="hover:text-primary-400 mx-auto mt-6 flex items-center gap-2 text-sm text-slate-500 transition-colors lg:mx-0"
            >
              <Info className="size-4" />
              {' '}
              Pelajari Metodologi & Leveling
            </button>
          </motion.div>

          {/* Visual Element Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {showMethodology
              ? (
                  <div className="custom-scrollbar relative z-10 h-full max-h-[600px] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Framework Reference</h3>
                      <button onClick={() => setShowMethodology(false)} className="text-slate-500 hover:text-white">
                        Tutup
                      </button>
                    </div>
                    <MethodologyReference />
                  </div>
                )
              : (
                  <div className="relative z-10 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                    <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                      <h3 className="text-xl font-bold text-white">Assessment Preview</h3>
                      <div className="flex gap-2">
                        <div className="size-3 rounded-full bg-red-500/50" />
                        <div className="size-3 rounded-full bg-yellow-500/50" />
                        <div className="size-3 rounded-full bg-green-500/50" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(categoryLabels).map(([key, label], idx) => (
                        <div
                          key={key}
                          className="group hover:border-primary-500/30 flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4 transition-all"
                        >
                          <div
                            className={`rounded-lg bg-slate-950 p-3 shadow-inner ${
                              idx === 0
                                ? 'text-amber-400'
                                : idx === 1
                                  ? 'text-red-400'
                                  : idx === 2
                                    ? 'text-blue-400'
                                    : idx === 3
                                      ? 'text-purple-400'
                                      : 'text-green-400'
                            }`}
                          >
                            {categoryIcons[key as CategoryKey]}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-200">{label}</div>
                            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                              <div className="group-hover:bg-primary-500 h-full w-2/3 bg-slate-600 opacity-30 transition-all duration-500 group-hover:opacity-100" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

            {/* Decorative elements */}
            <div className="bg-primary-500/30 absolute -top-10 -right-10 size-32 rounded-full blur-[60px]" />
            <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-indigo-500/30 blur-[60px]" />
          </motion.div>
        </div>

        {/* Mobile Methodology Modal */}
        {showMethodology && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/90 p-4 backdrop-blur-sm lg:hidden">
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 p-6">
              <button
                onClick={() => setShowMethodology(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                Tutup
              </button>
              <MethodologyReference />
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. LEAD FORM
  if (viewState === 'lead-form') {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4 text-white">
        {/* Background Mesh */}
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="bg-primary-900/10 absolute -top-[20%] -right-[10%] size-[50%] rounded-full blur-[100px]" />

        <div className="relative z-10 mx-auto w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800 to-slate-900 shadow-inner">
                <Users className="text-primary-400 size-8" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-white">Profil Penilai</h2>
              <p className="text-sm text-slate-400">
                Laporan detail dan benchmark industri akan dikirimkan ke kontak yang Anda daftarkan.
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 ml-1 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    className="focus:border-primary-500 focus:ring-primary-500 [&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-600 transition-all focus:ring-1 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                    value={leadForm.name}
                    onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                    placeholder="Nama Anda"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="mb-2 ml-1 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    className="focus:border-primary-500 focus:ring-primary-500 [&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-600 transition-all focus:ring-1 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                    value={leadForm.company}
                    onChange={e => setLeadForm({ ...leadForm, company: e.target.value })}
                    placeholder="Nama PT"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 ml-1 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    <Mail className="size-3" />
                    {' '}
                    Email Bisnis
                  </label>
                  <input
                    type="email"
                    required
                    className={`[&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border px-4 py-3.5 text-white placeholder-slate-600 transition-all focus:ring-1 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset] ${
                      emailError
                        ? 'border-red-500 bg-slate-950 focus:ring-red-500'
                        : 'focus:border-primary-500 focus:ring-primary-500 border-white/10 bg-slate-950'
                    }`}
                    value={leadForm.email}
                    onChange={(e) => {
                      setLeadForm({ ...leadForm, email: e.target.value });
                      if (emailError) {
                        setEmailError('');
                      }
                    }}
                    placeholder="name@company.com"
                  />
                  {emailError && (
                    <p className="mt-1 ml-1 flex items-center text-xs text-red-400">
                      <AlertCircle className="mr-1 size-3" />
                      {' '}
                      {emailError}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 ml-1 flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    <Phone className="size-3" />
                    {' '}
                    WhatsApp (Opsional)
                  </label>
                  <input
                    type="tel"
                    className="focus:border-primary-500 focus:ring-primary-500 [&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-600 transition-all focus:ring-1 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                    value={leadForm.phone}
                    onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="0812..."
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 ml-1 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Posisi / Jabatan
                </label>
                <input
                  type="text"
                  className="focus:border-primary-500 focus:ring-primary-500 [&:-webkit-autofill]:-webkit-text-fill-color-white w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3.5 text-white placeholder-slate-600 transition-all focus:ring-1 focus:outline-none [&:-webkit-autofill]:shadow-[0_0_0_100px_#0f172a_inset]"
                  value={leadForm.role}
                  onChange={e => setLeadForm({ ...leadForm, role: e.target.value })}
                  placeholder="Manager IT / Ops"
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  className="bg-primary-600 shadow-primary-900/20 hover:bg-primary-500 shadow-lg"
                >
                  Lanjut ke Pertanyaan
                  {' '}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <button
                  type="button"
                  onClick={() => setViewState('intro')}
                  className="mt-4 w-full text-center text-sm text-slate-500 transition-colors hover:text-white"
                >
                  Kembali ke Intro
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // 3. ANALYZING / LOADING
  if (viewState === 'analyzing') {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 text-center">
        <div className="absolute inset-0 bg-slate-950">
          <div className="bg-primary-900/20 absolute top-1/2 left-1/2 size-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative mb-8"
          >
            <div className="border-t-primary-500 size-24 rounded-full border-4 border-slate-800" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="text-primary-500 size-8" />
            </div>
          </motion.div>
          <h2 className="mb-3 text-3xl font-bold text-white">Memproses Hasil Assessment...</h2>
          <p className="text-slate-400">
            Sistem sedang mengkalkulasi skor dan menyusun rekomendasi strategis Anda.
          </p>
        </div>
      </div>
    );
  }

  // 4. RESULTS SCREEN
  if (viewState === 'results') {
    if (!results) {
      return null; // Should never happen
    }
    return (
      <div className="min-h-screen bg-slate-950 px-4 pt-24 pb-12 text-white sm:px-6 lg:px-8 print:bg-white print:pt-0 print:pb-0 print:text-black">
        <div className="mx-auto max-w-6xl">
          {/* REPORT HEADER */}
          <div className="relative mb-8 rounded-2xl border border-white/10 bg-slate-900/50 p-6 print:rounded-none print:border-b-2 print:border-gray-200 print:bg-transparent print:pb-8 print:shadow-none">
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-green-800 bg-green-900/30 px-3 py-1 text-xs font-bold tracking-wider text-green-400 uppercase print:hidden">
                    <CheckCircle className="size-3" />
                    {' '}
                    Assessment Completed
                  </div>
                  <button
                    onClick={handleReset}
                    className="group flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-red-400 print:hidden"
                    title="Hapus data dan mulai dari awal"
                  >
                    <RefreshCw className="size-3 transition-transform duration-500 group-hover:rotate-180" />
                    <span>Reset</span>
                  </button>
                </div>

                <h1 className="text-3xl font-bold text-white print:text-black">Laporan Digital Maturity</h1>
                <p className="mt-1 text-sm text-slate-400 print:text-gray-500">
                  ID Dokumen:
                  {' '}
                  {`RPT-${new Date().getFullYear()}${Math.floor(Math.random() * 1000)}`}
                </p>
              </div>

              {/* User Details Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 rounded-xl border border-white/5 bg-slate-950/50 p-4 text-sm text-slate-300 print:border-gray-200 print:bg-gray-50 print:text-gray-800">
                <div className="flex items-center gap-2">
                  <Building2 className="text-primary-400 size-4 print:text-slate-600" />
                  <span className="font-semibold">{leadForm.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-primary-400 size-4 print:text-slate-600" />
                  <span>{leadForm.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="text-primary-400 size-4 print:text-slate-600" />
                  <span>{leadForm.role || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary-400 size-4 print:text-slate-600" />
                  <span>{assessmentDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12 print:mb-6 print:gap-8">
            {/* LEFT: Executive Summary & Score */}
            <div className="space-y-6 lg:col-span-4">
              <div className="h-fit rounded-3xl border border-white/10 bg-slate-900/50 p-1 shadow-2xl backdrop-blur-sm print:border-gray-300 print:bg-white print:text-black">
                <div className="relative flex flex-col items-center overflow-hidden rounded-[22px] bg-slate-900/80 p-8 text-center print:bg-white print:p-0 print:pt-4 print:shadow-none">
                  <div className="relative mb-6 flex size-40 items-center justify-center">
                    <svg className="size-full -rotate-90 transform">
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        className="text-slate-800 print:text-gray-200"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="72"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="10"
                        strokeDasharray={452}
                        strokeDashoffset={452 - (452 * results.avgScore) / 5}
                        className={`${results.maturityLevel.color.replace('bg-', 'text-')} transition-all duration-1000 ease-out`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className={`text-5xl font-bold ${results.maturityLevel.color.replace('bg-', 'text-')}`}
                      >
                        {results.avgScore.toFixed(1)}
                      </span>
                      <span className="mt-1 text-xs font-medium tracking-widest text-slate-500 uppercase">
                        / 5.0
                      </span>
                    </div>
                  </div>

                  <h2 className="mb-2 text-xl font-bold text-white print:text-black">
                    {results.maturityLevel.title}
                  </h2>
                  <div
                    className={`mb-4 rounded-full px-3 py-1 text-xs font-bold text-white ${results.maturityLevel.color} print:bg-gray-200 print:text-black`}
                  >
                    Level
                    {' '}
                    {results.maturityLevel.level}
                  </div>
                </div>
              </div>

              {/* Executive Summary Text */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 print:border-gray-300 print:bg-white">
                <h3 className="mb-3 text-sm font-bold tracking-widest text-slate-400 uppercase print:text-black">
                  Executive Summary
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-300 print:text-slate-700">
                  Perusahaan Anda berada pada tahap
                  {' '}
                  <strong>{results.maturityLevel.title}</strong>
                  .
                  {' '}
                  {results.maturityLevel.description}
                  <br />
                  <br />
                  Untuk mencapai level berikutnya, fokus utama Anda harus pada integrasi lintas fungsi dan pemanfaatan
                  data yang lebih strategis.
                </p>
                <button
                  onClick={() => setShowMethodology(!showMethodology)}
                  className="text-primary-400 hover:text-primary-300 flex items-center gap-2 text-xs font-medium transition-colors print:hidden"
                >
                  <Info className="size-3" />
                  {' '}
                  Bagaimana skor ini dihitung?
                </button>
              </div>
            </div>

            {/* RIGHT: Detailed Analysis */}
            <div className="space-y-8 lg:col-span-8">
              {/* Chart */}
              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-sm print:break-inside-avoid print:border-gray-300 print:bg-white print:text-black">
                <h3 className="mb-8 flex items-center text-xl font-bold text-white print:text-black">
                  <BarChart className="text-primary-500 mr-3 size-6 print:text-black" />
                  Analisis per Dimensi
                </h3>

                <div className="space-y-6">
                  {Object.entries(results.categoryScores).map(([cat, data]) => {
                    const score = data.count > 0 ? data.total / data.count : 0;
                    const percentage = (score / 5) * 100;
                    const catKey = cat as CategoryKey;

                    return (
                      <div key={cat} className="print:break-inside-avoid">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-3 font-medium text-slate-300 print:text-black">
                            <span className="rounded-lg bg-slate-800 p-1.5 text-slate-400 print:hidden">
                              {categoryIcons[catKey]}
                            </span>
                            {categoryLabels[catKey]}
                          </span>
                          <span className="rounded-lg border border-white/5 bg-slate-800 px-3 py-1 font-bold text-white print:border-gray-300 print:bg-white print:text-black">
                            {score.toFixed(1)}
                          </span>
                        </div>
                        <div className="h-4 w-full rounded-full border border-white/5 bg-slate-800 p-1 print:bg-gray-200">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full shadow-lg ${
                              score < 2.5
                                ? 'bg-gradient-to-r from-red-600 to-red-500'
                                : score < 4
                                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                                  : 'bg-gradient-to-r from-emerald-500 to-green-400'
                            } print:print-color-adjust-exact`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations Grid */}
              <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-sm print:border-gray-300 print:bg-white print:text-black">
                <h3 className="mb-8 flex items-center text-xl font-bold text-white print:text-black">
                  <Crosshair className="text-secondary-500 mr-3 size-6 print:text-black" />
                  Rekomendasi Strategis
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  {Object.entries(results.categoryScores).map(([cat, data]) => {
                    const score = data.count > 0 ? data.total / data.count : 0;
                    const level = getRecommendationLevel(score);
                    const catKey = cat as CategoryKey;

                    const rec = (recommendations as any)[cat]?.[level];

                    if (!rec) {
                      return null;
                    }

                    return (
                      <div
                        key={cat}
                        className="group hover:border-primary-500/30 rounded-2xl border border-white/5 bg-slate-800/50 p-6 transition-all hover:bg-slate-800 print:break-inside-avoid print:border-gray-200 print:bg-gray-50"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <h4 className="group-hover:text-primary-400 text-sm font-semibold tracking-wider text-slate-400 uppercase transition-colors print:text-black">
                            {categoryLabels[catKey]}
                          </h4>
                          <span
                            className={`rounded border px-2 py-1 text-[10px] font-bold uppercase ${
                              score < 3
                                ? 'border-red-500/20 bg-red-500/10 text-red-400 print:border-red-600 print:text-red-600'
                                : 'border-green-500/20 bg-green-500/10 text-green-400 print:border-green-600 print:text-green-600'
                            }`}
                          >
                            {score < 3 ? 'Priority' : 'On Track'}
                          </span>
                        </div>
                        <p className="mb-3 text-lg font-bold text-white print:text-black">{rec.title}</p>
                        <p className="mb-5 text-sm leading-relaxed text-slate-400 print:text-slate-700">
                          {rec.advice}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {rec.modules.map((m: string) => (
                            <span
                              key={m}
                              className="rounded-lg border border-white/10 bg-slate-950 px-3 py-1.5 text-[10px] font-medium text-slate-300 group-hover:border-white/20 print:border-gray-400 print:bg-white print:text-black"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* NEXT STEPS / CROSS-SELL SECTION */}
          <div className="mt-16 break-before-page border-t border-white/10 pt-10 pb-24 print:hidden">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="size-5 text-amber-400" />
              {' '}
              Rekomendasi Tindak Lanjut
            </h3>

            <div className="grid gap-5 md:grid-cols-3">
              {/* Solution Finder */}
              <Link
                href="/tools/needs-analysis"
                className="group cursor-pointer rounded-xl border border-white/5 bg-slate-900/40 p-5 transition-all hover:border-blue-500/30 hover:bg-slate-800"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <Search className="size-5" />
                </div>
                <h4 className="mb-2 font-bold text-white group-hover:text-blue-400">Solution Finder</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  Diagnosis spesifik untuk menemukan modul software yang tepat mengatasi gap skor Anda.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-blue-500">
                  Cari Solusi
                  {' '}
                  <ChevronRight className="ml-1 size-3" />
                </div>
              </Link>

              {/* ROI Calculator */}
              <Link
                href="/pricing/calculator"
                className="group cursor-pointer rounded-xl border border-white/5 bg-slate-900/40 p-5 transition-all hover:border-emerald-500/30 hover:bg-slate-800"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <Calculator className="size-5" />
                </div>
                <h4 className="mb-2 font-bold text-white group-hover:text-emerald-400">Estimasi Investasi</h4>
                <p className="text-sm leading-relaxed text-slate-400">
                  Hitung biaya implementasi digital transformation untuk menaikkan level maturity Anda.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-500">
                  Hitung Biaya
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
                  Diskusi mendalam tentang temuan skor ini dengan konsultan senior kami.
                </p>
                <div className="mt-4 flex items-center text-xs font-bold text-amber-500">
                  Hubungi Kami
                  {' '}
                  <ChevronRight className="ml-1 size-3" />
                </div>
              </Link>
            </div>
          </div>

          {/* FLOATING ACTION BAR */}
          <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/10 bg-slate-950/80 p-4 backdrop-blur-lg print:hidden">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="hidden text-sm text-slate-400 sm:block">
                Langkah selanjutnya: Simpan laporan ini atau konsultasikan dengan ahli kami.
              </div>
              <div className="flex w-full gap-3 sm:w-auto">
                <Button
                  onClick={handlePrint}
                  variant="outline-white"
                  className="h-10 flex-1 items-center gap-2 sm:flex-none"
                >
                  <Download className="size-4" />
                  {' '}
                  Save PDF
                </Button>
                <Link href="/contact" className="flex-1 sm:flex-none">
                  <Button
                    variant="primary"
                    className="from-primary-600 shadow-primary-900/20 h-10 w-full items-center gap-2 border-0 bg-gradient-to-r to-indigo-600 shadow-lg"
                  >
                    Consultation
                    {' '}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-8" />

          {/* Methodology Modal for Results Page */}
          {showMethodology && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/90 p-4 backdrop-blur-sm print:hidden">
              <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
                <button
                  onClick={() => setShowMethodology(false)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                  Tutup
                </button>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">Referensi Metodologi</h3>
                  <p className="text-sm text-slate-400">Dasar penilaian skor maturity Anda.</p>
                </div>
                <MethodologyReference />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 5. ACTIVE ASSESSMENT (SPLIT LAYOUT)
  return (
    <div className="min-h-screen bg-slate-950 px-4 pt-24 pb-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Mobile Nav Toggle / Progress */}
        <div className="sticky top-20 z-30 -mx-4 mb-8 border-b border-white/10 bg-slate-950/90 p-4 backdrop-blur-md lg:hidden">
          <div className="mb-3 flex items-center justify-between text-xs font-bold tracking-widest text-slate-400 uppercase">
            <span>Progress</span>
            <span>
              {Math.round(progress)}
              %
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="from-primary-500 h-full rounded-full bg-gradient-to-r to-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: NAVIGATION SIDEBAR */}
          <div className="hidden lg:col-span-4 lg:block xl:col-span-3">
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-md">
              <h3 className="mb-6 flex items-center text-lg font-bold text-white">
                <LayoutDashboard className="text-primary-500 mr-3 size-5" />
                Navigation
              </h3>

              <div className="relative space-y-8">
                {/* Vertical Line */}
                <div className="absolute top-4 bottom-4 left-[11px] z-0 w-px bg-white/10" />

                {Object.entries(questionsByCategory).map(([cat, questions]) => (
                  <div key={cat} className="relative z-10">
                    <div className="mb-3 flex items-center gap-3 text-sm font-bold text-slate-300">
                      <div className="z-10 rounded-full border border-white/10 bg-slate-950 p-1">
                        <div className="text-primary-400 size-4">{categoryIcons[cat as CategoryKey]}</div>
                      </div>
                      {categoryLabels[cat as CategoryKey]}
                    </div>
                    <div className="grid grid-cols-5 gap-2 pl-8">
                      {questions.map((q) => {
                        const isAnswered = answers[q.id] !== undefined;
                        const isCurrent = currentStep === q.index;

                        return (
                          <button
                            key={q.id}
                            onClick={() => setCurrentStep(q.index)}
                            className={`
                              relative h-8 overflow-hidden rounded-lg text-xs font-bold transition-all
                              ${
                          isCurrent
                            ? 'bg-primary-600 shadow-primary-900/50 ring-primary-400 z-20 scale-110 text-white shadow-lg ring-2 ring-offset-2 ring-offset-slate-900'
                            : isAnswered
                              ? 'border-primary-500/30 bg-primary-900/20 text-primary-400 border'
                              : 'bg-slate-800/50 text-slate-600 hover:bg-slate-800'
                          }
                            `}
                            title={`Question ${q.index + 1}`}
                          >
                            {q.index + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="mb-2 flex justify-between text-xs font-bold tracking-widest text-slate-500 uppercase">
                  <span>Completion</span>
                  <span>
                    {Math.round(progress)}
                    %
                  </span>
                </div>
                <div className="h-2 w-full rounded-full border border-white/5 bg-slate-950 p-0.5">
                  <div
                    className="from-primary-500 h-full rounded-full bg-gradient-to-r to-green-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: QUESTION CARD */}
          <div className="lg:col-span-8 xl:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative flex min-h-[500px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-md md:p-10"
              >
                {/* Background glow for card */}
                <div className="bg-primary-500/10 pointer-events-none absolute -top-24 -right-24 size-64 rounded-full blur-[80px]" />

                <div className="relative z-10 mb-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className="text-primary-400 inline-flex items-center gap-2 rounded-full border border-white/5 bg-slate-800 px-3 py-1.5 text-xs font-bold tracking-wider uppercase"
                    >
                      {categoryIcons[currentCategory]}
                      {categoryLabels[currentCategory]}
                    </span>
                    <span className="text-sm text-slate-500">
                      {currentStep + 1}
                      {' '}
                      /
                      {totalQuestions}
                    </span>
                  </div>

                  <h2 className="text-2xl leading-tight font-bold text-white md:text-4xl">
                    {currentQuestion?.question}
                  </h2>
                </div>

                <div className="relative z-10 flex-grow space-y-4">
                  {currentQuestion?.options.map((option, index) => {
                    const isSelected = answers[currentQuestion.id] === option.score;
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.score)}
                        className={`group relative flex w-full items-start overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-600/10 ring-primary-500 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] ring-1'
                            : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        <div
                          className={`mt-0.5 mr-5 flex size-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            isSelected ? 'border-primary-500' : 'group-hover:border-primary-400 border-slate-600'
                          }`}
                        >
                          {isSelected && <div className="bg-primary-500 size-3 rounded-full" />}
                        </div>
                        <span
                          className={`text-lg transition-colors ${isSelected ? 'font-medium text-white' : 'text-slate-300 group-hover:text-white'}`}
                        >
                          {option.label}
                        </span>

                        {/* Hover Gradient Effect */}
                        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
                      </button>
                    );
                  })}
                </div>

                <div className="relative z-10 mt-10 flex items-center justify-between border-t border-white/10 pt-8">
                  <Button
                    variant="ghost"
                    onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                    disabled={currentStep === 0}
                    className="text-slate-400 hover:bg-white/5 hover:text-white"
                  >
                    <ArrowLeft className="mr-1 size-4" />
                    {' '}
                    Previous
                  </Button>

                  {currentStep < totalQuestions - 1
                    ? (
                        <Button
                          variant="primary"
                          onClick={() => setCurrentStep(prev => prev + 1)}
                          className="ml-auto border-0 bg-white text-slate-900 hover:bg-slate-200"
                        >
                          Next Question
                          {' '}
                          <ArrowRight className="ml-1 size-4" />
                        </Button>
                      )
                    : (
                        <Button
                          variant="primary"
                          onClick={finishAssessment}
                          disabled={Object.keys(answers).length < totalQuestions}
                          className="ml-auto border-0 bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-900/20 hover:from-green-400 hover:to-emerald-500"
                        >
                          See Results
                          {' '}
                          <CheckCircle className="ml-1 size-4" />
                        </Button>
                      )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
