'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Quote } from 'lucide-react';
import { Grid, Typography } from '@/components/ui';
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
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
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

      <div className="relative flex h-full flex-col gap-4 lg:flex-row">
        {/* LEFT: Impact & Metrics (Dark Side) */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-10 text-white lg:w-[400px]">
          <div className="absolute top-0 left-0 h-full w-full overflow-hidden opacity-20">
            <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-blue-500 blur-[80px]"></div>
            <div className="absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-indigo-500 blur-[80px]"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-xl font-bold text-slate-900 shadow-lg">
              {story.logo}
            </div>
            <Typography variant="h3" as="h3" className="font-bold">{story.client}</Typography>
            <Typography variant="body" className="tracking-wider text-slate-400">{story.industry}</Typography>

            <Stack direction="vertical" gap={6} className="border-t border-white/10 pt-8">
              {story.metrics.map((m, i) => (
                <div key={i}>
                  <div className="mb-1 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-4xl leading-tight font-bold text-transparent">{m.value}</div>
                  <div className="text-sm font-medium text-slate-400">{m.label}</div>
                </div>
              ))}
            </Stack>
          </div>
        </div>

        {/* RIGHT: The Story (Light Side) */}
        <div className="flex flex-1 flex-col gap-4 p-10 lg:p-14">
          <div className="mb-8">
            <Typography variant="h2" as="h2" className="leading-tight font-bold text-slate-900 dark:text-white">
              "
              {story.title}
              "
            </Typography>

            <div className="mb-8 flex gap-4">
              <Quote className="h-10 w-10 flex-shrink-0 text-blue-200 dark:text-blue-900" />
              <Typography variant="body" className="leading-relaxed text-slate-600 dark:text-slate-300">{story.desc}</Typography>
            </div>
          </div>

          {/* Transformation Grid */}
          <Grid cols={2} gap={6} className="mt-auto">
            <div className="rounded-xl border border-red-100 bg-red-50 p-5 dark:border-red-900/20 dark:bg-red-900/10">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-red-700 uppercase dark:text-red-400">
                <AlertTriangle className="h-4 w-4" />
                {' '}
                Before BizOps
              </div>
              <Typography variant="small" className="leading-relaxed text-slate-700 dark:text-slate-300">{story.chaos}</Typography>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50 p-5 dark:border-green-900/20 dark:bg-green-900/10">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wider text-green-700 uppercase dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                {' '}
                After BizOps
              </div>
              <Typography variant="small" className="leading-relaxed text-slate-700 dark:text-slate-300">{story.solution}</Typography>
            </div>
          </Grid>
        </div>
      </div>
    </motion.div>
  );
}
