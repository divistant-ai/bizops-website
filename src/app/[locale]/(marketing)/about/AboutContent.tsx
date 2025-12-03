'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Code,
  ExternalLink,
  FileText,
  Heart,
  Linkedin,
  MapPin,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button, CardSlider, OptimizedImage } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { aboutContent } from '@/data/companyContent';

const teamMembers = [
  {
    name: 'Ilham Pambudi',
    role: 'Product Owner',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400',
    quote: 'Building products that solve real problems, not just cool tech.',
    linkedin: '#',
  },
  {
    name: 'Febby Kurniawan',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    quote: 'Clean code is the best documentation.',
    linkedin: '#',
  },
  {
    name: 'Alief Ahmad Azies',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    quote: 'Mobile-first experience is non-negotiable.',
    linkedin: '#',
  },
  {
    name: 'M. Fadhlan Syafii',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400',
    quote: 'Optimizing performance, one pixel at a time.',
    linkedin: '#',
  },
  {
    name: 'Anita Nur Sari',
    role: 'Quality Assurance',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
    quote: 'Quality is not an act, it is a habit.',
    linkedin: '#',
  },
];

const stats = [
  { value: '500+', label: 'Perusahaan Pengguna', icon: Building2 },
  { value: '50K+', label: 'User Aktif Bulanan', icon: Users },
  { value: '99.9%', label: 'Uptime SLA', icon: Zap },
  { value: '24/7', label: 'Support Response', icon: Heart },
];

