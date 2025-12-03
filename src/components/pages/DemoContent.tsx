'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle, FileCheck, Lock, Shield, Video, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Checkbox, Input, Select } from '@/components/Form';
import Container from '@/components/layout/Container';
import { Grid, Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { traceAction } from '@/libs/utils/telemetry';

export function DemoContent() {
  const router = useRouter();
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    const fullName = formData.get('fullName') as string;
    const email = formData.get('workEmail') as string;
    const company = formData.get('companyName') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const consent = formData.get('consent') as string;

    if (!fullName) {
      newErrors.fullName = 'Nama lengkap wajib diisi.';
    } else if (fullName.length < 3) {
      newErrors.fullName = 'Nama lengkap minimal 3 karakter.';
    } else if (fullName.length > 100) {
      newErrors.fullName = 'Nama lengkap maksimal 100 karakter.';
    } else if (!/^[a-z\s.]+$/i.test(fullName)) {
      newErrors.fullName = 'Nama hanya boleh berisi huruf dan spasi.';
    }

    const emailRegex = /^[\w.-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
    if (!email) {
      newErrors.workEmail = 'Email bisnis wajib diisi.';
    } else if (!emailRegex.test(email)) {
      newErrors.workEmail = 'Format email tidak valid (contoh: nama@perusahaan.com).';
    } else if (email.includes('gmail.com') || email.includes('yahoo.com') || email.includes('hotmail.com')) {
      newErrors.workEmail = 'Gunakan email bisnis/perusahaan (bukan email pribadi).';
    }

    if (!company) {
      newErrors.companyName = 'Nama perusahaan wajib diisi.';
    } else if (company.length < 3) {
      newErrors.companyName = 'Nama perusahaan minimal 3 karakter.';
    } else if (company.length > 100) {
      newErrors.companyName = 'Nama perusahaan maksimal 100 karakter.';
    }

    const phoneRegex = /^(\+62|62|0)\d{9,15}$/;
    const cleanPhone = whatsapp?.replace(/[\s-]/g, '');
    if (!whatsapp) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.whatsapp = 'Nomor WhatsApp tidak valid (contoh: 08123456789 atau +6281234567890).';
    }

    if (!consent) {
      newErrors.consent = 'Anda harus menyetujui Kebijakan Privasi untuk melanjutkan.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!validate(formData)) {
      return;
    }

    setFormState('submitting');

    const name = formData.get('fullName') as string;
    const company = formData.get('companyName') as string;
    const email = formData.get('workEmail') as string;
    const industry = formData.get('industry') as string;

    const phone = '622139702834';
    const message = `Halo BizOps, saya ${name} dari ${company}. Saya tertarik untuk demo produk (Industri: ${industry}). Email saya: ${email}.`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    await traceAction('business.lead.submit', async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      window.open(whatsappUrl, '_blank');
      setFormState('success');
    });
  };

  if (formState === 'success') {
    return (
      <Stack direction="vertical" gap={4} align="center" justify="center" className="min-h-screen bg-[#0B0F19] px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/50"
        >
          <CheckCircle className="h-10 w-10 text-emerald-500" aria-hidden="true" />
        </motion.div>
        <Typography variant="h2" as="h2">Mengalihkan ke WhatsApp...</Typography>
        <Typography variant="body" className="text-slate-400">Jika WhatsApp tidak terbuka otomatis, silakan klik tombol di bawah ini. Tim kami akan segera merespons chat Anda.</Typography>
        <Button size="md" variant="primary" onClick={() => router.push('/')}>Kembali ke Beranda</Button>
      </Stack>
    );
  }

  return (
    <div className="selection:bg-primary-500/30 min-h-screen bg-[#0B0F19] font-sans text-slate-200">
      <div className="relative overflow-hidden pt-28 pb-24">
        <div className="bg-primary-600/20 pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"></div>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        <Container size="7xl" className="relative z-10">
          <Grid cols={12} gap={12}>

            {/* Left: Value Proposition */}
            <Stack direction="vertical" gap={4} justify="center" className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Stack direction="horizontal" gap={2} align="center" className="bg-primary-500/10 border-primary-500/20 text-primary-400 mb-6 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase">
                  <Video className="h-3 w-3" />
                  {' '}
                  Live Walkthrough
                </Stack>
                <Typography variant="h1" as="h1" className="leading-tight font-extrabold tracking-tight text-white">
                  Lihat BizOps
                  {' '}
                  <br />
                  <span className="from-primary-400 bg-gradient-to-r to-cyan-400 bg-clip-text text-transparent">In Action.</span>
                </Typography>
                <Typography variant="body" className="text-slate-400">
                  Ini bukan sekadar demo fitur. Diskusikan arsitektur sistem yang tepat untuk masalah operasional spesifik perusahaan Anda dengan Solution Architect kami.
                </Typography>

                <Stack direction="vertical" gap={8} className="mb-12">
                  {[
                    { icon: Calendar, title: 'Discovery Session (15m)', desc: 'Kami akan membedah \'bottle-neck\' operasional Anda saat ini.' },
                    { icon: Video, title: 'Tailored Walkthrough (30m)', desc: 'Demo produk spesifik industri Anda. No generic features.' },
                    { icon: FileCheck, title: 'Architecture & Quote', desc: 'Rekomendasi topologi infrastruktur & estimasi investasi.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-5">
                      <Stack direction="horizontal" gap={4} align="center" justify="center" className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 shadow-inner">
                        <item.icon className="text-primary-400 h-6 w-6" />
                      </Stack>
                      <div>
                        <Typography variant="h4" as="h4" className="font-bold text-white">{item.title}</Typography>
                        <Typography variant="small" className="leading-relaxed text-slate-400">{item.desc}</Typography>
                      </div>
                    </div>
                  ))}
                </Stack>

                <Grid cols={3} gap={4} className="border-t border-white/10 pt-8">
                  <Stack direction="vertical" gap={2}>
                    <Shield className="h-5 w-5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      ISO 27001
                      <br />
                      Ready
                    </span>
                  </Stack>
                  <Stack direction="vertical" gap={2}>
                    <Lock className="h-5 w-5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      TLS 1.3
                      <br />
                      Encrypted
                    </span>
                  </Stack>
                  <Stack direction="vertical" gap={2}>
                    <FileCheck className="h-5 w-5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      NDA
                      <br />
                      Available
                    </span>
                  </Stack>
                </Grid>
              </motion.div>
            </Stack>

            {/* Right: Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl md:p-10"
              >
                <div className="mb-8">
                  <Typography variant="h3" as="h3">Jadwalkan Sesi</Typography>
                  <Typography variant="small" className="text-slate-400">Isi detail di bawah untuk terhubung langsung dengan expert kami.</Typography>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <Grid cols={2} gap={6}>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      label="Nama Lengkap"
                      placeholder="John Doe"
                      error={errors.fullName}
                      className="focus:!border-primary-500 !border-white/10 !bg-black/40 !text-white placeholder:!text-slate-600"
                      labelClassName="text-slate-300"
                    />
                    <Input
                      id="workEmail"
                      name="workEmail"
                      required
                      type="email"
                      label="Email Kantor"
                      placeholder="john@company.com"
                      helperText="Gunakan email korporat untuk prioritas."
                      error={errors.workEmail}
                      className="focus:!border-primary-500 !border-white/10 !bg-black/40 !text-white placeholder:!text-slate-600"
                      labelClassName="text-slate-300"
                    />
                  </Grid>

                  <Input
                    id="companyName"
                    name="companyName"
                    required
                    label="Nama Perusahaan"
                    error={errors.companyName}
                    className="focus:!border-primary-500 !border-white/10 !bg-black/40 !text-white"
                    labelClassName="text-slate-300"
                  />

                  <Grid cols={2} gap={6}>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      required
                      type="tel"
                      label="WhatsApp"
                      placeholder="+62..."
                      helperText="Kami akan mengirimkan konfirmasi jadwal via WA."
                      error={errors.whatsapp}
                      className="focus:!border-primary-500 !border-white/10 !bg-black/40 !text-white placeholder:!text-slate-600"
                      labelClassName="text-slate-300"
                    />
                    <Select
                      id="employeeCount"
                      name="employeeCount"
                      label="Jumlah Karyawan"
                      className="focus:!border-primary-500 !border-white/10 !bg-black/40 !text-white"
                      labelClassName="text-slate-300"
                      options={[
                        { value: '<50', label: '< 50 Karyawan' },
                        { value: '50-200', label: '50 - 200 Karyawan' },
                        { value: '200-1000', label: '200 - 1000 Karyawan' },
                        { value: '>1000', label: '> 1000 Karyawan' },
                      ]}
                    />
                  </Grid>

                  <Select
                    id="industry"
                    name="industry"
                    label="Industri Utama"
                    helperText="Membantu kami menyiapkan demo case study yang relevan."
                    className="focus:!border-primary-500 !border-white/10 !bg-black/40 !text-white"
                    labelClassName="text-slate-300"
                    options={[
                      { value: 'Construction', label: 'Konstruksi / Kontraktor' },
                      { value: 'Professional Services', label: 'Jasa Profesional / Outsourcing' },
                      { value: 'Retail', label: 'Retail / Distribusi' },
                      { value: 'Manufacturing', label: 'Manufaktur' },
                      { value: 'Healthcare', label: 'Healthcare / Rumah Sakit' },
                      { value: 'Education', label: 'Education / Sekolah' },
                      { value: 'Others', label: 'Lainnya' },
                    ]}
                  />

                  <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <span className="mb-4 block flex items-center gap-2 text-sm font-bold text-white">
                      <Zap className="h-4 w-4 text-amber-400" />
                      {' '}
                      Kebutuhan Utama
                    </span>
                    <Grid cols={1} gap={4}>
                      <Checkbox label="Integrasi HR & Payroll" name="feature_hr" labelClassName="text-slate-300 group-hover:text-white" />
                      <Checkbox label="Kontrol Proyek & Biaya" name="feature_project" labelClassName="text-slate-300 group-hover:text-white" />
                      <Checkbox label="Manajemen Inventori" name="feature_inv" labelClassName="text-slate-300 group-hover:text-white" />
                      <Checkbox label="Sales & CRM" name="feature_crm" labelClassName="text-slate-300 group-hover:text-white" />
                      <Checkbox label="Finance & Accounting" name="feature_finance" labelClassName="text-slate-300 group-hover:text-white" />
                      <Checkbox label="Minat Partner / OEM" name="feature_partner" labelClassName="text-slate-300 group-hover:text-white" />
                    </Grid>
                  </div>

                  <div className="pt-2">
                    <Checkbox
                      name="consent"
                      label={(
                        <span className="text-sm text-slate-400">
                          Saya menyetujui
                          {' '}
                          <Link href="/legal/privacy" className="text-primary-400 hover:text-primary-300 font-medium" target="_blank">Kebijakan Privasi</Link>
                          {' '}
                          dan mengizinkan BizOps menghubungi saya.
                        </span>
                      )}
                      required
                    />
                    {errors.consent && (
                      <Typography variant="body">
                        <Shield className="h-3 w-3" />
                        {' '}
                        {errors.consent}
                      </Typography>
                    )}
                  </div>

                  <Button
                    size="md"
                    type="submit"
                    fullWidth
                    variant="primary"
                    className="shadow-primary-500/20 bg-primary-600 hover:bg-primary-500 h-14 rounded-xl text-lg font-bold text-white shadow-xl"
                    isLoading={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? 'Memproses...' : 'Reservasi Sesi via WhatsApp'}
                  </Button>
                </form>
              </motion.div>
            </div>

          </Grid>
        </Container>
      </div>
    </div>
  );
}
