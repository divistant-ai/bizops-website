'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Book, Terminal, Copy, Check, MessageSquare, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import { Section } from '@/components/layout';
import { CardSlider } from '@/components/ui';
import { docsData } from '@/data/resourcesContent';
import Card from '@/components/ui/Card';

export default function DocsPage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('curl -X GET "https://api.bizops.id/v2/resource/Employee" -H "Authorization: Token xyz:123"');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors min-h-screen">
      {/* HERO SECTION */}
      <Section className="relative pt-32 pb-20 bg-[#0B1120] overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none"></div>

        <Container size="4xl" className="relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-primary-300 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Book className="w-3 h-3" /> Knowledge Base
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight"
          >
            How can we help you?
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative max-w-2xl mx-auto group transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}
          >
            <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-xl group-hover:bg-primary-500/30 transition-colors"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex items-center overflow-hidden gap-4">
              <Search className="w-6 h-6 text-slate-400 ml-5 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search guides, API docs, or troubleshooting..." 
                className="w-full px-4 py-5 bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:ring-0 focus:outline-none text-lg"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="hidden sm:flex items-center gap-1 pr-5 text-xs font-medium text-slate-400">
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">⌘ K</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400"
          >
            <span className="text-slate-500">Popular topics:</span>
            <Link href="/docs/import-data" className="hover:text-white hover:underline decoration-primary-500 underline-offset-4 transition-all">Import Excel Data</Link>
            <Link href="/docs/setup-payroll" className="hover:text-white hover:underline decoration-primary-500 underline-offset-4 transition-all">Setup PPh 21 TER</Link>
            <Link href="/docs/api-keys" className="hover:text-white hover:underline decoration-primary-500 underline-offset-4 transition-all">Generate API Key</Link>
            <Link href="/docs/troubleshoot" className="hover:text-white hover:underline decoration-primary-500 underline-offset-4 transition-all">Connection Error 502</Link>
          </motion.div>
        </Container>
      </Section>

      <Container size="7xl" className="-mt-16 relative z-20 pb-24">
        
        {/* USER GUIDES */}
        <div className="mb-24">
          <div className="md:hidden">
            <CardSlider>
              {docsData.categories.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-[85vw] sm:w-[350px]"
                  >
                    <Card hoverEffect className="h-full flex flex-col">
                      <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                        <Icon className="w-7 h-7" />
                      </div>
                      <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white mb-3">{cat.title}</Typography>
                      <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">{cat.desc}</Typography>
                    </Card>
                  </motion.div>
                );
              })}
            </CardSlider>
          </div>

          <Grid cols={3} gap={8} className="hidden md:grid">
            {docsData.categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card hoverEffect className="h-full flex flex-col">
                    <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6 text-primary-600">
                      <Icon className="w-7 h-7" />
                    </div>
                    <Typography variant="h3" as="h3" className="font-bold text-slate-900 dark:text-white mb-3">{cat.title}</Typography>
                    <Typography variant="small" className="text-slate-600 dark:text-slate-400 leading-relaxed">{cat.desc}</Typography>
                  </Card>
                </motion.div>
              );
            })}
          </Grid>
        </div>

        {/* API PREVIEW */}
        <div className="mb-24 bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800">
          <Grid cols={2} mdCols={1} gap={12} className="items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-primary-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Terminal className="w-3 h-3" /> API Reference
              </div>
              <Typography variant="h2" as="h2" className="font-bold text-white mb-6">Integrate with REST API</Typography>
              <Typography variant="body" className="text-slate-400 leading-relaxed mb-8">
                BizOps menyediakan REST API yang lengkap dan konsisten untuk integrasi dengan sistem eksternal. Semua endpoint menggunakan autentikasi berbasis token.
              </Typography>
              
              <div className="space-y-4">
                {docsData.apiPreview.map((api, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      api.method === 'GET' ? 'bg-blue-500/20 text-blue-400' :
                      api.method === 'POST' ? 'bg-green-500/20 text-green-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {api.method}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm mb-1">{api.endpoint}</div>
                      <div className="text-slate-400 text-xs">{api.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">bash</span>
                    <button onClick={handleCopy} className="text-xs flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors group">
                      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 group-hover:text-blue-400" />}
                      {copied ? <span className="text-green-400">Copied!</span> : "Copy"}
                    </button>
                  </div>
                </div>
                <div className="p-6 text-sm leading-relaxed overflow-x-auto">
                  <div className="text-slate-300 font-mono">
                    <span className="text-purple-400">curl</span> --request GET \<br/>
                    &nbsp;&nbsp;--url <span className="text-green-400">'https://api.bizops.id/v2/resource/Employee'</span> \<br/>
                    &nbsp;&nbsp;--header <span className="text-green-400">'Authorization: Token xyz:123'</span> \<br/>
                    &nbsp;&nbsp;--header <span className="text-green-400">'Content-Type: application/json'</span>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </div>

        {/* COMMUNITY & SUPPORT */}
        <div className="text-center">
          <Typography variant="h2" as="h2" className="mb-4">Still need help?</Typography>
          <Typography variant="body" className="text-slate-600 dark:text-slate-400 mb-12">
            Our support team and community are here for you.
          </Typography>
          
          <Grid cols={3} gap={6}>
            <a href="https://discord.gg/bizops" target="_blank" rel="noopener noreferrer" className="block h-full">
              <Card hoverEffect className="h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <Typography variant="h3" as="h3" className="mb-3">Developer Community</Typography>
                <Typography variant="small" className="text-slate-500 dark:text-slate-400 mb-4">
                  Join 2,000+ developers. Discuss API integration, share custom scripts, and get help.
                </Typography>
                <span className="text-indigo-600 font-bold text-sm">Join Discord →</span>
              </Card>
            </a>
            
            <Link href="/roadmap" className="block h-full">
              <Card hoverEffect className="h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8" />
                </div>
                <Typography variant="h3" as="h3" className="mb-3">Feature Requests</Typography>
                <Typography variant="small" className="text-slate-500 dark:text-slate-400 mb-4">
                  Missing a feature? Submit a request or vote on our public roadmap.
                </Typography>
                <span className="text-amber-600 font-bold text-sm">View Roadmap →</span>
              </Card>
            </Link>
            
            <Link href="/contact" className="block h-full">
              <Card hoverEffect className="h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8" />
                </div>
                <Typography variant="h3" as="h3" className="mb-3">Premium Support</Typography>
                <Typography variant="small" className="text-slate-500 dark:text-slate-400 mb-4">
                  Priority support channel for Enterprise and Partner plans. 24/7 SLAs available.
                </Typography>
                <span className="text-blue-600 font-bold text-sm">Open Ticket →</span>
              </Card>
            </Link>
          </Grid>
        </div>

      </Container>
    </div>
  );
}
