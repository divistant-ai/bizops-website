'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Filter,
  Lightbulb,
  Loader2,
  Map,
  MessageSquare,
  Rocket,
  Send,
  Sparkles,
  ThumbsUp,
  Timer,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Container from '@/components/layout/Container';
import { Button, Grid, Typography } from '@/components/ui';
import Stack from '@/components/ui/Stack';
import { roadmapData } from '@/data/resourcesContent';

export default function RoadmapPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allTags = ['All', ...Array.from(new Set(roadmapData.flatMap(col => col.items.map(item => item.tag))))];

  const handleVote = (id: string) => {
    if (userVoted[id]) {
      return;
    }
    setVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setUserVoted(prev => ({ ...prev, [id]: true }));
  };

  const handleFeatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      setTimeout(() => {
        setFormSuccess(false);
        setShowRequestForm(false);
      }, 2000);
    }, 1500);
  };

  const getStatusIcon = (id: string) => {
    switch (id) {
      case 'now': return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
      case 'next': return <Timer className="h-5 w-5 text-blue-500" />;
      case 'later': return <Sparkles className="h-5 w-5 text-purple-500" />;
      default: return <Clock className="h-5 w-5 text-slate-500" />;
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
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 transition-colors dark:bg-slate-950">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[50vw] w-[50vw] rounded-full bg-purple-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[50vw] w-[50vw] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Container size="7xl" className="mb-12">
          <Stack direction="vertical" gap={6} className="items-end justify-between border-b border-slate-200 pb-8 dark:border-slate-800">
            <div className="max-w-2xl">
              <div className="text-primary-600 dark:text-primary-400 mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                <Map className="h-4 w-4" />
                {' '}
                Public Roadmap
              </div>
              <Typography variant="h1" as="h1" className="mb-4 font-extrabold">
                Apa yang Sedang Kami Bangun?
              </Typography>
              <Typography variant="body" className="text-slate-600 dark:text-slate-400">
                Transparansi adalah budaya kami. Lihat fitur apa saja yang sedang kami kembangkan, vote untuk prioritas Anda, atau ajukan ide fitur baru.
              </Typography>
            </div>
            <Button
              onClick={() => setShowRequestForm(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              <Lightbulb className="mr-2 h-4 w-4" />
              Request Feature
            </Button>
          </Stack>

          {/* Filters */}
          <div className="mt-8">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="mb-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 md:hidden dark:border-slate-800 dark:bg-slate-900"
            >
              <Filter className="h-4 w-4" />
              Filter by Category
            </button>

            {/* Filters */}
            <div className={`flex flex-wrap gap-2 ${mobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setActiveFilter(tag);
                    setMobileFilterOpen(false);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    activeFilter === tag
                      ? 'bg-primary-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </Container>

        <Container size="7xl" className="space-y-12">
          {roadmapData.map((column, colIdx) => {
            const filteredItems = activeFilter === 'All'
              ? column.items
              : column.items.filter(item => item.tag === activeFilter);

            if (filteredItems.length === 0) {
              return null;
            }

            return (
              <div key={colIdx} className={`border-t-4 ${getStatusColor(column.color)} rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900`}>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
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
                      <div key={item.id} className="hover:border-primary-500 dark:hover:border-primary-500 rounded-xl border border-slate-200 p-6 transition-colors dark:border-slate-800">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="mb-3 flex items-center gap-3">
                              <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                                <ItemIcon className="text-primary-600 dark:text-primary-400 h-5 w-5" />
                              </div>
                              <Typography variant="h3" as="h3" className="font-bold">{item.title}</Typography>
                            </div>
                            <Typography variant="body" className="mb-3 text-slate-600 dark:text-slate-400">{item.desc}</Typography>
                            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {item.tag}
                            </span>
                          </div>
                          <button
                            onClick={() => handleVote(item.id)}
                            disabled={userVoted[item.id]}
                            className={`flex flex-col items-center gap-1 rounded-lg p-3 transition-colors ${
                              userVoted[item.id]
                                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                : 'hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}
                          >
                            <ThumbsUp className="h-5 w-5" />
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

        {/* Feature Request Modal */}
        <AnimatePresence>
          {showRequestForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => !isSubmitting && setShowRequestForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 dark:bg-slate-900"
                onClick={e => e.stopPropagation()}
              >
                {formSuccess
                  ? (
                      <div className="py-8 text-center">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="h-8 w-8" />
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Request Submitted!</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Terima kasih atas masukannya. Tim produk kami akan review ide Anda.
                        </p>
                      </div>
                    )
                  : (
                      <>
                        <div className="mb-6 flex items-center justify-between">
                          <div>
                            <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Request New Feature</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Punya ide fitur yang akan membuat BizOps lebih powerful? Kami ingin mendengarnya!
                            </p>
                          </div>
                          <button
                            onClick={() => setShowRequestForm(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          >
                            <X className="h-6 w-6" />
                          </button>
                        </div>

                        <form onSubmit={handleFeatureSubmit} className="space-y-6">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Feature Title *
                            </label>
                            <input
                              type="text"
                              required
                              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              placeholder="e.g. Multi-Currency Support"
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Category *
                            </label>
                            <select
                              required
                              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            >
                              <option value="">Select category...</option>
                              {allTags.filter(t => t !== 'All').map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Description *
                            </label>
                            <textarea
                              required
                              rows={5}
                              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              placeholder="Jelaskan fitur yang Anda inginkan dan bagaimana fitur ini akan membantu bisnis Anda..."
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Use Case (Optional)
                            </label>
                            <textarea
                              rows={3}
                              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              placeholder="Contoh skenario penggunaan fitur ini di bisnis Anda..."
                            />
                          </div>

                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                              Your Email *
                            </label>
                            <input
                              type="email"
                              required
                              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                              placeholder="your@email.com"
                            />
                          </div>

                          <div className="flex gap-3">
                            <Button
                              type="submit"
                              disabled={isSubmitting}
                              className="bg-primary-600 hover:bg-primary-700 flex-1 text-white"
                            >
                              {isSubmitting
                                ? (
                                    <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Submitting...
                                    </>
                                  )
                                : (
                                    <>
                                      <Send className="mr-2 h-4 w-4" />
                                      Submit Request
                                    </>
                                  )}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setShowRequestForm(false)}
                              disabled={isSubmitting}
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </>
                    )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <Container size="6xl" className="mt-16">
          <div className="from-primary-900 to-primary-800 rounded-3xl bg-gradient-to-br p-12 text-center text-white">
            <Rocket className="text-primary-300 mx-auto mb-6 h-12 w-12" />
            <h2 className="mb-4 text-3xl font-bold">Tidak Menemukan Fitur yang Anda Cari?</h2>
            <p className="text-primary-200 mx-auto mb-8 max-w-2xl text-lg">
              Roadmap ini terus berkembang berdasarkan feedback Anda. Jangan ragu untuk mengajukan ide fitur baru!
            </p>
            <Button
              onClick={() => setShowRequestForm(true)}
              className="text-primary-900 bg-white hover:bg-slate-100"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Share Your Ideas
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
