'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, ArrowRight, PlayCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { eventsData } from '@/data/resourcesContent';
import { motion } from 'framer-motion';
import { CardSlider } from '@/components/ui';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import Stack from '@/components/ui/Stack';
import { Grid } from '@/components/ui';
import Image from 'next/image';

export default function EventsPage() {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Live Demo', 'Webinar', 'Masterclass'];
  
  const filteredEvents = filter === 'All' 
    ? eventsData.upcoming 
    : eventsData.upcoming.filter(evt => evt.type.includes(filter) || (filter === 'Webinar' && evt.type === 'Special Webinar'));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans">
      <div className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-[#0B1120] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <Container size="7xl" className="relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-primary-400 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Learning Sessions
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            BizOps <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">Academy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Tingkatkan kompetensi tim Anda dengan wawasan langsung dari praktisi. Ikuti sesi edukasi gratis tentang digitalisasi, strategi pajak, dan manajemen operasional modern.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex flex-col sm:flex-row items-center gap-2 shadow-2xl"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari topik webinar..." 
                className="w-full pl-12 pr-4 py-3 bg-transparent border-none text-white placeholder-slate-400 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 px-2 sm:px-0">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    filter === cat 
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
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

      <Container size="7xl" className="-mt-20 relative z-20 pb-24 space-y-24">
        
        {/* Upcoming Events Grid */}
        <Stack direction="vertical" gap={8}>
          <div className="flex items-center justify-between gap-4">
            <Typography variant="h2" as="h2" className="font-bold">
              <Calendar className="w-6 h-6 text-primary-400 inline mr-2" />
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
                    className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-[85vw] sm:w-[350px]"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image src={evt.image} alt={evt.title} width={350} height={192} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-xs font-bold uppercase tracking-wider">
                        <Icon className="w-3 h-3" /> {evt.type}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60"></div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-bold">
                        <Calendar className="w-4 h-4" /> {evt.formattedDate}
                      </div>
                      
                      <Typography variant="h3" as="h3" className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400">
                        <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                      </Typography>
                      
                      <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">{evt.desc}</Typography>

                      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <Link href={`/events/${evt.slug}`}>
                          <Button size="sm" className="group-hover:bg-primary-600 transition-colors">
                            Daftar <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={evt.image} alt={evt.title} width={400} height={192} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-white text-xs font-bold uppercase tracking-wider">
                      <Icon className="w-3 h-3" /> {evt.type}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 font-bold">
                      <Calendar className="w-4 h-4" /> {evt.formattedDate}
                    </div>
                    
                    <Typography variant="h3" as="h3" className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      <Link href={`/events/${evt.slug}`}>{evt.title}</Link>
                    </Typography>
                    
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">{evt.desc}</Typography>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                      <Link href={`/events/${evt.slug}`}>
                        <Button size="sm" className="group-hover:bg-primary-600 transition-colors">
                          Daftar <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
              <PlayCircle className="w-6 h-6 text-primary-400 inline mr-2" />
              Past Recordings
            </Typography>
            
            <Grid cols={3} gap={6}>
              {eventsData.recordings.map((rec, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all">
                  <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white mb-2">{rec.title}</Typography>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span>{rec.duration}</span>
                    <span>•</span>
                    <span>{rec.views} views</span>
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
