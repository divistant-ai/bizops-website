'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { CustomerStoryCard } from '@/components/pages/CustomerStoryCard';
import { CardSlider, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { customerStories } from '@/data/companyContent';

export default function CustomersContent() {
  const logos = customerStories.map(s => s.client);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 dark:bg-slate-950">
      {/* HERO SECTION */}
      <Section className="relative overflow-hidden bg-[#0B1120] py-16 text-white md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]"></div>

        <Container size="7xl" className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4" />
              <span>Dipercaya oleh 500+ Perusahaan</span>
            </div>

            <Typography variant="h1" className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              Cerita Sukses Pelanggan Kami
            </Typography>

            <Typography variant="body" className="mx-auto max-w-3xl text-lg text-slate-300 md:text-xl">
              Dari startup hingga enterprise, lihat bagaimana BizOps membantu bisnis Indonesia mencapai efisiensi operasional dan pertumbuhan berkelanjutan.
            </Typography>
          </motion.div>
        </Container>
      </Section>

      {/* CUSTOMER STORIES */}
      <Section className="py-16 md:py-24">
        <Container size="7xl">
          <div className="mb-12 text-center">
            <Typography variant="h2" className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Transformasi Nyata, Hasil Terukur
            </Typography>
            <Typography variant="body" className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Setiap bisnis memiliki tantangan unik. Lihat bagaimana BizOps memberikan solusi yang tepat.
            </Typography>
          </div>

          <CardSlider
            desktopClassName="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            mobileItemWidth="w-[85vw] sm:w-[400px]"
          >
            {customerStories.map((story, idx) => (
              <CustomerStoryCard key={idx} story={story} idx={idx} />
            ))}
          </CardSlider>
        </Container>
      </Section>

      {/* LOGOS SECTION */}
      <Section className="border-y border-slate-200 !bg-white py-12">
        <Container size="7xl">
          <Typography variant="body" className="mb-8 text-center text-sm font-medium tracking-wider text-slate-500 uppercase">
            Dipercaya oleh Pemimpin Industri
          </Typography>

          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0 md:gap-12">
            {logos.slice(0, 6).map((logo, idx) => (
              <div key={idx} className="text-2xl font-black tracking-tighter text-slate-800">
                {logo}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA SECTION */}
      <Section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-16 text-white md:py-24">
        <Container size="4xl" className="text-center">
          <Typography variant="h2" className="mb-6 text-3xl font-extrabold text-white md:text-4xl">
            Siap Menjadi Cerita Sukses Berikutnya?
          </Typography>
          <Typography variant="body" className="mb-10 text-lg text-blue-100 md:text-xl">
            Bergabunglah dengan ratusan perusahaan yang telah meningkatkan efisiensi operasional mereka dengan BizOps.
          </Typography>

          <Stack direction="horizontal" gap={4} justify="center" className="flex-col sm:flex-row">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <Link href="/demo">Request Demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="/contact">Hubungi Sales</Link>
            </Button>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}
