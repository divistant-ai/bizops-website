'use client';

import { Globe, ShoppingBag, Truck } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui';

const PortalsContent: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-slate-900 py-24 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-6 inline-flex rounded-2xl bg-slate-800 p-3">
            <Globe className="text-primary-400 h-8 w-8" />
          </div>
          <h1 className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            Berhenti Menjadi Admin
            <br />
            untuk Klien Anda.
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-slate-300">
            Bebaskan tim CS, Sales Admin, dan Purchasing Anda dari pertanyaan berulang via
            WhatsApp. Berikan akses portal mandiri 24/7 kepada mitra bisnis Anda untuk melihat data
            yang mereka butuhkan sendiri.
          </p>
        </div>
      </section>

      {/* Portal Types */}
      <section className="bg-white py-24 transition-colors dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Customer Portal */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="bg-blue-600 p-8 text-white">
                <ShoppingBag className="mb-4 h-10 w-10" />
                <h3 className="text-2xl font-bold">B2B Customer Portal</h3>
              </div>
              <div className="p-8">
                <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                  Memberikan pengalaman layaknya e-commerce B2B kepada klien Anda.
                </p>
                <ul className="mb-8 space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Melihat katalog produk dengan harga khusus kontrak.
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Menginput order pembelian (Sales Order) mandiri.
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    Download ulang Invoice PDF & lacak status pengiriman.
                  </li>
                </ul>
                <Button variant="outline" fullWidth>
                  Lihat Demo Customer Portal
                </Button>
              </div>
            </div>

            {/* Vendor Portal */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="bg-amber-600 p-8 text-white">
                <Truck className="mb-4 h-10 w-10" />
                <h3 className="text-2xl font-bold">Supplier / Vendor Portal</h3>
              </div>
              <div className="p-8">
                <p className="mb-6 leading-relaxed text-slate-600 dark:text-slate-400">
                  Mendigitalisasi interaksi dengan supplier untuk transparansi pengadaan.
                </p>
                <ul className="mb-8 space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                    Melihat daftar RFQ (Request for Quotation) terbuka.
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                    Mengunggah penawaran harga (Bidding) secara kompetitif.
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                    Cek status pembayaran tagihan tanpa menelepon Finance.
                  </li>
                </ul>
                <Button variant="outline" fullWidth>
                  Lihat Demo Vendor Portal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortalsContent;
