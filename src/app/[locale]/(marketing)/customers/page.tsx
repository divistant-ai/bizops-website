'use client';

import Link from 'next/link';
import { customerStories } from '@/data/companyContent';
import Button from '@/components/ui/Button';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { CustomerStoryCard } from '@/components/pages/CustomerStoryCard';
import { CardSlider } from '@/components/ui';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Section } from '@/components/layout';
import Stack from '@/components/ui/Stack';

export default function CustomersPage() {
  const logos = customerStories.map(s => s.client);
  const infiniteLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans selection:bg-blue-500/30">
      {/* HERO SECTION */}
      <Section className="relative overflow-hidden bg-[#0B1120] text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <Container size="7xl" className="relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md"
          >
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <Typography variant="small" className="text-white">Trusted by Leaders</Typography>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Powering the Engines of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Modern Business.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-12 border-t border-white/10"
          >
            {[
              { val: "500+", label: "Enterprise Clients" },
              { val: "Rp 2.5T", label: "Transaction Value" },
              { val: "99.9%", label: "System Uptime" },
              { val: "24/7", label: "Expert Support" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 leading-tight">{stat.val}</div>
                <div className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* STORIES LIST */}
      <div className="relative z-20 -mt-20">
        <Container size="7xl" className="pb-32">
          {/* Mobile Slider */}
          <div className="md:hidden">
            <CardSlider mobileItemWidth="w-[90vw] sm:w-[600px]">
              {customerStories.map((story, idx) => (
                <CustomerStoryCard key={idx} story={story} idx={idx} />
              ))}
            </CardSlider>
          </div>

          {/* Desktop Stack */}
          <Stack direction="vertical" gap={12} className="hidden md:block">
            {customerStories.map((story, idx) => (
              <CustomerStoryCard key={idx} story={story} idx={idx} />
            ))}
          </Stack>
        </Container>
      </div>
      
      {/* INFINITE LOGO LOOP */}
      <div className="py-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 overflow-hidden">
        <Container size="7xl" className="text-center mb-12">
          <Typography variant="small" className="text-slate-500 dark:text-slate-400">Trusted by Industry Leaders</Typography>
        </Container>
        
        <div className="relative flex overflow-x-hidden w-full group">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10"></div>

          <motion.div 
            className="flex items-center gap-16 lg:gap-24 whitespace-nowrap py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 25
            }}
          >
            {infiniteLogos.map((name, i) => (
              <div key={i} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default">
                <span className="text-2xl md:text-3xl font-black text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-white tracking-tight">
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA SECTION */}
      <Section className="bg-[#0B1120] py-24 relative overflow-hidden text-white dark">
        <Container size="7xl" className="text-center relative z-10">
          <Typography variant="h2" as="h2">Join the Revolution</Typography>
          <Typography variant="body" className="text-slate-400">
            Jangan biarkan inefisiensi menahan pertumbuhan Anda. Bergabunglah dengan ratusan perusahaan yang telah beralih ke BizOps.
          </Typography>
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/demo">
              <Button size="lg" className="px-8 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-bold shadow-xl">
                Start Transformation
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}

