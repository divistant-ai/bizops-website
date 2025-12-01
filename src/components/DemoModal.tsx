'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Building2, CheckCircle, MessageSquare, Send, Shield, Users, Video, X } from 'lucide-react';
import React, { useState } from 'react';
import { Input, Select, TextArea } from './Form';
import Button from './ui/Button';
import OptimizedImage from './ui/OptimizedImage'; // Imported OptimizedImage

type DemoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('modalName') as HTMLInputElement).value;
    const email = (form.elements.namedItem('modalEmail') as HTMLInputElement).value;
    const phoneInput = (form.elements.namedItem('modalPhone') as HTMLInputElement).value;
    const company = (form.elements.namedItem('modalCompany') as HTMLInputElement).value;
    const employees = (form.elements.namedItem('modalEmployees') as HTMLSelectElement).value;
    const jobTitle = (form.elements.namedItem('modalJobTitle') as HTMLInputElement).value;
    const interest = (form.elements.namedItem('modalInterest') as HTMLSelectElement).value;
    const message = (form.elements.namedItem('modalMessage') as HTMLTextAreaElement).value;

    const salesPhone = '622139702834'; // Sales Number

    // Construct a professional WhatsApp message
    const text = `*New Demo Request*\n\n`
      + `Halo Tim BizOps, saya ingin menjadwalkan demo produk.\n\n`
      + `*Detail Kontak:*\n`
      + `Nama: ${name}\n`
      + `Jabatan: ${jobTitle}\n`
      + `Perusahaan: ${company}\n`
      + `Email: ${email}\n`
      + `No HP: ${phoneInput}\n\n`
      + `*Profil Bisnis:*\n`
      + `Ukuran: ${employees} karyawan\n`
      + `Minat: ${interest}\n\n`
      + `*Catatan:*\n${message || '-'}\n\n`
      + `Mohon info ketersediaan jadwal. Terima kasih.`;

    const url = `https://wa.me/${salesPhone}?text=${encodeURIComponent(text)}`;

    // Simulate API call/Tracking then redirect
    setTimeout(() => {
      window.open(url, '_blank');
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:max-h-[800px] md:flex-row dark:border-slate-800 dark:bg-slate-950"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/50 p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:bg-black/20 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* LEFT: INFO SIDEBAR */}
            <div className="flex hidden flex-col justify-between overflow-y-auto border-r border-slate-100 bg-slate-50 p-8 md:flex md:w-4/12 dark:border-slate-800 dark:bg-slate-900/50">
              <div>
                <div className="mb-8">
                  <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold tracking-wider text-blue-700 uppercase dark:bg-blue-900/30 dark:text-blue-300">
                    <Video className="h-3 w-3" />
                    {' '}
                    Live Session
                  </span>
                  <h2 className="mb-2 text-2xl leading-tight font-bold text-slate-900 dark:text-white">
                    Experience the Future of ERP
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Lihat bagaimana BizOps dapat mengotomatisasi proses bisnis Anda dalam sesi demo privat.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-green-500 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Tailored Walkthrough</h4>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Demo disesuaikan dengan alur kerja spesifik industri Anda, bukan sekadar overview umum.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-blue-500 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">Expert Consultation</h4>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Diskusi teknis langsung dengan Solution Architect senior kami.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-purple-500 shadow-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">No Commitment</h4>
                      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">Eksplorasi fitur tanpa tekanan. Kami fokus pada solusi, bukan hard-selling.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                <div className="mb-3 flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-50 bg-slate-200 dark:border-slate-900">
                      <OptimizedImage
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        className="h-full w-full rounded-full"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-50 bg-slate-100 text-[10px] font-bold text-slate-500 dark:border-slate-900 dark:bg-slate-800">
                    +2k
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Bergabung dengan 2,000+ perusahaan yang telah modernisasi bisnis mereka.
                </p>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="overflow-y-auto bg-white p-6 md:w-8/12 md:p-8 dark:bg-slate-950">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Book Your Demo Slot</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Isi detail di bawah untuk terhubung langsung via WhatsApp.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    id="modalName"
                    name="modalName"
                    required
                    label="Full Name"
                    placeholder="John Doe"
                    className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  />
                  <Input
                    id="modalJobTitle"
                    name="modalJobTitle"
                    required
                    label="Job Title"
                    placeholder="Ex: CEO, HR Manager"
                    className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    id="modalEmail"
                    name="modalEmail"
                    type="email"
                    required
                    label="Work Email"
                    placeholder="name@company.com"
                    className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  />
                  <Input
                    id="modalPhone"
                    name="modalPhone"
                    type="tel"
                    required
                    label="Phone / WhatsApp"
                    placeholder="+62 812..."
                    className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    id="modalCompany"
                    name="modalCompany"
                    required
                    label="Company Name"
                    placeholder="Acme Corp"
                    icon={<Building2 className="h-5 w-5" />}
                    className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  />
                  <Select
                    id="modalEmployees"
                    name="modalEmployees"
                    label="Company Size"
                    required
                    icon={<Users className="h-5 w-5" />}
                    className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                    options={[
                      { value: '1-10', label: '1 - 10 Employees' },
                      { value: '11-50', label: '11 - 50 Employees' },
                      { value: '51-200', label: '51 - 200 Employees' },
                      { value: '201-500', label: '201 - 500 Employees' },
                      { value: '501-1000', label: '501 - 1000 Employees' },
                      { value: '1000+', label: '1000+ Employees' },
                    ]}
                  />
                </div>

                <Select
                  id="modalInterest"
                  name="modalInterest"
                  label="I am interested in..."
                  required
                  className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                  options={[
                    { value: 'General Overview', label: 'General Platform Overview' },
                    { value: 'HR & Payroll', label: 'HR & Payroll Module' },
                    { value: 'Finance & Accounting', label: 'Finance & Accounting' },
                    { value: 'Supply Chain', label: 'Supply Chain & Operations' },
                    { value: 'CRM & Sales', label: 'CRM & Sales Pipeline' },
                    { value: 'Custom Solution', label: 'Custom Solution Discussion' },
                  ]}
                />

                <TextArea
                  id="modalMessage"
                  name="modalMessage"
                  label="Additional Requirements (Optional)"
                  placeholder="Ceritakan sedikit tentang tantangan bisnis Anda saat ini..."
                  rows={2}
                  className="resize-none border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900"
                />

                <div className="pt-2">
                  <Button fullWidth size="lg" type="submit" disabled={isLoading} className="h-12 border-none bg-green-600 text-base text-white shadow-lg shadow-green-500/20 hover:bg-green-700">
                    {isLoading
                      ? 'Redirecting...'
                      : (
                          <span className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            {' '}
                            Request Demo via WhatsApp
                          </span>
                        )}
                  </Button>
                  <p className="mt-3 text-center text-[10px] text-slate-400">
                    Data Anda aman dan diproses sesuai Kebijakan Privasi BizOps.
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
