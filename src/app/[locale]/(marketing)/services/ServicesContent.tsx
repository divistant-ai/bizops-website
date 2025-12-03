'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Clock, Globe, Layers, Trophy, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Container, Section } from '@/components/layout';
import { Badge, Button, Grid, Stack } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { StaggeredText } from '@/components/ui/motion-text';
import { servicesData } from '@/data/servicesContent';

const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// SpotlightCard Component
const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(14, 165, 233, 0.15)' }: { children: React.ReactNode; className?: string; spotlightColor?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative overflow-hidden border border-slate-200 bg-white ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export default function ServicesContent() {
  const serviceOrder = ['consulting', 'implementation', 'custom-dev', 'managed-business-services', 'training', 'support'];

  const services = serviceOrder
    .filter(key => servicesData[key])
    .map(key => ({
      id: key,
      ...servicesData[key],
    }));

  return (
    <div className="selection:bg-primary-500/30 min-h-screen bg-slate-50 pt-16 font-sans dark:bg-slate-950">
      {/* HERO SECTION */}
      <Section className="relative overflow-hidden border-b border-slate-200 !bg-white pt-20 pb-20 dark:border-slate-800 dark:!bg-slate-900">
        {/* Animated Background Mesh */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white"></div>

        {/* Hero Glow */}
        <div className="bg-primary-500/10 animate-pulse-slow pointer-events-none absolute top-0 left-1/2 h-[500px] w-[1000px] -translate-x-1/2 rounded-[100%] blur-[100px]"></div>

        <Container size="5xl" className="relative z-10 text-center">
          <div className="mb-8 flex justify-center">
            <Breadcrumbs />
          </div>

          <motion.div
            variants={FADE_UP_VARIANTS}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">Accepting New Enterprise Partners</span>
          </motion.div>

          <h1 className="mb-8 text-4xl leading-[1.1] font-bold tracking-tight text-slate-900 md:text-7xl">
            <span className="mb-2 block text-2xl font-medium tracking-normal text-slate-500 md:text-4xl">Engineering Business Success</span>
            <span className="via-primary-800 bg-gradient-to-r from-slate-900 to-slate-900 bg-clip-text text-transparent">
              <StaggeredText text="Beyond Software." delay={0.2} />
            </span>
          </h1>

          <motion.p
            variants={FADE_UP_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl"
          >
            Kami tidak sekadar menjual lisensi software. Kami adalah partner transformasi digital end-to-end—dari diagnosis strategis, implementasi teknis, hingga managed support jangka panjang.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Stack direction="vertical" gap={4} className="justify-center sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="shadow-primary-500/20 h-14 w-full px-8 text-base shadow-xl sm:w-auto">
                  Konsultasi Gratis
                  {' '}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg" className="h-14 w-full px-8 text-base sm:w-auto">
                  Jadwalkan Demo
                </Button>
              </Link>
            </Stack>
          </motion.div>
        </Container>
      </Section>

      {/* SERVICES GRID */}
      <Section className="py-20 md:py-32">
        <Container size="7xl">
          <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Layanan Profesional Kami
            </h2>
            <p className="text-lg text-slate-600">
              Dari konsultasi strategi hingga implementasi teknis. Kami mendampingi setiap langkah transformasi digital Anda.
            </p>
          </FadeIn>

          <FadeInStagger>
            <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-6 md:grid-cols-3">
              {services.map((service, idx) => {
                const Icon = service.icon;
                if (!Icon) return null;
                // Bento Grid Spanning Logic
                const isLarge = idx === 0 || idx === 3; // 1st and 4th items are large horizontal
                const isTall = idx === 2; // 3rd item is tall

                const spanClass = isLarge
                  ? 'md:col-span-2'
                  : isTall
                    ? 'md:row-span-2'
                    : '';

                return (
                  <FadeIn key={service.id} className={`h-full ${spanClass}`}>
                    <Link href={`/services/${service.id}`} className="group block h-full">
                      <SpotlightCard className="hover:border-primary-500/50 dark:hover:border-primary-500/50 h-full overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-900">
                        {/* Tech Pattern Background */}
                        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                        <div className="relative z-10 flex h-full flex-col p-8">
                          <div className="mb-6 flex items-start justify-between">
                            <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 ring-primary-200 dark:ring-primary-800 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-transform group-hover:scale-110">
                              <Icon className="h-7 w-7" />
                            </div>
                            {isLarge && (
                              <Badge variant="outline" className="hidden sm:inline-flex">Popular Service</Badge>
                            )}
                          </div>

                          <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-3 text-2xl font-bold text-slate-900 transition-colors dark:text-white">
                            {service.title}
                          </h3>

                          <p className="mb-6 flex-grow leading-relaxed text-slate-600 dark:text-slate-400">
                            {service.description}
                          </p>

                          <div className="text-primary-600 dark:text-primary-400 mt-auto flex items-center text-sm font-bold transition-transform group-hover:translate-x-2">
                            Lihat Detail
                            {' '}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        </div>
                      </SpotlightCard>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* WHY CHOOSE US */}
      <Section className="border-y border-slate-200 !bg-white py-20 md:py-32">
        <Container size="7xl">
          <FadeIn className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Mengapa Memilih BizOps Services?
            </h2>
            <p className="text-lg text-slate-600">
              Bukan sekadar vendor teknologi. Kami adalah partner strategis jangka panjang.
            </p>
          </FadeIn>

          <Grid cols={1} mdCols={2} lgCols={3} gap={8}>
            {[
              { icon: Trophy, title: 'Proven Track Record', desc: '500+ implementasi sukses di berbagai industri dengan tingkat kepuasan 95%.' },
              { icon: Users, title: 'Expert Team', desc: 'Tim konsultan bersertifikat dengan pengalaman 10+ tahun di transformasi digital.' },
              { icon: Zap, title: 'Agile Methodology', desc: 'Pendekatan sprint yang meminimalkan risiko dengan deliverable bertahap terukur.' },
              { icon: Globe, title: 'End-to-End Support', desc: 'Dari konsultasi awal hingga managed support pasca go-live, kami selalu ada.' },
              { icon: Layers, title: 'Industry Expertise', desc: 'Pemahaman mendalam tentang nuansa unik setiap industri dan regulasi lokal.' },
              { icon: Clock, title: 'Fast Time-to-Value', desc: 'Metodologi kami memastikan Anda melihat ROI dalam 3-6 bulan pertama.' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="group rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="bg-primary-50 text-primary-700 mb-6 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="from-primary-900 relative overflow-hidden bg-gradient-to-br to-slate-900 py-20 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[120px]"></div>

        <Container size="4xl" className="relative z-10 text-center">
          <Badge variant="outline-white" className="mb-6 border-white/20 text-white">Ready to Transform?</Badge>
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Butuh Pendekatan Khusus?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
            Tim kami siap mendiskusikan kebutuhan unik perusahaan Anda. Jadwalkan sesi discovery call gratis.
          </p>
          <Stack direction="vertical" gap={4} className="justify-center sm:flex-row">
            <Link href="/contact">
              <Button size="lg" className="text-primary-700 h-16 w-full bg-white px-10 text-xl font-bold hover:bg-slate-100 sm:w-auto">
                Hubungi Tim Ahli Kami
              </Button>
            </Link>
            <Link href="/pricing/calculator">
              <Button size="lg" variant="outline" className="h-16 w-full border-2 border-white bg-transparent px-10 text-xl text-white hover:bg-white/10 sm:w-auto">
                Cek Estimasi Biaya
              </Button>
            </Link>
          </Stack>
          <p className="mt-6 text-sm text-slate-400">Free consultation • No obligation • Confidential</p>
        </Container>
      </Section>
    </div>
  );
}