export default function AboutContent() {
  const { hero, timeline, values, entity } = aboutContent;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section (Cinematic) */}
      <section className="relative overflow-hidden bg-[#0B1120] pt-32 pb-24 text-white lg:pt-48 lg:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {/* Animated Glow Orbs */}
        <div className="animate-pulse-slow pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]"></div>
        <div className="pointer-events-none absolute right-0 bottom-0 h-[800px] w-[800px] rounded-full bg-blue-600/10 blur-[100px]"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-800/50 px-4 py-1.5 text-xs font-bold tracking-wider text-indigo-300 uppercase shadow-xl backdrop-blur-md"
          >
            <Rocket className="h-3 w-3" />
            {' '}
            Engineering Sovereignty
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-8 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-5xl lg:text-7xl"
          >
            Bermitra dengan Praktisi yang
            {' '}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">Mengerti Masalah Lapangan.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed font-light text-slate-300 md:text-2xl"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <a href="https://divistant.com/our-profile" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="h-14 w-full transform rounded-full border-none bg-white px-8 text-lg font-bold text-slate-900 shadow-xl transition-all hover:-translate-y-1 hover:bg-slate-100 hover:shadow-2xl hover:shadow-indigo-500/20 sm:w-auto">
                Lihat Profil Lengkap Divistant
                {' '}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <Section className="relative z-10 -mt-16 !bg-white dark:!bg-slate-900">
        <Container size="7xl">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="bg-primary-50 text-primary-700 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Origin Story Timeline */}
      <section className="border-b border-slate-200 !bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center md:mb-24">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Our Origin Story</h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-slate-600">
              Perjalanan kami bukan tentang membuat software, tapi tentang memecahkan kebuntuan operasional.
            </p>
          </div>

          <div className="relative ml-4 space-y-16 border-l-2 border-slate-300 md:ml-8 md:space-y-20 md:pl-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="group relative pl-8 md:pl-0"
              >
                {/* Marker */}
                <div className={`absolute top-0 -left-[25px] z-10 h-6 w-6 rounded-full border-4 border-white transition-colors duration-500 md:-left-[41px] ${idx === 1 ? 'bg-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]' : 'bg-slate-400 group-hover:bg-indigo-400'}`}></div>

                <div className="md:grid md:grid-cols-5 md:gap-16">
                  <div className="mb-4 pt-1 md:col-span-1 md:mb-0">
                    <span className={`text-sm font-bold tracking-widest uppercase transition-colors ${idx === 1 ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-700'}`}>{item.year}</span>
                  </div>
                  <div className={`rounded-3xl border p-8 transition-all duration-500 hover:shadow-2xl md:col-span-4 md:p-10 ${idx === 1 ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-white shadow-lg' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <h3 className={`mb-4 text-2xl font-bold ${idx === 1 ? 'text-indigo-900' : 'text-slate-900'}`}>{item.title}</h3>
                    <p className={`text-base leading-relaxed font-light md:text-lg ${idx === 1 ? 'text-indigo-800/80' : 'text-slate-600'}`}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values (Glassmorphism) */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[120px]"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">Manifesto & Nilai Inti</h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-slate-300">
              Prinsip yang memandu setiap baris kode yang kami tulis dan setiap keputusan bisnis yang kami ambil.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((val, idx) => {
              const icons = [Zap, ShieldCheck, Users];
              const Icon = icons[idx] || Users;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  <div className="relative">
                    <div className="bg-primary-500/20 text-primary-400 mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-4 text-2xl font-bold">{val.title}</h3>
                    <p className="mb-6 leading-relaxed text-slate-300 italic">
                      "
                      {val.manifesto}
                      "
                    </p>
                    <div className="border-t border-white/10 pt-6">
                      <p className="flex items-start gap-2 text-sm text-slate-400">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {val.proof}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Section className="!bg-slate-50">
        <Container size="7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Meet The Team</h2>
            <p className="mx-auto max-w-2xl text-lg font-light text-slate-600">
              Praktisi berpengalaman yang membangun BizOps dari nol.
            </p>
          </div>

          {/* Mobile: CardSlider */}
          <div className="md:hidden">
            <CardSlider>
              {teamMembers.map((member, idx) => (
                <div key={idx} className="group w-[280px]">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={280}
                        height={256}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1 text-xl font-bold text-slate-900">{member.name}</h3>
                      <p className="text-primary-600 mb-4 text-sm font-medium">{member.role}</p>
                      <p className="mb-4 text-sm text-slate-600 italic">
                        "
                        {member.quote}
                        "
                      </p>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors">
                        <Linkedin className="h-4 w-4" />
                        Connect
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </CardSlider>
          </div>

          {/* Desktop: Grid */}
          <FadeInStagger>
            <div className="hidden gap-6 md:grid md:grid-cols-3 lg:grid-cols-5">
              {teamMembers.map((member, idx) => (
                <FadeIn key={idx}>
                  <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        width={280}
                        height={256}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                      <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium">{member.role}</p>
                      <p className="mb-4 text-sm text-slate-600 italic dark:text-slate-400">
                        "
                        {member.quote}
                        "
                      </p>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors dark:text-slate-300">
                        <Linkedin className="h-4 w-4" />
                        Connect
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* Entity Section */}
      <Section className="border-t border-slate-200 !bg-white">
        <Container size="4xl">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 md:p-12">
            <div className="mb-10 text-center">
              <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <Building2 className="h-8 w-8 text-slate-800" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{entity.name}</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Headquarters</h4>
                    <p className="text-sm text-slate-600">{entity.hq}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Code className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">R&D Center</h4>
                    <p className="text-sm text-slate-600">{entity.rnd}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FileText className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Legalitas</h4>
                    <p className="text-sm text-slate-600">{entity.legal}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-slate-900">Compliance</h4>
                    <p className="text-sm text-slate-600">{entity.compliance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-slate-900 text-white">
        <Container size="4xl" className="text-center">
          <div className="text-primary-300 mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="h-3 w-3" />
            {' '}
            Join Us
          </div>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
            Tertarik Bergabung?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg font-light text-slate-300">
            Kami selalu mencari talenta terbaik untuk membangun masa depan enterprise software di Indonesia.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/careers">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 w-full text-white sm:w-auto">
                Lihat Posisi Terbuka
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/partners">
              <Button size="lg" variant="outline" className="w-full border-slate-600 text-white hover:bg-white/10 sm:w-auto">
                Jadi Partner
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
