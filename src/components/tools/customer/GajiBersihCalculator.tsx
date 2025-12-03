'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertCircle, Loader2, PieChart, TrendingUp, Wallet } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate, validateFields, validateNumber } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type SalaryResult = {
  grossSalary: number;
  deductions: {
    pph21: number;
    bpjsKesehatan: number;
    bpjsKetenagakerjaan: number;
    other: number;
    total: number;
  };
  netSalary: number;
  takeHomePercentage: number;
};

export default function GajiBersihCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('10000000');
  const [maritalStatus, setMaritalStatus] = useState<string>('TK0');
  const [includeBPJS, setIncludeBPJS] = useState(true);
  const [otherDeductions, setOtherDeductions] = useState<string>('0');
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateNetSalary = () => {
    setErrors([]);
    setIsCalculating(true);

    const validationErrors = validateFields([
      () => validateNumber(grossSalary, { min: 0, max: 1000000000, fieldName: 'Gaji Bruto' }),
      () => validateNumber(otherDeductions, { min: 0, required: false, fieldName: 'Potongan Lainnya' }),
    ]);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const calculatedResult = safeCalculate<SalaryResult>(() => {
        const gross = Number.parseFloat(grossSalary) || 0;
        const other = Number.parseFloat(otherDeductions) || 0;

        const pph21 = gross > 5000000 ? gross * 0.05 : 0;

        let bpjsKesehatan = 0;
        let bpjsKetenagakerjaan = 0;

        if (includeBPJS) {
          bpjsKesehatan = gross * 0.01;
          bpjsKetenagakerjaan = gross * 0.02;
        }

        const totalDeductions = pph21 + bpjsKesehatan + bpjsKetenagakerjaan + other;
        const netSalary = gross - totalDeductions;
        const takeHomePercentage = gross > 0 ? (netSalary / gross) * 100 : 0;

        return {
          grossSalary: gross,
          deductions: {
            pph21,
            bpjsKesehatan,
            bpjsKetenagakerjaan,
            other,
            total: totalDeductions,
          },
          netSalary,
          takeHomePercentage,
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
      'Kalkulator Gaji Bersih',
      {
        'Gaji Bruto per Bulan': formatCurrency(result.grossSalary),
        'Status PTKP': maritalStatus,
        'Termasuk BPJS': includeBPJS ? 'Ya' : 'Tidak',
        'Potongan Lainnya': formatCurrency(result.deductions.other),
      },
      {
        'Pajak PPh 21': formatCurrency(result.deductions.pph21),
        'BPJS Kesehatan': formatCurrency(result.deductions.bpjsKesehatan),
        'BPJS Ketenagakerjaan': formatCurrency(result.deductions.bpjsKetenagakerjaan),
        'Total Potongan': formatCurrency(result.deductions.total),
        'Gaji Bersih': formatCurrency(result.netSalary),
        'Take Home Percentage': `${result.takeHomePercentage.toFixed(1)}%`,
      },
    );

    downloadAsText(content, `gaji-bersih-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Kalkulator Gaji Bersih',
      `Gaji Bersih: ${formatCurrency(result.netSalary)} (${result.takeHomePercentage.toFixed(1)}% dari gaji bruto)`,
    );

    await shareResult('Hasil Kalkulator Gaji Bersih', shareText);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Wallet className="h-4 w-4" />
            Customer Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            Kalkulator Gaji Bersih (Take Home Pay)
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Hitung berapa gaji bersih yang Anda terima setelah dipotong pajak dan BPJS. Gratis dan akurat!
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Input Data Gaji</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="gross-salary" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Gaji Bruto per Bulan
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                  <input
                    id="gross-salary"
                    type="text"
                    value={grossSalary}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setGrossSalary(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="10000000"
                    aria-describedby="gross-salary-help"
                  />
                </div>
                <p id="gross-salary-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                  {grossSalary && formatCurrency(Number.parseFloat(grossSalary) || 0)}
                </p>
              </div>

              <div>
                <label htmlFor="marital-status" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Status PTKP (untuk PPh 21)
                </label>
                <select
                  id="marital-status"
                  value={maritalStatus}
                  onChange={e => setMaritalStatus(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  aria-label="Pilih status PTKP"
                >
                  <option value="TK0">TK/0 - Tidak Kawin, 0 tanggungan</option>
                  <option value="TK1">TK/1 - Tidak Kawin, 1 tanggungan</option>
                  <option value="K0">K/0 - Kawin, 0 tanggungan</option>
                  <option value="K1">K/1 - Kawin, 1 tanggungan</option>
                  <option value="K2">K/2 - Kawin, 2 tanggungan</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="bpjs"
                  checked={includeBPJS}
                  onChange={e => setIncludeBPJS(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  aria-describedby="bpjs-help"
                />
                <label htmlFor="bpjs" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  Termasuk potongan BPJS Kesehatan & Ketenagakerjaan
                </label>
              </div>

              <div>
                <label htmlFor="other-deductions" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Potongan Lainnya (opsional)
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                  <input
                    id="other-deductions"
                    type="text"
                    value={otherDeductions}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setOtherDeductions(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="0"
                    aria-describedby="other-help"
                  />
                </div>
                <p id="other-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                  Contoh: pinjaman koperasi, iuran, dll
                </p>
              </div>

              <Button
                onClick={calculateNetSalary}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={isCalculating}
                aria-label="Hitung gaji bersih"
              >
                {isCalculating
                  ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Menghitung...
                      </>
                    )
                  : (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        Hitung Gaji Bersih
                      </>
                    )}
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil perhitungan gaji bersih">
                    <Card className="bg-gradient-to-br from-green-600 to-blue-600 p-6 text-white">
                      <h3 className="mb-4 text-lg font-semibold">Gaji Bersih Anda</h3>
                      <div className="mb-6 text-center">
                        <p className="mb-2 text-sm text-green-100">Take Home Pay</p>
                        <p className="text-4xl font-bold">{formatCurrency(result.netSalary)}</p>
                        <p className="mt-2 text-sm text-green-100">
                          {result.takeHomePercentage.toFixed(1)}
                          % dari gaji bruto
                        </p>
                      </div>
                      <div className="space-y-2 border-t border-white/20 pt-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-green-100">Gaji Bruto</span>
                          <span className="font-medium">{formatCurrency(result.grossSalary)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-100">Total Potongan</span>
                          <span className="font-medium text-red-200">
                            -
                            {formatCurrency(result.deductions.total)}
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="mb-4 flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-gray-700 dark:text-slate-300" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detail Potongan</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg bg-red-50 px-4 py-3">
                          <span className="text-sm text-gray-700 dark:text-slate-300">Pajak PPh 21</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(result.deductions.pph21)}
                          </span>
                        </div>
                        {includeBPJS && (
                          <>
                            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
                              <span className="text-sm text-gray-700 dark:text-slate-300">BPJS Kesehatan (1%)</span>
                              <span className="font-semibold text-blue-600">
                                {formatCurrency(result.deductions.bpjsKesehatan)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
                              <span className="text-sm text-gray-700 dark:text-slate-300">BPJS Ketenagakerjaan (2%)</span>
                              <span className="font-semibold text-blue-600">
                                {formatCurrency(result.deductions.bpjsKetenagakerjaan)}
                              </span>
                            </div>
                          </>
                        )}
                        {result.deductions.other > 0 && (
                          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
                            <span className="text-sm text-gray-700 dark:text-slate-300">Potongan Lainnya</span>
                            <span className="font-semibold text-gray-600 dark:text-slate-400">
                              {formatCurrency(result.deductions.other)}
                            </span>
                          </div>
                        )}
                      </div>

                      <ActionButtons
                        onDownload={handleDownload}
                        onShare={handleShare}
                        disabled={!result}
                        className="mt-6"
                      />
                    </Card>

                    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 p-6">
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">Proyeksi Tahunan</h4>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-slate-400">Gaji Bruto/Tahun</p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatCurrency(result.grossSalary * 12)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-slate-400">Gaji Bersih/Tahun</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(result.netSalary * 12)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <Wallet className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Masukkan data gaji Anda dan klik tombol hitung
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  Otomasi Payroll untuk Seluruh Karyawan
                </h3>
                <p className="mb-4 text-gray-600 dark:text-slate-400">
                  Hitung manual untuk ratusan karyawan? BizOps otomatis menghitung gaji bersih,
                  pajak, BPJS, dan generate slip gaji dalam hitungan detik.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo Payroll
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-green-500 bg-green-50 p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
            <div className="text-sm text-gray-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Catatan:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Perhitungan PPh 21 menggunakan metode simplified untuk estimasi cepat</li>
                <li>BPJS Kesehatan: 1% dari gaji (employee contribution)</li>
                <li>BPJS Ketenagakerjaan: 2% (JHT + JP, employee contribution)</li>
                <li>Hasil bersifat estimasi. Untuk perhitungan akurat, gunakan sistem payroll profesional</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
