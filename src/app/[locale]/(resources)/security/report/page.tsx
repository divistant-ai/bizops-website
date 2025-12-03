'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { securityReportData } from '@/data/supportContent';

export default function SecurityReportPage() {
  const [copied, setCopied] = useState(false);
  const pgpKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2

mQINBF... (Truncated for display) ...
...BizOps Security Team <security@bizops.id>...
-----END PGP PUBLIC KEY BLOCK-----`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pgpKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] pt-20 font-sans text-slate-300 selection:bg-green-900 selection:text-green-100">
      {/* Hero */}
      <Section className="relative overflow-hidden border-b border-slate-800 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-green-900/20 blur-[120px]"></div>

        <Container size="5xl" className="relative z-10 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-700/50 bg-green-900/30 px-3 py-1 text-xs text-green-400"
          >
            <Terminal className="h-3 w-3" />
            {' '}
            VULNERABILITY DISCLOSURE PROGRAM
          </motion.div>
          <Typography variant="h1" as="h1" className="font-bold tracking-tight text-white">
            See Something,
            {' '}
            <span className="text-green-500">Say Something.</span>
          </Typography>
          <Typography variant="body" className="text-slate-400">
            Keamanan adalah prioritas #1 kami. Kami mengundang peneliti keamanan untuk membantu melindungi ekosistem BizOps melalui pengungkapan yang bertanggung jawab.
          </Typography>
        </Container>
      </Section>

      {/* Scope Table */}
      <Section className="mx-auto max-w-6xl py-20">
        <Grid cols={2} gap={12}>
          {/* In Scope */}
          <div className="rounded-2xl border border-green-900/30 bg-slate-900/50 p-8 transition-colors hover:border-green-700/50">
            <Typography variant="h3" as="h3" className="mb-6 flex items-center gap-3 font-bold text-white">
              <div className="rounded-lg bg-green-900/30 p-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
              </div>
              In Scope
            </Typography>
            <ul className="space-y-4">
              {securityReportData.scope.in.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1 text-green-500">▹</span>
                  {' '}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Out of Scope */}
          <div className="rounded-2xl border border-red-900/30 bg-slate-900/50 p-8 transition-colors hover:border-red-700/50">
            <Typography variant="h3" as="h3" className="mb-6 flex items-center gap-3 font-bold text-white">
              <div className="rounded-lg bg-red-900/30 p-2 text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              Out of Scope
            </Typography>
            <ul className="space-y-4">
              {securityReportData.scope.out.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="mt-1 text-red-500">×</span>
                  {' '}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Grid>
      </Section>

      {/* Report Form & PGP */}
      <Section className="mx-auto max-w-4xl py-12 pb-32">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
          <Typography variant="h2" as="h2" className="mb-8">Cara Melaporkan</Typography>

          <Stack direction="vertical" gap={8}>
            <div>
              <Typography variant="h4" as="h4" className="mb-4">Via Email Terenkripsi</Typography>
              <Typography variant="small" className="mb-4 block text-slate-400">
                Kirim detail temuan Anda (PoC, Impact) ke
                {' '}
                <a href="mailto:security@bizops.id" className="text-green-400 hover:underline">security@bizops.id</a>
                . Gunakan PGP Key kami untuk informasi sensitif.
              </Typography>

              <div className="relative overflow-x-auto rounded-xl border border-slate-800 bg-black p-4 text-xs text-slate-500">
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 rounded bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-700"
                  title="Copy PGP Key"
                >
                  {copied ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                </button>
                <pre>{pgpKey}</pre>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-8">
              <Typography variant="h4" as="h4" className="mb-4">Laporan Cepat (Tanpa Enkripsi)</Typography>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <Grid cols={2} gap={4}>
                  <input type="text" placeholder="Nama / Alias Peneliti" className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                  <input type="email" placeholder="Email Kontak" className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600" />
                </Grid>
                <textarea rows={4} placeholder="Deskripsi Kerentanan Singkat..." className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"></textarea>
                <Button size="md" className="w-full border-none bg-green-600 text-white hover:bg-green-700 md:w-auto">
                  Submit Report
                </Button>
              </form>
            </div>
          </Stack>
        </div>
      </Section>
    </div>
  );
}
