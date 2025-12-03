'use client';

'use client';

import { Clock, Mail, MapPin, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';

export default function ContactContent() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <Section className="bg-slate-900 pt-32 pb-20 text-white">
        <Container size="4xl" className="text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Hubungi Kami</h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-300 dark:text-slate-400">
            Kami siap berdiskusi tentang kebutuhan transformasi digital bisnis Anda.
            Tanpa komitmen, tanpa bahasa teknis yang membingungkan.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <FadeIn className="space-y-8 lg:col-span-1">
              <div>
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Sales & Enterprise</h3>
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Email Pertanyaan Sales</p>
                    <a href="mailto:sales@bizops.id" className="hover:text-primary-600 dark:hover:text-primary-400 text-lg font-medium text-slate-900 dark:text-white">sales@bizops.id</a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Technical Support</h3>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Bantuan Pengguna Existing</p>
                    <a href="mailto:support@bizops.id" className="hover:text-primary-600 dark:hover:text-primary-400 text-lg font-medium text-slate-900 dark:text-white">support@bizops.id</a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">Office HQ</h3>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">Jakarta Selatan</p>
                    <p className="leading-relaxed text-slate-800 dark:text-slate-300">
                      Menara Standard Chartered, Lt. 30
                      <br />
                      Jl. Prof. Dr. Satrio No. 164
                      <br />
                      Jakarta 12930, Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-8 dark:border-slate-700">
                <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium tracking-wider uppercase">Jam Operasional</span>
                </div>
                <p className="text-slate-800 dark:text-slate-300">Senin - Jumat: 09:00 - 17:00 WIB</p>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.2} className="lg:col-span-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl md:p-10 dark:border-slate-800 dark:bg-slate-900">
                <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Kirim Pesan</h2>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                      <input
                        type="text"
                        id="name"
                        className="focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email Bisnis</label>
                      <input
                        type="email"
                        id="email"
                        className="focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama Perusahaan</label>
                    <input
                      type="text"
                      id="company"
                      className="focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="PT Maju Mundur"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Topik</label>
                    <select id="interest" className="focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                      <option>Permintaan Demo Produk</option>
                      <option>Tanya Harga / Quotation</option>
                      <option>Konsultasi Teknis</option>
                      <option>Kemitraan / Partnership</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pesan Anda</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="focus:ring-primary-500 dark:focus:ring-primary-400 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      placeholder="Ceritakan kebutuhan bisnis Anda..."
                    >
                    </textarea>
                  </div>

                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700 w-full rounded-xl text-white">
                    Kirim Pesan
                  </Button>
                  <p className="text-center text-xs text-slate-500">
                    Dengan mengirimkan form ini, Anda menyetujui
                    {' '}
                    <Link href="/legal/privacy" className="text-primary-600 hover:underline">Kebijakan Privasi</Link>
                    {' '}
                    kami.
                  </p>
                </form>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>
    </div>
  );
}
