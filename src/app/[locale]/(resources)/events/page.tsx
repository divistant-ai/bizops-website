'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, PlayCircle, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { CardSlider, Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { eventsData } from '@/data/resourcesContent';

export default function EventsPage() {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Live Demo', 'Webinar', 'Masterclass'];

  const filteredEvents = filter === 'All'
    ? eventsData.upcoming
    : eventsData.upcoming.filter(evt => evt.type.includes(filter) || (filter === 'Webinar' && evt.type === 'Special Webinar'));

  return (
    <div className="min-h-screen bg-slate-50 font-sans dark:bg-slate-950">
      <div className="relative overflow-hidden bg-[#0B1120] pt-32 pb-24 text-white lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="bg-primary-600/20 pointer-events-none absolute top-0 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full blur-[120px]"></div>
        <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[100px]"></div>

        <Container size="7xl" className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-400 mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur-sm"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
            Live Learning Sessions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-5xl leading-tight font-extrabold tracking-tight md:text-7xl"
          >
            BizOps
            {' '}
            <span className="from-primary-400 bg-gradient-to-r to-indigo-400 bg-clip-text text-transparent">Academy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-slate-300"
          >
            Tingkatkan kompetensi tim Anda dengan wawasan langsung dari praktisi. Ikuti sesi edukasi gratis tentang digitalisasi, strategi pajak, dan manajemen operasional modern.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto flex max-w-2xl flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-md sm:flex-row"
          >
            <div className="relative w-full flex-1">
              <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari topik webinar..."
                className="w-full border-none bg-transparent py-3 pr-4 pl-12 text-white placeholder-slate-400 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex w-full gap-2 overflow-x-auto px-2 pb-2 sm:w-auto sm:px-0 sm:pb-0">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                    filter === cat
                      ? 'bg-primary-600 shadow-primary-900/20 text-white shadow-lg'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </Container>
      </div>

      <Container size="7xl" className="relative z-20 -mt-20 space-y-24 pb-24">

        {/* Upcoming Events Grid */}
        <Stack direction="vertical" gap={8}>
          <div className="flex items-center justify-between gap-4">
            <Typography variant="h2" as="h2" className="font-bold">
              <Calendar className="text-primary-400 mr-2 inline h-6 w-6" />
              Upcoming Live Sessions
            </Typography>
          </div>

          <div className="md:hidden">
            <CardSlider>
              {filteredEvents.map((evt, idx) => {
                const Icon = evt.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group flex h-full w-[85vw] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:w-[350px] dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image src={evt.image} alt={evt.title} width={350} height={192} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur">
                        <Icon className="h-3 w-3" />
                        {' '}
                        {evt.type}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60"></div>
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <div className="text-primary-600 dark:text-primary-400 flex items-center gap-2 text-sm font-bold">
                        <Calendar className="h-4 w-4" />
                        {' '}
                        {evt.formattedDate}
                      </div>

                      <Typography variant="h3" as="h3" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-xl leading-tight font-bold text-slate-900 dark:text-white">
                        <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                      </Typography>

                      <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">{evt.desc}</Typography>

                      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-800">
                        <Link href={`/events/${evt.slug}`}>
                          <Button size="sm" className="group-hover:bg-primary-600 transition-colors">
                            Daftar
                            {' '}
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </CardSlider>
          </div>

          <Grid cols={3} gap={8} className="hidden md:grid">
            {filteredEvents.map((evt, idx) => {
              const Icon = evt.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={evt.image} alt={evt.title} width={400} height={192} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur">
                      <Icon className="h-3 w-3" />
                      {' '}
                      {evt.type}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60"></div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="text-primary-600 dark:text-primary-400 flex items-center gap-2 text-sm font-bold">
                      <Calendar className="h-4 w-4" />
                      {' '}
                      {evt.formattedDate}
                    </div>

                    <Typography variant="h3" as="h3" className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-xl leading-tight font-bold text-slate-900 dark:text-white">
                      <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                    </Typography>

                    <Typography variant="small" className="leading-relaxed text-slate-600 dark:text-slate-400">{evt.desc}</Typography>

                    <div className="mt-auto border-t border-slate-100 pt-6 dark:border-slate-800">
                      <Link href={`/events/${evt.slug}`}>
                        <Button size="sm" className="group-hover:bg-primary-600 transition-colors">
                          Daftar
                          {' '}
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </Grid>
        </Stack>

        {/* Past Recordings */}
        {eventsData.recordings && eventsData.recordings.length > 0 && (
          <Stack direction="vertical" gap={8}>
            <Typography variant="h2" as="h2" className="font-bold">
              <PlayCircle className="text-primary-400 mr-2 inline h-6 w-6" />
              Past Recordings
            </Typography>

            <Grid cols={3} gap={6}>
              {eventsData.recordings.map((rec, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <Typography variant="h3" as="h3" className="mb-2 font-bold text-slate-900 dark:text-white">{rec.title}</Typography>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{rec.duration}</span>
                    <span>•</span>
                    <span>
                      {rec.views}
                      {' '}
                      views
                    </span>
                  </div>
                </div>
              ))}
            </Grid>
          </Stack>
        )}
      </Container>
    </div>
  );
}
