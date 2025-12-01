'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Quote, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Typography } from '@/components/ui';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';

type CustomerStory = {
  client: string;
  industry: string;
  logo: string;
  title: string;
  chaos: string;
  solution: string;
  desc: string;
  metrics: Array<{ value: string; label: string }>;
};

type CustomerStoryCardProps = {
  story: CustomerStory;
  idx: number;
};

export function CustomerStoryCard({ story, idx }: CustomerStoryCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative h-full flex flex-col lg:flex-row gap-4">
        {/* LEFT: Impact & Metrics (Dark Side) */}
        <div className="lg:w-[400px] bg-slate-900 text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-500 rounded-full blur-[80px]"></div>
          </div>

          <div className="relative z-10">
            <div className="w-16 h-16 bg-white text-slate-900 rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg mb-8">
              {story.logo}
            </div>
            <Typography variant="h3" as="h3" className="font-bold">{story.client}</Typography>
            <Typography variant="body" className="text-slate-400 tracking-wider">{story.industry}</Typography>
            
            <Stack direction="vertical" gap={6} className="pt-8 border-t border-white/10">
              {story.metrics.map((m, i) => (
                <div key={i}>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-1 leading-tight">{m.value}</div>
                  <div className="text-sm text-slate-400 font-medium">{m.label}</div>
                </div>
              ))}
            </Stack>
          </div>
        </div>

        {/* RIGHT: The Story (Light Side) */}
        <div className="flex-1 p-10 lg:p-14 flex flex-col gap-4">
          <div className="mb-8">
            <Typography variant="h2" as="h2" className="font-bold text-slate-900 dark:text-white leading-tight">"{story.title}"</Typography>
            
            <div className="flex gap-4 mb-8">
              <Quote className="w-10 h-10 text-blue-200 dark:text-blue-900 flex-shrink-0" />
              <Typography variant="body" className="text-slate-600 dark:text-slate-300 leading-relaxed">{story.desc}</Typography>
            </div>
          </div>

          {/* Transformation Grid */}
          <Grid cols={2} gap={6} className="mt-auto">
            <div className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/20">
              <div className="flex items-center gap-2 mb-2 text-red-700 dark:text-red-400 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" /> Before BizOps
              </div>
              <Typography variant="small" className="text-slate-700 dark:text-slate-300 leading-relaxed">{story.chaos}</Typography>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-100 dark:border-green-900/20">
              <div className="flex items-center gap-2 mb-2 text-green-700 dark:text-green-400 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> After BizOps
              </div>
              <Typography variant="small" className="text-slate-700 dark:text-slate-300 leading-relaxed">{story.solution}</Typography>
            </div>
          </Grid>
        </div>
      </div>
    </motion.div>
  );
}

