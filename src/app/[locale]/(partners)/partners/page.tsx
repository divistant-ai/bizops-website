import { Briefcase, DollarSign, Users } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge, Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';
import { partnerContent } from '@/data/companyContent'; // Note: partnerContent is in companyContent.ts
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export const metadata = genMeta({
  title: 'Program Mitra & Reseller | BizOps Partner Network',
  description: 'Transformasi bisnis konsultan Anda dengan White-label ERP. Recurring revenue tinggi, nol risiko R&D.',
});

export default function PartnerLandingPage() {
  const { shift, benefits, personas } = partnerContent;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <Section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 text-white">
        <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-indigo-900/30 blur-[120px]" />
        <Container className="relative z-10 text-center">
          <Badge variant="outline" className="mb-6 border-indigo-500/30 tracking-wider text-indigo-300 uppercase">
            Partner Program
          </Badge>
          <h1 className="mb-8 text-4xl leading-tight font-extrabold md:text-6xl">
            Berhenti Menukar
            {' '}
            <br className="hidden md:block" />
            {' '}
            <span className="text-indigo-400">Waktu dengan Uang.</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-neutral-300">
            Jual sistem, bukan hanya saran. Bangun bisnis berbasis aset dengan Recurring Revenue
            melalui program White-label ERP kami.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/partners/apply">
              <Button size="lg" className="rounded-full border-0 bg-indigo-600 px-8 text-white hover:bg-indigo-700">
                Daftar Jadi Partner
              </Button>
            </Link>
            <Link href="/partners/directory">
              <Button size="lg" variant="outline" className="rounded-full border-neutral-700 px-8 text-white hover:bg-white/10">
                Cari Partner
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* The Shift (Old vs New) */}
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-10">
              <h3 className="mb-2 text-2xl font-bold text-neutral-500">{shift.old.title}</h3>
              <h4 className="mb-6 text-xl font-bold text-neutral-900">{shift.old.subtitle}</h4>
              <p className="leading-relaxed text-neutral-600">{shift.old.desc}</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-indigo-50 p-10">
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-indigo-200/50 blur-3xl" />
              <h3 className="relative z-10 mb-2 text-2xl font-bold text-indigo-600">{shift.new.title}</h3>
              <h4 className="relative z-10 mb-6 text-xl font-bold text-neutral-900">{shift.new.subtitle}</h4>
              <p className="relative z-10 leading-relaxed text-neutral-700">{shift.new.desc}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="bg-neutral-900 text-white">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Mengapa Bermitra?</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => {
              const Icon = transformContent({ icon: benefit.icon }).icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-8">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
                      {Icon}
                    </div>
                    <h3 className="mb-4 text-lg font-bold">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-400">{benefit.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Personas */}
      <Section className="border-b border-neutral-200 bg-white">
        <Container size="5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">Siapa yang Cocok?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {personas.map((persona, i) => (
              <div key={i} className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="text-primary-600 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
                    {i === 0 ? <DollarSign className="h-5 w-5" /> : i === 1 ? <Briefcase className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                  </div>
                  <h3 className="leading-tight font-bold text-neutral-900">{persona.title}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-xs font-bold tracking-wider text-red-500 uppercase">Pain Point</span>
                  <p className="mt-1 text-sm text-neutral-600">{persona.pain}</p>
                </div>
                <div>
                  <span className="text-xs font-bold tracking-wider text-green-600 uppercase">Solution</span>
                  <p className="mt-1 text-sm text-neutral-600">{persona.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
