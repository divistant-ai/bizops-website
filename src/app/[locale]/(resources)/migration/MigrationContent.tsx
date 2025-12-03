'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  Cloud,
  CreditCard,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Headphones,
  Layers,
  Server,
  ShoppingCart,
  Table,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Container, Section } from '@/components/layout';
import { Button, CardSlider, Grid, Typography } from '@/components/ui';
import { migrationData } from '@/data/resourcesContent';
import { migrationFaqs } from '@/data/supportContent';

// Sample Structures Data
const sampleStructures = [
  {
    id: '1-coa',
    label: '1. Chart of Accounts',
    icon: FileText,
    desc: 'Pondasi sistem keuangan. Daftar akun GL untuk pelaporan.',
    columns: [
      { name: 'Code', req: true, desc: 'Kode akun unik (e.g. 110100)' },
      { name: 'Name', req: true, desc: 'Nama akun (e.g. Bank BCA IDR)' },
      { name: 'Type', req: true, desc: 'Asset, Liability, Equity, Income, Expense' },
      { name: 'Currency', req: false, desc: 'Mata uang (IDR/USD). Kosong = Company Default' },
      { name: 'Parent Account', req: false, desc: 'Kode akun induk untuk hierarki pelaporan' },
      { name: 'Allow Reconciliation', req: false, desc: 'TRUE/FALSE (Penting untuk Bank/Piutang)' },
    ],
  },
  {
    id: '2-partners',
    label: '2. Contacts (Partners)',
    icon: Users,
    desc: 'Database terpusat untuk Customer, Vendor, dan Partner.',
    columns: [
      { name: 'Name', req: true, desc: 'Nama Perusahaan atau Perorangan' },
      { name: 'Is Company', req: true, desc: 'TRUE (PT/CV) atau FALSE (Perorangan)' },
      { name: 'Type', req: true, desc: 'Customer, Vendor, atau Both' },
      { name: 'Tax ID (NPWP)', req: false, desc: 'Nomor NPWP 15/16 digit' },
      { name: 'Email', req: false, desc: 'Email untuk pengiriman invoice' },
      { name: 'Phone', req: true, desc: 'Nomor telepon aktif' },
      { name: 'Street Address', req: false, desc: 'Alamat lengkap' },
      { name: 'City', req: false, desc: 'Kota domisili' },
      { name: 'Payment Terms', req: false, desc: 'Termin pembayaran (e.g. Net 30)' },
    ],
  },
  {
    id: '3-products',
    label: '3. Products & Services',
    icon: ShoppingCart,
    desc: 'Master data barang jual, bahan baku, dan jasa.',
    columns: [
      { name: 'Internal Reference', req: true, desc: 'SKU / Kode unik internal' },
      { name: 'Name', req: true, desc: 'Nama produk lengkap' },
      { name: 'Product Type', req: true, desc: 'Storable (Stok), Service (Jasa), Consumable' },
      { name: 'Category', req: true, desc: 'Kategori produk untuk akuntansi' },
      { name: 'Sales Price', req: true, desc: 'Harga jual dasar' },
      { name: 'Cost', req: false, desc: 'Harga pokok (untuk metode Standard Cost)' },
      { name: 'Unit of Measure', req: true, desc: 'Satuan utama (Pcs, Kg, Liter)' },
      { name: 'Barcode', req: false, desc: 'EAN13 / UPC Code' },
    ],
  },
  {
    id: '4-hr',
    label: '4. HR: Employees',
    icon: Briefcase,
    desc: 'Data karyawan untuk struktur organisasi dan akses user.',
    columns: [
      { name: 'Name', req: true, desc: 'Nama lengkap karyawan' },
      { name: 'Work Email', req: true, desc: 'Email kantor (akan jadi username)' },
      { name: 'Department', req: true, desc: 'Departemen (e.g. Sales, IT)' },
      { name: 'Job Position', req: true, desc: 'Jabatan resmi' },
      { name: 'Manager Email', req: false, desc: 'Email atasan langsung (untuk approval)' },
      { name: 'Mobile', req: false, desc: 'Nomor HP karyawan' },
      { name: 'Join Date', req: false, desc: 'Tanggal bergabung (YYYY-MM-DD)' },
    ],
  },
  {
    id: '5-assets',
    label: '5. Fixed Assets',
    icon: Building2,
    desc: 'Daftar aset tetap untuk perhitungan penyusutan otomatis.',
    columns: [
      { name: 'Asset Name', req: true, desc: 'Nama aset (e.g. Laptop MacBook Pro)' },
      { name: 'Category', req: true, desc: 'Kategori aset (e.g. Elektronik)' },
      { name: 'Acquisition Date', req: true, desc: 'Tanggal pembelian (YYYY-MM-DD)' },
      { name: 'Gross Value', req: true, desc: 'Harga perolehan awal' },
      { name: 'Depreciation Method', req: true, desc: 'Linear / Degressive' },
      { name: 'Duration', req: true, desc: 'Masa manfaat (Bulan)' },
      { name: 'Salvage Value', req: false, desc: 'Nilai sisa di akhir masa manfaat' },
    ],
  },
  {
    id: '6-inv-balance',
    label: '6. Cut-off: Inventory',
    icon: Layers,
    desc: 'Saldo awal stok fisik per tanggal cut-off migrasi.',
    columns: [
      { name: 'Product SKU', req: true, desc: 'Harus sesuai dengan Master Product' },
      { name: 'Warehouse', req: true, desc: 'Lokasi gudang penyimpanan' },
      { name: 'Quantity', req: true, desc: 'Jumlah fisik hasil stock opname' },
      { name: 'Unit Value', req: true, desc: 'Nilai per unit (HPP) saat ini' },
      { name: 'Lot/Serial Number', req: false, desc: 'Jika produk menggunakan tracking' },
      { name: 'Expiry Date', req: false, desc: 'YYYY-MM-DD (Jika ada)' },
    ],
  },
  {
    id: '7-ar-ap',
    label: '7. Cut-off: AR / AP',
    icon: CreditCard,
    desc: 'Saldo awal Hutang & Piutang yang belum lunas (Outstanding).',
    columns: [
      { name: 'Partner Name', req: true, desc: 'Harus sesuai dengan Master Contact' },
      { name: 'Journal', req: true, desc: 'Customer Invoices (AR) / Vendor Bills (AP)' },
      { name: 'Invoice Number', req: true, desc: 'Nomor referensi faktur lama' },
      { name: 'Invoice Date', req: true, desc: 'Tanggal faktur asli' },
      { name: 'Due Date', req: true, desc: 'Tanggal jatuh tempo' },
      { name: 'Amount in Currency', req: true, desc: 'Total tagihan asli' },
      { name: 'Amount Due', req: true, desc: 'Sisa tagihan yang belum dibayar' },
      { name: 'Currency', req: true, desc: 'Mata uang transaksi' },
    ],
  },
];

