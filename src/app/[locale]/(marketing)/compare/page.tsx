import { ArrowRight, Info, X } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { comparisonsData } from '@/data/comparisonData';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import { transformContent } from '@/libs/utils/transformContent';

export const metadata = genMeta({
  title: 'Bandingkan BizOps dengan Solusi Lain | BizOps',
  description: 'Lihat mengapa BizOps adalah alternatif terbaik dibanding Odoo, SAP, Accurate, atau Excel.',
});

export default function ComparisonIndexPage() {
  const competitors = Object.values(comparisonsData).filter(c => c.id !== 'bizops');

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-center text-white">
        <Container>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Jangan Salah Pilih Platform.</h1>
          <p className="mx-auto max-w-3xl text-xl text-neutral-300">
            Setiap software punya kelebihan, tapi tidak semuanya cocok untuk fase bisnis Anda saat ini. Kami sajikan perbandingan jujur dan transparan.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {competitors.map((comp) => {
              const icon = transformContent({ icon: comp.icon }).icon;
              return (
                <div key={comp.id} className="flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-xl">
                  <div className="p-8 pb-0">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 ${comp.color} mb-6`}>
                      {icon}
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-neutral-900">
                      vs
                      {comp.name}
                    </h2>
                    <p className="mb-6 line-clamp-2 h-12 text-sm text-neutral-600">{comp.description}</p>

                    <div className="mb-6 inline-flex w-full items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                      <Info className="h-4 w-4" />
                      {' '}
                      Bottleneck:
                      {comp.bottleneckLabel}
                    </div>
                  </div>

                  <div className="flex-grow border-t border-neutral-100 bg-neutral-50/50 p-8 pt-6">
                    <h3 className="mb-4 text-sm font-bold tracking-wider text-neutral-900 uppercase">Keterbatasan Utama</h3>
                    <ul className="mb-8 space-y-3">
                      {comp.limitations.map((limit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-neutral-600">
                          <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                          <span>{limit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto p-6 pt-0">
                    <Link href={`/compare/${comp.id}`} className="block w-full">
                      <Button variant="outline" className="group h-12 w-full justify-between rounded-xl">
                        Lihat Detail Perbandingan
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </div>
  );
}
