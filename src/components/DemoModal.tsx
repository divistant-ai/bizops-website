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
            className="border-border bg-background relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border shadow-2xl md:max-h-[800px] md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground absolute top-4 right-4 z-10 rounded-full p-2 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* LEFT: INFO SIDEBAR */}
            <div className="border-border bg-muted/30 flex hidden flex-col justify-between overflow-y-auto border-r p-8 md:flex md:w-4/12">
              <div>
                <div className="mb-8">
                  <span className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold tracking-wider uppercase">
                    <Video className="h-3 w-3" />
                    {' '}
                    Live Session
                  </span>
                  <h2 className="text-foreground mb-2 text-2xl leading-tight font-bold">
                    Experience the Future of ERP
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Lihat bagaimana BizOps dapat mengotomatisasi proses bisnis Anda dalam sesi demo privat.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-background ring-border flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-green-500 shadow-sm ring-1">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 text-sm font-bold">Tailored Walkthrough</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">Demo disesuaikan dengan alur kerja spesifik industri Anda, bukan sekadar overview umum.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-background ring-border flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-blue-500 shadow-sm ring-1">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 text-sm font-bold">Expert Consultation</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">Diskusi teknis langsung dengan Solution Architect senior kami.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-background ring-border flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-purple-500 shadow-sm ring-1">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-foreground mb-1 text-sm font-bold">No Commitment</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">Eksplorasi fitur tanpa tekanan. Kami fokus pada solusi, bukan hard-selling.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-border mt-8 border-t pt-6">
                <div className="mb-3 flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="border-background bg-muted h-8 w-8 rounded-full border-2">
                      <OptimizedImage
                        src={`https://i.pravatar.cc/100?img=${i + 10}`}
                        alt="User"
                        className="h-full w-full rounded-full"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                  <div className="border-background bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold">
                    +2k
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">
                  Bergabung dengan 2,000+ perusahaan yang telah modernisasi bisnis mereka.
                </p>
              </div>
            </div>

            {/* RIGHT: FORM */}
            <div className="bg-background overflow-y-auto p-6 md:w-8/12 md:p-8">
              <div className="mb-6">
                <h3 className="text-foreground text-xl font-bold">Book Your Demo Slot</h3>
                <p className="text-muted-foreground text-sm">Isi detail di bawah untuk terhubung langsung via WhatsApp.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Input
                    id="modalName"
                    name="modalName"
                    required
                    label="Full Name"
                    placeholder="John Doe"
                  />
                  <Input
                    id="modalJobTitle"
                    name="modalJobTitle"
                    required
                    label="Job Title"
                    placeholder="Ex: CEO, HR Manager"
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
                  />
                  <Input
                    id="modalPhone"
                    name="modalPhone"
                    type="tel"
                    required
                    label="Phone / WhatsApp"
                    placeholder="+62 812..."
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
                  />
                  <Select
                    id="modalEmployees"
                    name="modalEmployees"
                    label="Company Size"
                    required
                    icon={<Users className="h-5 w-5" />}
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
                  className="resize-none"
                />

                <div className="pt-2">
                  <Button fullWidth size="lg" type="submit" disabled={isLoading} className="h-12">
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
                  <p className="text-muted-foreground mt-3 text-center text-[10px]">
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
