'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertTriangle, DollarSign, Info, Loader2, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate, safePercentage, validateFields, validateNumber } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type TurnoverResult = {
  directCosts: {
    recruitment: number;
    training: number;
    separation: number;
    total: number;
  };
  indirectCosts: {
    productivityLoss: number;
    knowledgeLoss: number;
    moraleLoss: number;
    total: number;
  };
  totalCostPerEmployee: number;
  annualTurnoverCost: number;
  turnoverRate: number;
};

export default function TurnoverCostCalculator() {
  const [totalEmployees, setTotalEmployees] = useState<string>('100');
  const [employeesLeft, setEmployeesLeft] = useState<string>('15');
  const [avgSalary, setAvgSalary] = useState<string>('10000000');
  const [avgTenure, setAvgTenure] = useState<string>('2');
  const [result, setResult] = useState<TurnoverResult | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTurnoverCost = () => {
    setErrors([]);
    setIsCalculating(true);

    const validationErrors = validateFields([
      () => validateNumber(totalEmployees, { min: 1, fieldName: 'Total Karyawan' }),
      () => validateNumber(employeesLeft, { min: 0, fieldName: 'Karyawan Keluar' }),
      () => validateNumber(avgSalary, { min: 0, fieldName: 'Rata-rata Gaji' }),
      () => validateNumber(avgTenure, { min: 0, fieldName: 'Rata-rata Masa Kerja' }),
    ]);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const calculatedResult = safeCalculate<TurnoverResult>(() => {
        const total = Number.parseFloat(totalEmployees) || 0;
        const left = Number.parseFloat(employeesLeft) || 0;
        const salary = Number.parseFloat(avgSalary) || 0;
        const tenure = Number.parseFloat(avgTenure) || 0;

        const turnoverRate = safePercentage(left, total);

        // Direct Costs
        const recruitment = salary * 0.5; // 50% of annual salary
        const training = salary * 0.25; // 25% of annual salary
        const separation = salary * 0.15; // 15% of annual salary (severance, admin)
        const totalDirectCosts = recruitment + training + separation;

        // Indirect Costs
        const productivityLoss = salary * 0.5 * Math.min(tenure, 2); // Productivity loss during ramp-up
        const knowledgeLoss = salary * 0.3 * Math.min(tenure, 3); // Knowledge & expertise loss
        const moraleLoss = salary * 0.2; // Team morale & engagement impact
        const totalIndirectCosts = productivityLoss + knowledgeLoss + moraleLoss;

        const totalCostPerEmployee = totalDirectCosts + totalIndirectCosts;
        const annualTurnoverCost = totalCostPerEmployee * left;

        return {
          directCosts: {
            recruitment,
            training,
            separation,
            total: totalDirectCosts,
          },
          indirectCosts: {
            productivityLoss,
            knowledgeLoss,
            moraleLoss,
            total: totalIndirectCosts,
          },
          totalCostPerEmployee,
          annualTurnoverCost,
          turnoverRate,
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
      'Kalkulator Biaya Turnover Karyawan',
      {
        'Total Karyawan': totalEmployees,
        'Karyawan Keluar (Tahunan)': employeesLeft,
        'Rata-rata Gaji per Bulan': formatCurrency(Number.parseFloat(avgSalary)),
        'Rata-rata Masa Kerja': `${avgTenure} tahun`,
      },
      {
        'Turnover Rate': `${result.turnoverRate.toFixed(2)}%`,
        'Biaya per Karyawan': formatCurrency(result.totalCostPerEmployee),
        'Total Biaya Turnover Tahunan': formatCurrency(result.annualTurnoverCost),
        'Direct Costs': formatCurrency(result.directCosts.total),
        'Indirect Costs': formatCurrency(result.indirectCosts.total),
      },
    );

    downloadAsText(content, `turnover-cost-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Kalkulator Biaya Turnover',
      `Turnover Rate: ${result.turnoverRate.toFixed(1)}% | Total Cost: ${formatCurrency(result.annualTurnoverCost)}`,
    );

    await shareResult('Hasil Kalkulator Biaya Turnover', shareText);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Removed unused function getTurnoverRateColor

  const getTurnoverRateBg = (rate: number) => {
    if (rate < 10) {
      return 'from-green-600 to-emerald-600';
    }
    if (rate < 15) {
      return 'from-yellow-600 to-orange-600';
    }
    if (rate < 20) {
      return 'from-orange-600 to-red-600';
    }
    return 'from-red-600 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700">
            <Users className="h-4 w-4" />
            Consultant/Sales Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Kalkulator Biaya Turnover Karyawan
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Hitung total biaya yang hilang akibat turnover karyawan. Identifikasi ROI dari retention strategy!
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Input Data Perusahaan</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="total-employees" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Total Karyawan
                  </label>
                  <input
                    id="total-employees"
                    type="text"
                    value={totalEmployees}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setTotalEmployees(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label htmlFor="employees-left" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Karyawan Keluar (per Tahun)
                  </label>
                  <input
                    id="employees-left"
                    type="text"
                    value={employeesLeft}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setEmployeesLeft(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="15"
                    aria-describedby="employees-left-help"
                  />
                  <p id="employees-left-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Jumlah karyawan yang resign/keluar dalam 1 tahun
                  </p>
                </div>

                <div>
                  <label htmlFor="avg-salary" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Rata-rata Gaji per Bulan
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="avg-salary"
                      type="text"
                      value={avgSalary}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setAvgSalary(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="10000000"
                      aria-describedby="avg-salary-help"
                    />
                  </div>
                  <p id="avg-salary-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    {avgSalary && formatCurrency(Number.parseFloat(avgSalary) || 0)}
                  </p>
                </div>

                <div>
                  <label htmlFor="avg-tenure" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Rata-rata Masa Kerja (tahun)
                  </label>
                  <input
                    id="avg-tenure"
                    type="text"
                    value={avgTenure}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '');
                      setAvgTenure(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="2"
                    aria-describedby="avg-tenure-help"
                  />
                  <p id="avg-tenure-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Rata-rata lama karyawan bekerja sebelum keluar
                  </p>
                </div>

                <Button
                  onClick={calculateTurnoverCost}
                  className="w-full bg-rose-600 hover:bg-rose-700"
                  size="lg"
                  disabled={isCalculating}
                  aria-label="Hitung biaya turnover"
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
                          <DollarSign className="mr-2 h-5 w-5" />
                          Hitung Biaya Turnover
                        </>
                      )}
                </Button>
              </div>
            </Card>

            <Card className="border-l-4 border-rose-500 bg-rose-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-rose-600" />
                <div className="text-xs text-gray-700 dark:text-slate-300">
                  <p className="mb-1 font-semibold">Komponen Biaya Turnover:</p>
                  <ul className="space-y-0.5">
                    <li>
                      <strong>Direct:</strong>
                      {' '}
                      Rekrutmen, Training, Separation
                    </li>
                    <li>
                      <strong>Indirect:</strong>
                      {' '}
                      Productivity Loss, Knowledge Loss, Morale Impact
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil perhitungan biaya turnover">
                    <Card className={`bg-gradient-to-br ${getTurnoverRateBg(result.turnoverRate)} p-6 text-white`}>
                      <h3 className="mb-4 text-lg font-semibold">Turnover Rate & Total Cost</h3>
                      <div className="mb-4 text-center">
                        <p className="text-sm opacity-90">Turnover Rate</p>
                        <p className="text-5xl font-bold">
                          {result.turnoverRate.toFixed(1)}
                          %
                        </p>
                        <p className="mt-4 text-sm opacity-90">Total Biaya Tahunan</p>
                        <p className="text-3xl font-bold">{formatCurrency(result.annualTurnoverCost)}</p>
                      </div>
                      <div className="border-t border-white/20 pt-4 text-center">
                        <p className="text-sm opacity-90">Biaya per Karyawan</p>
                        <p className="text-2xl font-bold">{formatCurrency(result.totalCostPerEmployee)}</p>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <DollarSign className="h-5 w-5 text-rose-600" />
                        Breakdown Biaya
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Direct Costs</span>
                            <span className="text-lg font-bold text-rose-600">
                              {formatCurrency(result.directCosts.total)}
                            </span>
                          </div>
                          <div className="space-y-2 rounded-lg bg-rose-50 p-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-slate-400">Recruitment</span>
                              <span className="font-medium">{formatCurrency(result.directCosts.recruitment)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-slate-400">Training & Onboarding</span>
                              <span className="font-medium">{formatCurrency(result.directCosts.training)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-slate-400">Separation Costs</span>
                              <span className="font-medium">{formatCurrency(result.directCosts.separation)}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Indirect Costs</span>
                            <span className="text-lg font-bold text-orange-600">
                              {formatCurrency(result.indirectCosts.total)}
                            </span>
                          </div>
                          <div className="space-y-2 rounded-lg bg-orange-50 p-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-slate-400">Productivity Loss</span>
                              <span className="font-medium">{formatCurrency(result.indirectCosts.productivityLoss)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-slate-400">Knowledge Loss</span>
                              <span className="font-medium">{formatCurrency(result.indirectCosts.knowledgeLoss)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-slate-400">Morale Impact</span>
                              <span className="font-medium">{formatCurrency(result.indirectCosts.moraleLoss)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ActionButtons
                        onDownload={handleDownload}
                        onShare={handleShare}
                        disabled={!result}
                        className="mt-6"
                      />
                    </Card>

                    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">ROI Retention Strategy</h4>
                      <p className="mb-3 text-sm text-gray-700 dark:text-slate-300">
                        Jika turnover rate dikurangi 50%, potensi savings:
                      </p>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">
                          {formatCurrency(result.annualTurnoverCost * 0.5)}
                        </p>
                        <p className="mt-1 text-xs text-gray-600 dark:text-slate-400">per tahun</p>
                      </div>
                    </Card>

                    <Card className={`border-l-4 ${
                      result.turnoverRate < 10
                        ? 'border-green-500 bg-green-50'
                        : result.turnoverRate < 15
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-red-500 bg-red-50'
                    } p-4`}
                    >
                      <div className="flex gap-2">
                        <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                          result.turnoverRate < 10
                            ? 'text-green-600'
                            : result.turnoverRate < 15
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                        />
                        <div className="text-sm text-gray-700 dark:text-slate-300">
                          <p className="font-semibold">
                            {result.turnoverRate < 10
                              ? 'Turnover Rate Baik'
                              : result.turnoverRate < 15
                                ? 'Turnover Rate Sedang'
                                : 'Turnover Rate Tinggi'}
                          </p>
                          <p className="text-xs">
                            {result.turnoverRate < 10
                              ? 'Pertahankan strategi retention yang ada.'
                              : result.turnoverRate < 15
                                ? 'Perlu improvement pada employee engagement.'
                                : 'Urgent: Perlu strategi retention yang komprehensif.'}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <Users className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Masukkan data perusahaan dan klik tombol hitung
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-rose-100 p-3">
                <TrendingUp className="h-6 w-6 text-rose-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  Reduce Turnover dengan Data-Driven Insights
                </h3>
                <p className="mb-4 text-gray-600 dark:text-slate-400">
                  BizOps membantu identify early warning signs, predict turnover risk,
                  dan provide actionable insights untuk improve employee retention.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo HR Analytics
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-rose-500 bg-rose-50 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-rose-600" />
            <div className="text-sm text-gray-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Strategi Menurunkan Turnover:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Competitive compensation & benefits</li>
                <li>Clear career path & development opportunities</li>
                <li>Strong company culture & employee engagement</li>
                <li>Regular feedback & recognition</li>
                <li>Work-life balance & flexible working arrangements</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
