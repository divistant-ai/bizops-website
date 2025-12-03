'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertCircle, Info, Loader2, Shield, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate, validateFields, validateNumber } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type BPJSResult = {
  salary: number;
  kesehatan: {
    employeeContribution: number;
    employerContribution: number;
    total: number;
  };
  ketenagakerjaan: {
    jht: { employee: number; employer: number; total: number };
    jp: { employee: number; employer: number; total: number };
    jkk: number;
    jkm: number;
    total: number;
  };
  totalEmployee: number;
  totalEmployer: number;
  grandTotal: number;
};

export default function BPJSCalculator() {
  const [salary, setSalary] = useState<string>('10000000');
  const [jkkRate, setJkkRate] = useState<number>(0.24);
  const [result, setResult] = useState<BPJSResult | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBPJS = () => {
    setErrors([]);
    setIsCalculating(true);

    const validationErrors = validateFields([
      () => validateNumber(salary, { min: 0, max: 1000000000, fieldName: 'Gaji Pokok' }),
    ]);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const calculatedResult = safeCalculate<BPJSResult>(() => {
        const baseSalary = Number.parseFloat(salary) || 0;

        const kesehatanBase = Math.min(baseSalary, 12000000);
        const kesehatanEmployee = kesehatanBase * 0.01;
        const kesehatanEmployer = kesehatanBase * 0.04;
        const kesehatanTotal = kesehatanEmployee + kesehatanEmployer;

        const jhtBase = Math.min(baseSalary, 9559600);
        const jhtEmployee = jhtBase * 0.02;
        const jhtEmployer = jhtBase * 0.037;
        const jhtTotal = jhtEmployee + jhtEmployer;

        const jpBase = Math.min(baseSalary, 9559600);
        const jpEmployee = jpBase * 0.01;
        const jpEmployer = jpBase * 0.02;
        const jpTotal = jpEmployee + jpEmployer;

        const jkk = baseSalary * (jkkRate / 100);
        const jkm = baseSalary * 0.003;

        const ketenagakerjaanTotal = jhtTotal + jpTotal + jkk + jkm;
        const totalEmployee = kesehatanEmployee + jhtEmployee + jpEmployee;
        const totalEmployer = kesehatanEmployer + jhtEmployer + jpEmployer + jkk + jkm;
        const grandTotal = totalEmployee + totalEmployer;

        return {
          salary: baseSalary,
          kesehatan: {
            employeeContribution: kesehatanEmployee,
            employerContribution: kesehatanEmployer,
            total: kesehatanTotal,
          },
          ketenagakerjaan: {
            jht: { employee: jhtEmployee, employer: jhtEmployer, total: jhtTotal },
            jp: { employee: jpEmployee, employer: jpEmployer, total: jpTotal },
            jkk,
            jkm,
            total: ketenagakerjaanTotal,
          },
          totalEmployee,
          totalEmployer,
          grandTotal,
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
      'Kalkulator BPJS',
      {
        'Gaji Pokok': formatCurrency(result.salary),
        'Tingkat Risiko JKK': `${jkkRate}%`,
      },
      {
        'BPJS Kesehatan (Total)': formatCurrency(result.kesehatan.total),
        'BPJS Ketenagakerjaan (Total)': formatCurrency(result.ketenagakerjaan.total),
        'Potongan Karyawan': formatCurrency(result.totalEmployee),
        'Beban Perusahaan': formatCurrency(result.totalEmployer),
        'Total Iuran': formatCurrency(result.grandTotal),
      },
    );

    downloadAsText(content, `bpjs-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Kalkulator BPJS',
      `Total Iuran: ${formatCurrency(result.grandTotal)} (Karyawan: ${formatCurrency(result.totalEmployee)}, Perusahaan: ${formatCurrency(result.totalEmployer)})`,
    );

    await shareResult('Hasil Kalkulator BPJS', shareText);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-medium text-teal-700">
            <Shield className="h-4 w-4" />
            Customer Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Kalkulator BPJS Kesehatan & Ketenagakerjaan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Hitung iuran BPJS Kesehatan dan Ketenagakerjaan (JHT, JP, JKK, JKM) untuk karyawan dan perusahaan.
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Input Data</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="salary" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Gaji Pokok per Bulan
                </label>
                <div className="relative">
                  <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                  <input
                    id="salary"
                    type="text"
                    value={salary}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setSalary(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="10000000"
                    aria-describedby="salary-help"
                  />
                </div>
                <p id="salary-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                  {salary && formatCurrency(Number.parseFloat(salary) || 0)}
                </p>
              </div>

              <div>
                <label htmlFor="jkk-rate" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                  Tingkat Risiko Pekerjaan (untuk JKK)
                </label>
                <select
                  id="jkk-rate"
                  value={jkkRate}
                  onChange={e => setJkkRate(Number.parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  aria-label="Pilih tingkat risiko pekerjaan"
                >
                  <option value="0.24">Sangat Rendah (0.24%)</option>
                  <option value="0.54">Rendah (0.54%)</option>
                  <option value="0.89">Sedang (0.89%)</option>
                  <option value="1.27">Tinggi (1.27%)</option>
                  <option value="1.74">Sangat Tinggi (1.74%)</option>
                </select>
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                  Contoh: Kantor/IT = Sangat Rendah, Konstruksi = Sangat Tinggi
                </p>
              </div>

              <Button
                onClick={calculateBPJS}
                className="w-full bg-teal-600 hover:bg-teal-700"
                size="lg"
                disabled={isCalculating}
                aria-label="Hitung iuran BPJS"
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
                        <Shield className="mr-2 h-5 w-5" />
                        Hitung Iuran BPJS
                      </>
                    )}
              </Button>
            </div>

            <Card className="mt-6 border-l-4 border-teal-500 bg-teal-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-teal-600" />
                <div className="text-xs text-gray-700 dark:text-slate-300">
                  <p className="mb-1 font-semibold">Batas Upah BPJS:</p>
                  <ul className="list-inside list-disc space-y-0.5">
                    <li>BPJS Kesehatan: Max Rp 12.000.000</li>
                    <li>JHT & JP: Max Rp 9.559.600</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Card>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil perhitungan BPJS">
                    <Card className="bg-gradient-to-br from-teal-600 to-blue-600 p-6 text-white">
                      <h3 className="mb-4 text-lg font-semibold">Total Iuran BPJS</h3>
                      <div className="mb-4 text-center">
                        <p className="text-sm text-teal-100">Total Iuran per Bulan</p>
                        <p className="text-3xl font-bold">{formatCurrency(result.grandTotal)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                        <div>
                          <p className="text-xs text-teal-100">Potongan Karyawan</p>
                          <p className="text-xl font-bold">{formatCurrency(result.totalEmployee)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-teal-100">Beban Perusahaan</p>
                          <p className="text-xl font-bold">{formatCurrency(result.totalEmployer)}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <Shield className="h-5 w-5 text-teal-600" />
                        BPJS Kesehatan
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between rounded-lg bg-teal-50 px-4 py-3">
                          <span className="text-sm text-gray-700 dark:text-slate-300">Karyawan (1%)</span>
                          <span className="font-semibold text-teal-600">
                            {formatCurrency(result.kesehatan.employeeContribution)}
                          </span>
                        </div>
                        <div className="flex justify-between rounded-lg bg-blue-50 px-4 py-3">
                          <span className="text-sm text-gray-700 dark:text-slate-300">Perusahaan (4%)</span>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(result.kesehatan.employerContribution)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900 dark:text-white">Total BPJS Kesehatan</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {formatCurrency(result.kesehatan.total)}
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <Shield className="h-5 w-5 text-blue-600" />
                        BPJS Ketenagakerjaan
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="rounded-lg border border-gray-200 p-3">
                          <p className="mb-2 font-medium text-gray-900 dark:text-white">Jaminan Hari Tua (JHT)</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-slate-400">Karyawan (2%)</span>
                            <span className="font-medium">{formatCurrency(result.ketenagakerjaan.jht.employee)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-slate-400">Perusahaan (3.7%)</span>
                            <span className="font-medium">{formatCurrency(result.ketenagakerjaan.jht.employer)}</span>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-3">
                          <p className="mb-2 font-medium text-gray-900 dark:text-white">Jaminan Pensiun (JP)</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-slate-400">Karyawan (1%)</span>
                            <span className="font-medium">{formatCurrency(result.ketenagakerjaan.jp.employee)}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-slate-400">Perusahaan (2%)</span>
                            <span className="font-medium">{formatCurrency(result.ketenagakerjaan.jp.employer)}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
                          <span className="text-gray-700 dark:text-slate-300">
                            JKK (
                            {jkkRate}
                            %)
                          </span>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(result.ketenagakerjaan.jkk)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg bg-blue-50 px-4 py-3">
                          <span className="text-gray-700 dark:text-slate-300">JKM (0.3%)</span>
                          <span className="font-semibold text-blue-600">
                            {formatCurrency(result.ketenagakerjaan.jkm)}
                          </span>
                        </div>

                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-gray-900 dark:text-white">Total BPJS Ketenagakerjaan</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {formatCurrency(result.ketenagakerjaan.total)}
                          </span>
                        </div>
                      </div>

                      <ActionButtons
                        onDownload={handleDownload}
                        onShare={handleShare}
                        disabled={!result}
                        className="mt-6"
                      />
                    </Card>
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <Shield className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Masukkan gaji dan klik tombol hitung
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-teal-100 p-3">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  Otomasi Perhitungan & Pelaporan BPJS
                </h3>
                <p className="mb-4 text-gray-600 dark:text-slate-400">
                  Hitung manual BPJS untuk ratusan karyawan setiap bulan? BizOps otomatis menghitung,
                  memotong, dan generate laporan BPJS dalam hitungan detik.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo BPJS Module
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-teal-500 bg-teal-50 p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-teal-600" />
            <div className="text-sm text-gray-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Catatan Penting:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Perhitungan berdasarkan peraturan BPJS terbaru</li>
                <li>BPJS Kesehatan: Karyawan 1%, Perusahaan 4%</li>
                <li>JHT: Karyawan 2%, Perusahaan 3.7%</li>
                <li>JP: Karyawan 1%, Perusahaan 2%</li>
                <li>JKK & JKM: Ditanggung sepenuhnya oleh perusahaan</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
