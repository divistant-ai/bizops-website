'use client';

import type { SlideData } from '@/components/presentation/SlideDeck';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Database,
  FileSpreadsheet,
  Globe,
  GraduationCap,
  Headphones,
  Layers,
  Rocket,
  Settings,
  Shield,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SlideDeck from '@/components/presentation/SlideDeck';
import { Badge, Button } from '@/components/ui';

// --- ANIMATION HELPERS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
};

const AnimatedSlide = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className={`flex h-full flex-col items-center justify-center px-8 ${className}`}
  >
    {children}
  </motion.div>
);

const TimelineItem = ({
  icon: Icon,
  title,
  subtitle,
  duration,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  duration: string;
  color: string;
}) => (
  <motion.div variants={itemVariants} className="group relative flex items-start gap-6">
    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${color} transition-transform group-hover:scale-110`}>
      <Icon className="h-8 w-8 text-white" />
    </div>
    <div className="flex-1">
      <div className="mb-1 flex items-center gap-3">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h3>
        <Badge className="border-blue-200 bg-blue-50 text-xs text-blue-700 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400">
          {duration}
        </Badge>
      </div>
      <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{subtitle}</p>
    </div>
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}) => (
  <motion.div
    variants={itemVariants}
    className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
  >
    <div className={`mb-4 inline-flex rounded-xl ${color} p-4`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <h4 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{title}</h4>
    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{desc}</p>
  </motion.div>
);

// --- SLIDE DEFINITIONS ---
export default function OnboardingSlideContent() {
  const slides: SlideData[] = [
    // SLIDE 1: Cover
    {
      id: 'cover',
      title: 'BizOps Onboarding Journey',
      content: (
        <AnimatedSlide className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
          <motion.div variants={itemVariants} className="mb-8 inline-flex rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <Rocket className="h-16 w-16" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="mb-6 text-center text-6xl leading-tight font-bold">
            BizOps Onboarding Journey
          </motion.h1>
          <motion.p variants={itemVariants} className="mb-12 max-w-3xl text-center text-2xl text-blue-100">
            Panduan Lengkap Implementasi End-to-End
            <br />
            <span className="text-lg text-blue-200">Dari Kickoff hingga Go-Live dalam 90 Hari</span>
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link href="/demo">
              <Button size="lg" className="h-14 rounded-xl bg-white px-10 text-lg font-semibold text-blue-600 hover:bg-blue-50">
                Jadwalkan Onboarding
                {' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 2: Why Onboarding Matters
    {
      id: 'why-onboarding',
      title: 'Mengapa Onboarding Penting?',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h2 className="mb-4 text-5xl font-bold text-slate-900 dark:text-white">Mengapa Onboarding Penting?</h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
              Onboarding yang terstruktur adalah kunci kesuksesan implementasi ERP
            </p>
          </motion.div>

          <div className="grid w-full max-w-6xl grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900/30 dark:bg-green-900/10"
            >
              <div className="mb-4 text-6xl font-bold text-green-600 dark:text-green-400">95%</div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">Success Rate</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Proyek dengan onboarding terstruktur berhasil tepat waktu
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900/30 dark:bg-blue-900/10"
            >
              <div className="mb-4 text-6xl font-bold text-blue-600 dark:text-blue-400">50%</div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">Faster Adoption</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">User lebih cepat produktif dengan training yang tepat</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-purple-200 bg-purple-50 p-8 text-center dark:border-purple-900/30 dark:bg-purple-900/10"
            >
              <div className="mb-4 text-6xl font-bold text-purple-600 dark:text-purple-400">30%</div>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">Cost Reduction</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Hemat biaya support dan rework dengan persiapan yang baik</p>
            </motion.div>
          </div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 3: Complete Timeline
    {
      id: 'timeline-overview',
      title: '90-Day Onboarding Timeline',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-bold text-slate-900 dark:text-white">90-Day Onboarding Timeline</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">5 fase terstruktur untuk implementasi yang sukses</p>
          </motion.div>

          <div className="flex w-full max-w-6xl flex-col gap-6">
            <TimelineItem
              icon={Rocket}
              title="Phase 1: Kickoff & Discovery"
              subtitle="Project scoping, stakeholder alignment, requirement gathering"
              duration="Week 1-2"
              color="bg-gradient-to-br from-blue-500 to-cyan-600"
            />
            <TimelineItem
              icon={Settings}
              title="Phase 2: Configuration & Setup"
              subtitle="System configuration, module setup, workflow design"
              duration="Week 3-5"
              color="bg-gradient-to-br from-purple-500 to-indigo-600"
            />
            <TimelineItem
              icon={Database}
              title="Phase 3: Data Migration"
              subtitle="Data cleansing, mapping, import, validation"
              duration="Week 6-7"
              color="bg-gradient-to-br from-amber-500 to-orange-600"
            />
            <TimelineItem
              icon={GraduationCap}
              title="Phase 4: Training & Testing"
              subtitle="User training, UAT, process refinement"
              duration="Week 8-10"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
            />
            <TimelineItem
              icon={CheckCircle2}
              title="Phase 5: Go-Live & Hypercare"
              subtitle="Production launch, intensive support, stabilization"
              duration="Week 11-13"
              color="bg-gradient-to-br from-red-500 to-rose-600"
            />
          </div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 4: Phase 1 - Kickoff & Discovery
    {
      id: 'phase1-kickoff',
      title: 'Phase 1: Kickoff & Discovery',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <div className="mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 p-4">
              <Rocket className="h-12 w-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">Phase 1: Kickoff & Discovery</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">Week 1-2 · Foundation Setting</p>
          </motion.div>

          <div className="grid w-full max-w-6xl grid-cols-2 gap-6">
            <FeatureCard
              icon={Target}
              title="Project Scoping"
              desc="Define clear objectives, success criteria, scope boundaries, and deliverables with all stakeholders"
              color="bg-blue-600"
            />
            <FeatureCard
              icon={Users}
              title="Stakeholder Alignment"
              desc="Identify key users, form project team, establish RACI matrix, communication plan"
              color="bg-cyan-600"
            />
            <FeatureCard
              icon={BookOpen}
              title="Requirement Gathering"
              desc="Document current processes, pain points, must-have vs nice-to-have requirements"
              color="bg-indigo-600"
            />
            <FeatureCard
              icon={Shield}
              title="Environment Setup"
              desc="Provision sandbox & production environments, configure security, access control"
              color="bg-purple-600"
            />
          </div>

          <motion.div variants={itemVariants} className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Key Deliverable:</p>
                <p className="text-slate-600 dark:text-slate-400">Project Charter, Requirement Document, Environment Access</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 5: Phase 2 - Configuration
    {
      id: 'phase2-configuration',
      title: 'Phase 2: Configuration & Setup',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <div className="mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
              <Settings className="h-12 w-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">Phase 2: Configuration & Setup</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">Week 3-5 · System Design</p>
          </motion.div>

          <div className="grid w-full max-w-6xl grid-cols-3 gap-6">
            <FeatureCard
              icon={Layers}
              title="Module Activation"
              desc="Enable required modules: Finance, HR, Sales, SCM, Operations based on scope"
              color="bg-purple-600"
            />
            <FeatureCard
              icon={Briefcase}
              title="Company Setup"
              desc="Configure company structure, departments, cost centers, org hierarchy"
              color="bg-indigo-600"
            />
            <FeatureCard
              icon={FileSpreadsheet}
              title="Master Data"
              desc="Setup chart of accounts, product catalog, customer/vendor master"
              color="bg-blue-600"
            />
            <FeatureCard
              icon={Zap}
              title="Workflow Design"
              desc="Configure approval flows, automation rules, notification triggers"
              color="bg-cyan-600"
            />
            <FeatureCard
              icon={UserCheck}
              title="Role & Permission"
              desc="Define user roles, access rights, segregation of duties"
              color="bg-purple-500"
            />
            <FeatureCard
              icon={Globe}
              title="Integration Setup"
              desc="Connect with existing systems: email, payment gateway, logistics"
              color="bg-indigo-500"
            />
          </div>

          <motion.div variants={itemVariants} className="mt-8 rounded-2xl border border-purple-200 bg-purple-50 p-6 dark:border-purple-900/30 dark:bg-purple-900/10">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Key Deliverable:</p>
                <p className="text-slate-600 dark:text-slate-400">Fully configured system ready for data import</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 6: Phase 3 - Data Migration
    {
      id: 'phase3-migration',
      title: 'Phase 3: Data Migration',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <div className="mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-4">
              <Database className="h-12 w-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">Phase 3: Data Migration</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">Week 6-7 · Historical Data Transfer</p>
          </motion.div>

          <div className="w-full max-w-5xl space-y-6">
            <motion.div
              variants={itemVariants}
              className="flex items-start gap-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Data Cleansing</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Clean legacy data: remove duplicates, fix inconsistencies, validate formats before import
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Field Mapping</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Map old system fields to BizOps structure: Customer → Contact, Product → Item, etc.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Batch Import</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Import in stages: Master Data → Opening Balances → Historical Transactions
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start gap-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <span className="text-xl font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Validation & Reconciliation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Verify data integrity: compare totals, check references, reconcile balances
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/30 dark:bg-amber-900/10">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Key Deliverable:</p>
                <p className="text-slate-600 dark:text-slate-400">100% data migrated and validated, ready for UAT</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 7: Phase 4 - Training & Testing
    {
      id: 'phase4-training',
      title: 'Phase 4: Training & Testing',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <div className="mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-4">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">Phase 4: Training & Testing</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">Week 8-10 · User Enablement</p>
          </motion.div>

          <div className="grid w-full max-w-6xl grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/30 dark:bg-green-900/10">
                <div className="mb-4 flex items-center gap-3">
                  <GraduationCap className="h-8 w-8 text-green-600 dark:text-green-400" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Training Program</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                    <span>
                      <strong>Admin Training:</strong>
                      {' '}
                      System admin, configuration, report builder
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                    <span>
                      <strong>End-User Training:</strong>
                      {' '}
                      Role-specific workflows, daily operations
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                    <span>
                      <strong>Train-the-Trainer:</strong>
                      {' '}
                      Internal champions for ongoing support
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                    <span>
                      <strong>Documentation:</strong>
                      {' '}
                      User manuals, video tutorials, FAQ knowledge base
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/30 dark:bg-emerald-900/10">
                <div className="mb-4 flex items-center gap-3">
                  <Target className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">UAT Testing</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      <strong>Test Scenarios:</strong>
                      {' '}
                      End-to-end process testing with real data
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      <strong>Bug Tracking:</strong>
                      {' '}
                      Log issues, prioritize fixes, retest
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      <strong>Performance Testing:</strong>
                      {' '}
                      Load testing, stress testing, optimization
                    </span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>
                      <strong>Sign-off:</strong>
                      {' '}
                      Formal UAT acceptance from business owners
                    </span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 dark:border-green-900/30 dark:bg-green-900/10">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Key Deliverable:</p>
                <p className="text-slate-600 dark:text-slate-400">All users trained, UAT passed, ready for Go-Live</p>
              </div>
            </div>
          </motion.div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 8: Phase 5 - Go-Live
    {
      id: 'phase5-golive',
      title: 'Phase 5: Go-Live & Hypercare',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <div className="mx-auto mb-6 inline-flex rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-4">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">Phase 5: Go-Live & Hypercare</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">Week 11-13 · Production Launch</p>
          </motion.div>

          <div className="grid w-full max-w-6xl grid-cols-2 gap-6">
            <FeatureCard
              icon={Rocket}
              title="Go-Live Execution"
              desc="Cutover from old system, production data sync, final switch, go/no-go decision"
              color="bg-red-600"
            />
            <FeatureCard
              icon={Headphones}
              title="Intensive Support"
              desc="24/7 on-call support team, dedicated war room, rapid issue resolution for first 2 weeks"
              color="bg-rose-600"
            />
            <FeatureCard
              icon={BarChart3}
              title="Performance Monitoring"
              desc="Track system health, user adoption metrics, transaction volumes, identify bottlenecks"
              color="bg-orange-600"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Continuous Improvement"
              desc="Collect feedback, refine workflows, optimize processes, plan Phase 2 enhancements"
              color="bg-amber-600"
            />
          </div>

          <motion.div variants={itemVariants} className="mt-8 w-full max-w-6xl">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900/30 dark:bg-red-900/10">
              <div className="mb-6 flex items-center gap-3">
                <Clock className="h-8 w-8 text-red-600 dark:text-red-400" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Hypercare Schedule</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-red-200 bg-white p-4 text-center dark:border-red-800 dark:bg-slate-900">
                  <div className="mb-2 text-3xl font-bold text-red-600 dark:text-red-400">Week 1-2</div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">24/7 Support</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">On-site + remote team</p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-white p-4 text-center dark:border-orange-800 dark:bg-slate-900">
                  <div className="mb-2 text-3xl font-bold text-orange-600 dark:text-orange-400">Week 3-4</div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Business Hours</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">8 AM - 8 PM support</p>
                </div>
                <div className="rounded-lg border border-amber-200 bg-white p-4 text-center dark:border-amber-800 dark:bg-slate-900">
                  <div className="mb-2 text-3xl font-bold text-amber-600 dark:text-amber-400">Month 2-3</div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Standard SLA</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Ticketing system</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 9: Success Metrics
    {
      id: 'success-metrics',
      title: 'Success Metrics & KPIs',
      content: (
        <AnimatedSlide>
          <motion.div variants={itemVariants} className="mb-12 text-center">
            <h2 className="mb-4 text-5xl font-bold text-slate-900 dark:text-white">How We Measure Success</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">Key performance indicators untuk onboarding yang sukses</p>
          </motion.div>

          <div className="grid w-full max-w-6xl grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 dark:border-blue-900/30 dark:from-blue-900/10 dark:to-cyan-900/10"
            >
              <TrendingUp className="mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Business KPIs</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Process cycle time reduction: 30-50%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Manual data entry reduction: 60-80%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Report generation time: hours → minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <span>Data accuracy improvement: 95%+</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8 dark:border-green-900/30 dark:from-green-900/10 dark:to-emerald-900/10"
            >
              <Users className="mb-4 h-12 w-12 text-green-600 dark:text-green-400" />
              <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">Adoption KPIs</h3>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>User login rate: 90%+ daily active users</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>Training completion rate: 95%+</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>Support ticket reduction: 70% month-over-month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                  <span>User satisfaction score: 4.5/5.0</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </AnimatedSlide>
      ),
    },

    // SLIDE 10: CTA
    {
      id: 'cta',
      title: 'Ready to Start Your Journey?',
      content: (
        <AnimatedSlide className="bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white">
          <motion.div variants={itemVariants} className="mb-8 inline-flex rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <Rocket className="h-16 w-16" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="mb-6 text-center text-5xl leading-tight font-bold">
            Ready to Start Your
            {' '}
            <br />
            BizOps Journey?
          </motion.h1>
          <motion.p variants={itemVariants} className="mb-12 max-w-3xl text-center text-xl text-blue-100">
            Mari kita mulai onboarding Anda dengan pendampingan tim expert kami.
            <br />
            <span className="text-lg text-blue-200">90 hari dari kickoff hingga Go-Live yang sukses.</span>
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/demo">
              <Button size="lg" className="h-14 rounded-xl bg-white px-10 text-lg font-semibold text-blue-600 hover:bg-blue-50">
                Jadwalkan Kickoff Meeting
                {' '}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-14 rounded-xl border-2 border-white bg-transparent px-10 text-lg font-semibold text-white hover:bg-white/10"
              >
                Hubungi Implementation Team
              </Button>
            </Link>
          </motion.div>
        </AnimatedSlide>
      ),
    },
  ];

  return <SlideDeck slides={slides} />;
}
