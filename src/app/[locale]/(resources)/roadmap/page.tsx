'use client';

import { useState } from 'react';
import { roadmapData } from '@/data/resourcesContent';
import { CheckCircle2, Timer, Sparkles, Clock, ThumbsUp } from 'lucide-react';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import Stack from '@/components/ui/Stack';

export default function RoadmapPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});

  const allTags = ['All', ...Array.from(new Set(roadmapData.flatMap(col => col.items.map(item => item.tag))))];

  const handleVote = (id: string) => {
    if (userVoted[id]) return;
    setVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setUserVoted(prev => ({ ...prev, [id]: true }));
  };

  const getStatusIcon = (id: string) => {
    switch (id) {
      case 'now': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'next': return <Timer className="w-5 h-5 text-blue-500" />;
      case 'later': return <Sparkles className="w-5 h-5 text-purple-500" />;
      default: return <Clock className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'border-t-emerald-500';
      case 'blue': return 'border-t-blue-500';
      case 'purple': return 'border-t-purple-500';
      default: return 'border-t-slate-500';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors pt-24 pb-24">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Container size="7xl" className="mb-12">
          <Stack direction="vertical" gap={6} className="items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold uppercase tracking-widest text-xs mb-3">
                Product Roadmap
              </div>
              <Typography variant="h1" as="h1" className="font-extrabold mb-4">
                Transparansi Total. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Roadmap Terbuka.</span>
              </Typography>
              <Typography variant="body" className="text-slate-600 dark:text-slate-400">
                Lihat fitur apa saja yang sedang kami kembangkan. Vote untuk prioritas Anda atau ajukan ide fitur baru.
              </Typography>
            </div>
          </Stack>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </Container>

        <Container size="7xl" className="space-y-12">
          {roadmapData.map((column, colIdx) => {
            const filteredItems = activeFilter === 'All' 
              ? column.items 
              : column.items.filter(item => item.tag === activeFilter);

            if (filteredItems.length === 0) return null;

            return (
              <div key={colIdx} className={`border-t-4 ${getStatusColor(column.color)} bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(column.id)}
                      <Typography variant="h2" as="h2" className="font-bold">{column.status}</Typography>
                    </div>
                    <Typography variant="small" className="text-slate-500 dark:text-slate-400">{column.period}</Typography>
                  </div>
                </div>

                <Grid cols={1} gap={4}>
                  {filteredItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.id} className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-primary-500 dark:hover:border-primary-500 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                <ItemIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                              </div>
                              <Typography variant="h3" as="h3" className="font-bold">{item.title}</Typography>
                            </div>
                            <Typography variant="body" className="text-slate-600 dark:text-slate-400 mb-3">{item.desc}</Typography>
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full">
                              {item.tag}
                            </span>
                          </div>
                          <button
                            onClick={() => handleVote(item.id)}
                            disabled={userVoted[item.id]}
                            className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${
                              userVoted[item.id]
                                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                            }`}
                          >
                            <ThumbsUp className="w-5 h-5" />
                            <span className="text-sm font-bold">{votes[item.id] || 0}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </Grid>
              </div>
            );
          })}
        </Container>
      </div>
    </div>
  );
}
