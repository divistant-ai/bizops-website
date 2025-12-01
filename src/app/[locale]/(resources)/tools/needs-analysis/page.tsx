import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Analisis Kebutuhan Sistem ERP | BizOps',
  description: 'Pahami metode Needs Analysis kami sebelum memulai proyek transformasi digital.',
});

export default function NeedsAnalysisPage() {
  return (
    <div className="min-h-screen bg-white">
      <Section className="pt-32 pb-20">
        <Container className="mx-auto max-w-4xl text-center">
          <h1 className="mb-8 text-4xl leading-tight font-extrabold text-neutral-900 md:text-6xl">
            Mengapa Proyek ERP Gagal?
            {' '}
            <br />
            <span className="text-primary-600">Salah Analisis Kebutuhan.</span>
          </h1>
          <p className="mb-10 text-xl leading-relaxed text-neutral-600">
            Needs Analysis bukan sekadar mencatat fitur yang diinginkan user.
            Ini adalah proses membedah "Pain Point" yang sebenarnya dan memetakan solusi yang memberikan dampak bisnis terbesar.
          </p>

          <div className="mb-16 grid gap-8 text-left md:grid-cols-3">
            {[
              { title: 'Discovery', desc: 'Wawancara mendalam dengan Key User untuk memahami alur kerja saat ini (As-Is).' },
              { title: 'Gap Analysis', desc: 'Identifikasi kesenjangan antara proses saat ini dengan Best Practice industri.' },
              { title: 'Solution Design', desc: 'Merancang arsitektur sistem (To-Be) yang menutup gap tersebut secara efisien.' },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                <div className="bg-primary-100 text-primary-700 mb-4 flex h-10 w-10 items-center justify-center rounded-full font-bold">
                  {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="text-neutral-600">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900 p-8 text-white md:p-12">
            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-bold">Mulai Analisis Mandiri Sekarang</h2>
              <p className="mx-auto mb-8 max-w-2xl text-neutral-300">
                Kami telah mendigitalkan framework analisis konsultan kami menjadi tool interaktif gratis.
                Dapatkan rekomendasi modul dan skor prioritas dalam 5 menit.
              </p>
              <Link href="/tools/assessment">
                <Button size="lg" className="bg-primary-600 hover:bg-primary-700 shadow-primary-500/30 h-14 rounded-full px-8 text-lg text-white shadow-xl">
                  Mulai Assessment Online
                  {' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            {/* Background decoration */}
            <div className="bg-primary-600/20 absolute top-0 right-0 h-64 w-64 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-purple-600/20 blur-[80px]"></div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
