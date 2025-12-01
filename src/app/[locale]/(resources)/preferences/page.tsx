'use client';

import { useState } from 'react';
import { Mail, Shield, Bell, XCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import Stack from '@/components/ui/Stack';
import { Section } from '@/components/layout';

export default function PreferencesPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="pt-16 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <Section>
        <Container size="7xl">
          <div className="text-center mb-12">
            <Stack direction="horizontal" gap={4} align="center" justify="center" className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mx-auto mb-6 text-slate-600 dark:text-slate-400">
              <Mail className="w-8 h-8" />
            </Stack>
            <Typography variant="h1" as="h1">Kendalikan Isi Inbox Anda</Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400">
              Kami ingin mengirimkan konten yang bermanfaat, bukan gangguan. Pilih topik apa yang relevan bagi Anda.
            </Typography>
          </div>

          <form onSubmit={handleSave} className="space-y-8 max-w-3xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <Typography variant="h3" as="h3" className="mb-6">Jenis Email</Typography>
              <Stack direction="vertical" gap={6}>
                <Stack direction="horizontal" gap={4} align="start" className="relative">
                  <Stack direction="horizontal" gap={4} align="center" className="h-6">
                    <input 
                      id="pref_updates" 
                      aria-describedby="pref_updates_desc"
                      name="pref_updates" 
                      type="checkbox" 
                      defaultChecked 
                      className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-600" 
                    />
                  </Stack>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="pref_updates" className="font-bold text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer">
                      <Shield className="w-4 h-4 text-green-600" aria-hidden="true" /> Product Updates & Alerts
                    </label>
                    <Typography variant="body" className="text-slate-500 dark:text-slate-400">
                      Info fitur baru, jadwal maintenance, dan patch keamanan. (Disarankan)
                    </Typography>
                  </div>
                </Stack>
                
                <Stack direction="horizontal" gap={4} align="start" className="relative">
                  <Stack direction="horizontal" gap={4} align="center" className="h-6">
                    <input 
                      id="pref_digest" 
                      aria-describedby="pref_digest_desc"
                      name="pref_digest" 
                      type="checkbox" 
                      defaultChecked 
                      className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-600" 
                    />
                  </Stack>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="pref_digest" className="font-bold text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer">
                      <Mail className="w-4 h-4 text-blue-600" aria-hidden="true" /> BizOps Digest
                    </label>
                    <Typography variant="body" className="text-slate-500 dark:text-slate-400">
                      Artikel blog pilihan, tips manajemen, dan regulasi terbaru (Weekly).
                    </Typography>
                  </div>
                </Stack>

                <Stack direction="horizontal" gap={4} align="start" className="relative">
                  <Stack direction="horizontal" gap={4} align="center" className="h-6">
                    <input 
                      id="pref_promo" 
                      aria-describedby="pref_promo_desc"
                      name="pref_promo" 
                      type="checkbox" 
                      className="h-5 w-5 rounded border-slate-300 text-primary-600 focus:ring-primary-600" 
                    />
                  </Stack>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="pref_promo" className="font-bold text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer">
                      <Bell className="w-4 h-4 text-amber-600" aria-hidden="true" /> Marketing Promo
                    </label>
                    <Typography variant="body" className="text-slate-500 dark:text-slate-400">
                      Undangan webinar eksklusif dan penawaran diskon khusus.
                    </Typography>
                  </div>
                </Stack>
              </Stack>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <Typography variant="h3" as="h3" className="mb-6">Frekuensi Maksimal</Typography>
              <div className="flex gap-6" role="radiogroup" aria-label="Email frequency">
                <Stack direction="horizontal" gap={4} align="center">
                  <input id="freq_daily" name="freq" type="radio" className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600" />
                  <label htmlFor="freq_daily" className="ml-3 block text-sm font-medium leading-6 text-slate-900 dark:text-white cursor-pointer">Harian</label>
                </Stack>
                <Stack direction="horizontal" gap={4} align="center">
                  <input id="freq_weekly" name="freq" type="radio" defaultChecked className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600" />
                  <label htmlFor="freq_weekly" className="ml-3 block text-sm font-medium leading-6 text-slate-900 dark:text-white cursor-pointer">Mingguan</label>
                </Stack>
                <Stack direction="horizontal" gap={4} align="center">
                  <input id="freq_monthly" name="freq" type="radio" className="h-4 w-4 border-slate-300 text-primary-600 focus:ring-primary-600" />
                  <label htmlFor="freq_monthly" className="ml-3 block text-sm font-medium leading-6 text-slate-900 dark:text-white cursor-pointer">Bulanan</label>
                </Stack>
              </div>
            </div>

            <Stack direction="horizontal" gap={4} align="center" justify="between" className="pt-4">
              <button type="button" className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1">
                <XCircle className="w-4 h-4" /> Unsubscribe All
              </button>
              <Button size="md" type="submit" disabled={saved}>
                {saved ? 'Tersimpan!' : 'Simpan Preferensi'}
              </Button>
            </Stack>
          </form>
        </Container>
      </Section>
    </div>
  );
}

