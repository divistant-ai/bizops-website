'use client';

import { motion } from 'framer-motion';
import { Building, CheckCircle, DollarSign, Handshake, Laptop, ShieldCheck, Users } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';

export default function ManagedServicesContent() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16 font-sans dark:bg-slate-950">
      {/* HERO SECTION */}
      <Section className="relative overflow-hidden bg-white py-16 md:py-24 dark:bg-slate-900">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="bg-primary-500/10 absolute top-0 right-0 h-[600px] w-[600px] animate-pulse rounded-full blur-[100px]"></div>

        <Container size="7xl" className="relative z-10">
          <Stack direction="vertical" gap={12} className="items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
                <Building className="text-primary-500 h-4 w-4" />
                <Typography variant="small" className="text-slate-600 dark:text-slate-400">New Offering</Typography>
              </div>

              <Typography variant="h1" as="h1" className="mb-6 leading-tight font-extrabold text-slate-900 dark:text-white">
                Your Virtual
                {' '}
                <br />
                <span className="from-primary-600 bg-gradient-to-r to-indigo-600 bg-clip-text text-transparent">Head Office.</span>
              </Typography>

              <Typography variant="body" className="mx-auto mb-10 max-w-2xl leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-400">
                Fokus pada inti bisnis Anda. Biarkan jaringan ahli kami menangani operasional pendukung—Finance, HR, Legal, hingga IT—dengan standar kelas dunia.
              </Typography>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button size="lg" className="shadow-primary-500/20 rounded-2xl px-8 shadow-lg">
                  Konsultasi Gratis
                </Button>
                <Link href="/partners">
                  <Button variant="outline" size="lg" className="rounded-2xl px-8">
                    Lihat Partner Kami
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Stack>
        </Container>
      </Section>

      {/* PROBLEM & SOLUTION */}
      <Section className="bg-slate-50 py-20 dark:bg-slate-950">
        <Container size="4xl" className="mb-16 text-center">
          <Typography variant="h2" as="h2" className="mb-4 font-bold text-slate-900 dark:text-white">
            Business Operations is Distracting.
          </Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400">
            CEO seharusnya fokus pada Strategi, Inovasi, dan Pertumbuhan. Bukan terjebak mengurus laporan pajak bulanan, rekrutmen staff admin, atau maintenance server.
          </Typography>
        </Container>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <CardSlider mobileItemWidth="w-[85vw] sm:w-[350px]">
            {[
              { title: 'Finance & Tax', desc: 'Virtual CFO, Bookkeeping, Tax Planning & Reporting.', icon: DollarSign, color: 'text-green-500' },
              { title: 'HR & Payroll', desc: 'Talent Acquisition, Payroll Processing, Compliance.', icon: Users, color: 'text-blue-500' },
              { title: 'Legal & Corporate', desc: 'Legal Drafting, Licensing, Corporate Secretary.', icon: ShieldCheck, color: 'text-purple-500' },
              { title: 'IT & Security', desc: 'Managed DevOps, Security Monitoring, Tech Support.', icon: Laptop, color: 'text-orange-500' },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 ${service.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <Typography variant="h3" as="h3" className="mb-3 font-bold text-slate-900 dark:text-white">{service.title}</Typography>
                    <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">{service.desc}</Typography>
                  </div>
                </div>
              );
            })}
          </CardSlider>
        </div>

        {/* Desktop Grid */}
        <Container size="7xl" className="hidden grid-cols-2 gap-8 md:grid lg:grid-cols-4">
          {[
            { title: 'Finance & Tax', desc: 'Virtual CFO, Bookkeeping, Tax Planning & Reporting.', icon: DollarSign, color: 'text-green-500' },
            { title: 'HR & Payroll', desc: 'Talent Acquisition, Payroll Processing, Compliance.', icon: Users, color: 'text-blue-500' },
            { title: 'Legal & Corporate', desc: 'Legal Drafting, Licensing, Corporate Secretary.', icon: ShieldCheck, color: 'text-purple-500' },
            { title: 'IT & Security', desc: 'Managed DevOps, Security Monitoring, Tech Support.', icon: Laptop, color: 'text-orange-500' },
          ].map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 ${service.color}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <Typography variant="h3" as="h3" className="mb-3 font-bold text-slate-900 dark:text-white">{service.title}</Typography>
                <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-400">{service.desc}</Typography>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* PARTNER ECOSYSTEM */}
      <Section className="bg-white py-24 dark:bg-slate-900">
        <Container size="7xl">
          <Grid cols={2} gap={12} className="items-center">
            <div>
              <Typography variant="h2" as="h2" className="mb-6 font-bold text-slate-900 dark:text-white">
                Powered by
                {' '}
                <br />
                <span className="text-primary-600">Vetted Expert Network</span>
              </Typography>
              <Typography variant="body" className="mb-10 text-slate-600 dark:text-slate-400">
                Kami tidak bekerja sendirian. BizOps bermitra dengan firma konsultan top-tier yang telah melalui proses kurasi ketat. Anda mendapatkan kualitas Big 4 dengan fleksibilitas startup.
              </Typography>

              <ul className="mb-10 space-y-4">
                {[
                  'Konsultan Pajak Bersertifikat (Brevet A/B/C)',
                  'HR Consultant & Headhunter Senior',
                  'Advokat & Notaris Terpercaya',
                  'Certified Ethical Hackers & DevOps',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="h-12 rounded-xl bg-slate-900 px-8 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                Pelajari Standar Kualitas Kami
              </Button>
            </div>

            <div className="relative">
              <div className="from-primary-500/20 absolute inset-0 rotate-3 transform rounded-[2rem] bg-gradient-to-tr to-purple-500/20"></div>
              <div className="relative rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-2xl md:p-12 dark:border-slate-700 dark:bg-slate-800">
                <Grid cols={2} gap={6}>
                  {[
                    { name: 'Global Tax Firm', type: 'Tax Partner' },
                    { name: 'Elite Talents', type: 'HR Partner' },
                    { name: 'CyberGuard', type: 'Security Partner' },
                    { name: 'Legal Corp', type: 'Legal Partner' },
                  ].map((partner, idx) => (
                    <div key={idx} className="rounded-xl border border-slate-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                        <Handshake className="h-6 w-6" />
                      </div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">{partner.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{partner.type}</div>
                    </div>
                  ))}
                </Grid>
                <div className="mt-8 border-t border-slate-200 pt-8 text-center dark:border-slate-700">
                  <Typography variant="small" className="text-slate-500 dark:text-slate-400">Ingin bergabung sebagai partner ahli?</Typography>
                  <Link href="/partners" className="text-primary-600 mt-2 block font-bold hover:underline">
                    Daftar Partner Network →
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-slate-50 py-24 dark:bg-slate-950">
        <Container size="7xl" className="text-center">
          <Typography variant="h2" as="h2" className="mb-6 font-bold text-slate-900 dark:text-white">
            Siap Meng-upgrade Operasional Anda?
          </Typography>
          <Typography variant="body" className="mb-8 text-slate-600 dark:text-slate-400">
            Jadwalkan sesi konsultasi gratis untuk memetakan kebutuhan operasional bisnis Anda.
          </Typography>
          <Stack direction="vertical" gap={4} className="justify-center">
            <Link href="/contact">
              <Button size="lg" className="shadow-primary-500/20 w-full rounded-2xl px-10 text-lg shadow-xl sm:w-auto">
                Hubungi Kami
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="w-full rounded-2xl bg-white px-10 text-lg sm:w-auto dark:bg-slate-900">
                Lihat Estimasi Biaya
              </Button>
            </Link>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}