const migrationSteps = [
  {
    phase: 'Phase 1',
    title: 'Discovery & Planning',
    duration: '1-2 weeks',
    items: [
      'Audit sistem lama dan identifikasi data critical',
      'Mapping field lama ke struktur BizOps',
      'Tentukan tanggal cut-off dan strategi parallel run',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Data Preparation',
    duration: '2-3 weeks',
    items: [
      'Cleansing data (duplikasi, format, validasi)',
      'Transform ke template BizOps',
      'UAT import di sandbox environment',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Go-Live & Validation',
    duration: '1 week',
    items: [
      'Import final ke production',
      'Validasi saldo dan transaksi',
      'Training user dan hypercare support',
    ],
  },
];

export default function MigrationContent() {
  const [selectedStructure, setSelectedStructure] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getIcon = (id: string) => {
    switch (id) {
      case 'spreadsheet': return FileSpreadsheet;
      case 'saas': return Cloud;
      case 'legacy': return Server;
      default: return FileSpreadsheet;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <Section className="bg-gradient-to-br from-slate-900 to-slate-800 pt-32 pb-20 text-white">
        <Container size="6xl">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium"
            >
              <Database className="h-4 w-4" />
              Migration Center
            </motion.div>
            <Typography variant="h1" as="h1" className="mb-6 text-white">
              Migrasi Data dengan Aman & Efisien
            </Typography>
            <Typography variant="body" className="mx-auto max-w-3xl text-lg text-slate-300">
              Panduan lengkap untuk migrasi data Anda dari sistem lama ke BizOps. Setiap sumber memiliki tantangan unik—kami siap membantu.
            </Typography>
          </div>
        </Container>
      </Section>

      {/* Migration Sources */}
      <Section>
        <Container size="7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Sumber Data Anda</h2>
            <p className="text-slate-600 dark:text-slate-400">Pilih sumber data untuk panduan spesifik</p>
          </div>

          <Grid cols={3} gap={8}>
            {migrationData.map((item) => {
              const Icon = getIcon(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="bg-primary-50 dark:bg-primary-900/20 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                    <Icon className="text-primary-600 dark:text-primary-400 h-8 w-8" />
                  </div>
                  <Typography variant="h3" as="h3" className="mb-2 font-bold">{item.title}</Typography>
                  <Typography variant="body" className="mb-6 text-slate-500 dark:text-slate-400">{item.desc}</Typography>

                  <div className="mb-6 space-y-4">
                    <div className="rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900/20 dark:bg-red-900/10">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <Typography variant="small" className="font-bold text-red-700 dark:text-red-400">Challenge</Typography>
                      </div>
                      <Typography variant="small" className="text-slate-700 dark:text-slate-300">{item.challenge}</Typography>
                    </div>
                    <div className="rounded-xl border border-green-100 bg-green-50 p-4 dark:border-green-900/20 dark:bg-green-900/10">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <Typography variant="small" className="font-bold text-green-700 dark:text-green-400">Solution</Typography>
                      </div>
                      <Typography variant="small" className="text-slate-700 dark:text-slate-300">{item.solution}</Typography>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    {' '}
                    {item.asset}
                  </Button>
                </motion.div>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* Sample Data Structures */}
      <Section className="bg-white dark:bg-slate-900">
        <Container size="7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Template Data Structure</h2>
            <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
              Download template Excel untuk setiap jenis data. Urutan import sangat penting untuk menjaga integritas referensi.
            </p>
          </div>

          {/* Mobile: CardSlider */}
          <div className="md:hidden">
            <CardSlider>
              {sampleStructures.map((structure) => {
                const Icon = structure.icon;
                return (
                  <div key={structure.id} className="w-[320px]">
                    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="bg-primary-100 dark:bg-primary-900/30 flex h-10 w-10 items-center justify-center rounded-lg">
                          <Icon className="text-primary-600 dark:text-primary-400 h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{structure.label}</h3>
                        </div>
                      </div>
                      <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">{structure.desc}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => setSelectedStructure(structure.id)}
                      >
                        <Table className="mr-2 h-3 w-3" />
                        View Columns
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardSlider>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sampleStructures.map((structure) => {
              const Icon = structure.icon;
              return (
                <motion.div
                  key={structure.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950"
                  onClick={() => setSelectedStructure(structure.id)}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-primary-100 dark:bg-primary-900/30 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Icon className="text-primary-600 dark:text-primary-400 h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{structure.label}</h3>
                    </div>
                  </div>
                  <p className="mb-4 text-xs text-slate-600 dark:text-slate-400">{structure.desc}</p>
                  <div className="text-primary-600 dark:text-primary-400 flex items-center text-xs font-medium">
                    <Table className="mr-1 h-3 w-3" />
                    {structure.columns.length}
                    {' '}
                    columns
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Structure Detail Modal */}
          <AnimatePresence>
            {selectedStructure && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={() => setSelectedStructure(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 dark:bg-slate-900"
                  onClick={e => e.stopPropagation()}
                >
                  {(() => {
                    const structure = sampleStructures.find(s => s.id === selectedStructure);
                    if (!structure) {
                      return null;
                    }
                    const Icon = structure.icon;
                    return (
                      <>
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary-100 dark:bg-primary-900/30 flex h-12 w-12 items-center justify-center rounded-xl">
                              <Icon className="text-primary-600 dark:text-primary-400 h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{structure.label}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{structure.desc}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedStructure(null)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="space-y-3">
                          {structure.columns.map((col, idx) => (
                            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
                              <div className="mb-2 flex items-center gap-2">
                                <span className="font-bold text-slate-900 dark:text-white">{col.name}</span>
                                {col.req && (
                                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                    Required
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{col.desc}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex gap-3">
                          <Button className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Download Template
                          </Button>
                          <Button variant="outline" onClick={() => setSelectedStructure(null)}>
                            Close
                          </Button>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

      {/* Migration Timeline */}
      <Section className="bg-slate-50 dark:bg-slate-950">
        <Container size="6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Timeline Migrasi</h2>
            <p className="text-slate-600 dark:text-slate-400">Proses end-to-end biasanya 4-6 minggu</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {migrationSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <div className="bg-primary-600 absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="mb-4">
                    <div className="text-primary-600 dark:text-primary-400 mb-1 text-sm font-medium">{step.phase}</div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <Calendar className="h-4 w-4" />
                      {step.duration}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-white dark:bg-slate-900">
        <Container size="4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {migrationFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <span className="pr-4 font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="from-primary-900 to-primary-800 bg-gradient-to-br text-white">
        <Container size="6xl" className="text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Butuh Bantuan Migrasi?</h2>
          <p className="text-primary-200 mx-auto mb-10 max-w-2xl text-lg">
            Tim implementasi kami siap membantu migrasi data Anda dengan aman dan efisien. Konsultasi gratis untuk assess kompleksitas migrasi Anda.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/demo">
              <Button size="lg" className="text-primary-900 w-full bg-white hover:bg-slate-100 sm:w-auto">
                <Headphones className="mr-2 h-5 w-5" />
                Konsultasi Gratis
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto">
                Contact Migration Team
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
