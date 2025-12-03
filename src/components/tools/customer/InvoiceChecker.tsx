'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertTriangle, CheckCircle2, FileCheck, Info, Loader2, TrendingUp, XCircle } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type CheckItem = {
  id: string;
  label: string;
  status: 'valid' | 'invalid' | 'warning' | 'unchecked';
  message?: string;
};

type ValidationResult = {
  score: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
  items: CheckItem[];
};

export default function InvoiceChecker() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [vendorTax, setVendorTax] = useState('');
  const [amount, setAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const validateInvoice = () => {
    setErrors([]);
    setIsCalculating(true);

    setTimeout(() => {
      const calculatedResult = safeCalculate<ValidationResult>(() => {
        const checks: CheckItem[] = [];

        // Check invoice number
        if (invoiceNumber.trim()) {
          checks.push({
            id: 'invoice-number',
            label: 'Nomor Invoice',
            status: invoiceNumber.length >= 5 ? 'valid' : 'warning',
            message: invoiceNumber.length >= 5 ? 'Format valid' : 'Nomor terlalu pendek',
          });
        } else {
          checks.push({
            id: 'invoice-number',
            label: 'Nomor Invoice',
            status: 'invalid',
            message: 'Wajib diisi',
          });
        }

        // Check dates
        if (invoiceDate && dueDate) {
          const invDate = new Date(invoiceDate);
          const due = new Date(dueDate);
          const isValid = due >= invDate;
          checks.push({
            id: 'dates',
            label: 'Tanggal Invoice & Due Date',
            status: isValid ? 'valid' : 'invalid',
            message: isValid ? 'Tanggal valid' : 'Due date harus setelah tanggal invoice',
          });
        } else {
          checks.push({
            id: 'dates',
            label: 'Tanggal Invoice & Due Date',
            status: 'invalid',
            message: 'Tanggal wajib diisi',
          });
        }

        // Check vendor name
        if (vendorName.trim()) {
          checks.push({
            id: 'vendor-name',
            label: 'Nama Vendor',
            status: 'valid',
            message: 'Terisi',
          });
        } else {
          checks.push({
            id: 'vendor-name',
            label: 'Nama Vendor',
            status: 'invalid',
            message: 'Wajib diisi',
          });
        }

        // Check vendor tax (NPWP format: 15 digits)
        if (vendorTax.trim()) {
          const cleanTax = vendorTax.replace(/\D/g, '');
          checks.push({
            id: 'vendor-tax',
            label: 'NPWP Vendor',
            status: cleanTax.length === 15 ? 'valid' : 'warning',
            message: cleanTax.length === 15 ? 'Format NPWP valid (15 digit)' : 'NPWP harus 15 digit',
          });
        } else {
          checks.push({
            id: 'vendor-tax',
            label: 'NPWP Vendor',
            status: 'warning',
            message: 'Sebaiknya diisi untuk PKP',
          });
        }

        // Check amount
        const amountValue = Number.parseFloat(amount) || 0;
        if (amountValue > 0) {
          checks.push({
            id: 'amount',
            label: 'Jumlah Invoice',
            status: 'valid',
            message: `Rp ${amountValue.toLocaleString('id-ID')}`,
          });
        } else {
          checks.push({
            id: 'amount',
            label: 'Jumlah Invoice',
            status: 'invalid',
            message: 'Jumlah harus lebih dari 0',
          });
        }

        // Check tax amount (PPN 11%)
        const taxValue = Number.parseFloat(taxAmount) || 0;
        const expectedTax = amountValue * 0.11;
        const taxDiff = Math.abs(taxValue - expectedTax);
        const taxTolerance = expectedTax * 0.01; // 1% tolerance

        if (taxValue > 0) {
          checks.push({
            id: 'tax-amount',
            label: 'PPN (11%)',
            status: taxDiff <= taxTolerance ? 'valid' : 'warning',
            message:
              taxDiff <= taxTolerance
                ? `PPN sesuai: Rp ${taxValue.toLocaleString('id-ID')}`
                : `PPN mungkin tidak sesuai. Expected: Rp ${expectedTax.toLocaleString('id-ID')}`,
          });
        } else {
          checks.push({
            id: 'tax-amount',
            label: 'PPN (11%)',
            status: 'warning',
            message: 'PPN tidak terisi (jika PKP, harus ada PPN)',
          });
        }

        const passedChecks = checks.filter(c => c.status === 'valid').length;
        const failedChecks = checks.filter(c => c.status === 'invalid').length;
        const warningChecks = checks.filter(c => c.status === 'warning').length;
        const totalChecks = checks.length;
        const score = Math.round((passedChecks / totalChecks) * 100);

        return {
          score,
          totalChecks,
          passedChecks,
          failedChecks,
          warningChecks,
          items: checks,
        };
      }, (error) => {
        setErrors([error]);
      });

      if (calculatedResult) {
        setResult(calculatedResult);
      }

      setIsCalculating(false);
    }, 100);
  };

  const handleDownload = () => {
    if (!result) {
      return;
    }

    const content = formatResultAsText(
      'Invoice Validation Report',
      {
        'Nomor Invoice': invoiceNumber,
        'Tanggal Invoice': invoiceDate,
        'Due Date': dueDate,
        'Vendor': vendorName,
        'NPWP': vendorTax || '-',
        'Jumlah': `Rp ${Number.parseFloat(amount).toLocaleString('id-ID')}`,
        'PPN': taxAmount ? `Rp ${Number.parseFloat(taxAmount).toLocaleString('id-ID')}` : '-',
      },
      {
        'Validation Score': `${result.score}%`,
        'Passed Checks': `${result.passedChecks}/${result.totalChecks}`,
        'Failed Checks': result.failedChecks.toString(),
        'Warnings': result.warningChecks.toString(),
      },
    );

    downloadAsText(content, `invoice-validation-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Invoice Checker',
      `Validation Score: ${result.score}% (${result.passedChecks}/${result.totalChecks} checks passed)`,
    );

    await shareResult('Hasil Invoice Validation', shareText);
  };

  const getStatusIcon = (status: CheckItem['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'invalid':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) {
      return 'from-green-600 to-emerald-600';
    }
    if (score >= 60) {
      return 'from-yellow-600 to-orange-600';
    }
    return 'from-red-600 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700">
            <FileCheck className="h-4 w-4" />
            Customer Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            Invoice Checker & Validator
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Validasi kelengkapan dan keakuratan invoice sebelum diproses. Hindari kesalahan pembayaran!
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Data Invoice</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="invoice-number" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nomor Invoice
                  </label>
                  <input
                    id="invoice-number"
                    type="text"
                    value={invoiceNumber}
                    onChange={e => setInvoiceNumber(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="INV-2024-001"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="invoice-date" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Tanggal Invoice
                    </label>
                    <input
                      id="invoice-date"
                      type="date"
                      value={invoiceDate}
                      onChange={e => setInvoiceDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="due-date" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Due Date
                    </label>
                    <input
                      id="due-date"
                      type="date"
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="vendor-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nama Vendor
                  </label>
                  <input
                    id="vendor-name"
                    type="text"
                    value={vendorName}
                    onChange={e => setVendorName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="PT. Vendor Name"
                  />
                </div>

                <div>
                  <label htmlFor="vendor-tax" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    NPWP Vendor (opsional)
                  </label>
                  <input
                    id="vendor-tax"
                    type="text"
                    value={vendorTax}
                    onChange={e => setVendorTax(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="12.345.678.9-012.345"
                  />
                </div>

                <div>
                  <label htmlFor="amount" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Jumlah Invoice (DPP)
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setAmount(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="10000000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="tax-amount" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    PPN 11% (opsional)
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="tax-amount"
                      type="text"
                      value={taxAmount}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setTaxAmount(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="1100000"
                    />
                  </div>
                  {amount && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                      Expected PPN: Rp
                      {' '}
                      {((Number.parseFloat(amount) || 0) * 0.11).toLocaleString('id-ID')}
                    </p>
                  )}
                </div>

                <Button
                  onClick={validateInvoice}
                  className="w-full bg-cyan-600 hover:bg-cyan-700"
                  size="lg"
                  disabled={isCalculating}
                  aria-label="Validasi invoice"
                >
                  {isCalculating
                    ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Memvalidasi...
                        </>
                      )
                    : (
                        <>
                          <FileCheck className="mr-2 h-5 w-5" />
                          Validasi Invoice
                        </>
                      )}
                </Button>
              </div>
            </Card>

            <Card className="border-l-4 border-cyan-500 bg-cyan-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-cyan-600" />
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <p className="mb-1 font-semibold">Yang Dicek:</p>
                  <ul className="list-inside list-disc space-y-0.5">
                    <li>Kelengkapan data wajib</li>
                    <li>Format NPWP (15 digit)</li>
                    <li>Validitas tanggal</li>
                    <li>Perhitungan PPN (11%)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil validasi invoice">
                    <Card className={`bg-gradient-to-br ${getScoreColor(result.score)} p-6 text-white`}>
                      <h3 className="mb-4 text-lg font-semibold">Validation Score</h3>
                      <div className="mb-4 text-center">
                        <p className="text-6xl font-bold">
                          {result.score}
                          %
                        </p>
                        <p className="mt-2 text-sm opacity-90">
                          {result.passedChecks}
                          {' '}
                          dari
                          {result.totalChecks}
                          {' '}
                          checks passed
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-4 text-center text-sm">
                        <div>
                          <p className="opacity-80">Passed</p>
                          <p className="text-lg font-bold">{result.passedChecks}</p>
                        </div>
                        <div>
                          <p className="opacity-80">Failed</p>
                          <p className="text-lg font-bold">{result.failedChecks}</p>
                        </div>
                        <div>
                          <p className="opacity-80">Warnings</p>
                          <p className="text-lg font-bold">{result.warningChecks}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Detail Validation</h3>

                      <div className="space-y-3">
                        {result.items.map(item => (
                          <div
                            key={item.id}
                            className={`flex items-start gap-3 rounded-lg border p-3 ${
                              item.status === 'valid'
                                ? 'border-green-200 bg-green-50'
                                : item.status === 'invalid'
                                  ? 'border-red-200 bg-red-50'
                                  : 'border-yellow-200 bg-yellow-50'
                            }`}
                          >
                            {getStatusIcon(item.status)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">{item.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <ActionButtons
                        onDownload={handleDownload}
                        onShare={handleShare}
                        disabled={!result}
                        className="mt-6"
                      />
                    </Card>

                    {result.failedChecks > 0 && (
                      <Card className="border-l-4 border-red-500 bg-red-50 p-4">
                        <div className="flex gap-2">
                          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-red-600" />
                          <div className="text-sm text-slate-700 dark:text-slate-300">
                            <p className="font-semibold">Action Required:</p>
                            <p>
                              Perbaiki
                              {result.failedChecks}
                              {' '}
                              item yang failed sebelum memproses invoice.
                            </p>
                          </div>
                        </div>
                      </Card>
                    )}
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <FileCheck className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Masukkan data invoice dan klik tombol validasi
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-cyan-100 p-3">
                <TrendingUp className="h-6 w-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  Otomasi Invoice Processing & Validation
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  Cek invoice manual satu per satu? BizOps otomatis validasi ratusan invoice,
                  deteksi anomali, dan approve/reject berdasarkan rules yang Anda set.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo AP Automation
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-cyan-500 bg-cyan-50 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-cyan-600" />
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Tips Invoice Management:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Selalu validasi NPWP untuk vendor PKP</li>
                <li>Pastikan PPN 11% dihitung dengan benar</li>
                <li>Cek due date untuk menghindari late payment penalty</li>
                <li>Simpan bukti invoice dan tanda terima pembayaran</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
