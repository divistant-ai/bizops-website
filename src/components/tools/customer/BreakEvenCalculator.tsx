'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertCircle, BarChart3, Info, Loader2, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate, safeDivide, validateFields, validateNumber } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type BEPResult = {
  fixedCosts: number;
  variableCostPerUnit: number;
  sellingPricePerUnit: number;
  contributionMargin: number;
  contributionMarginRatio: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  monthsToBreakEven: number;
};

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<string>('50000000');
  const [variableCost, setVariableCost] = useState<string>('50000');
  const [sellingPrice, setSellingPrice] = useState<string>('100000');
  const [monthlySales, setMonthlySales] = useState<string>('500');
  const [result, setResult] = useState<BEPResult | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBEP = () => {
    setErrors([]);
    setIsCalculating(true);

    const validationErrors = validateFields([
      () => validateNumber(fixedCosts, { min: 0, fieldName: 'Biaya Tetap' }),
      () => validateNumber(variableCost, { min: 0, fieldName: 'Biaya Variabel per Unit' }),
      () => validateNumber(sellingPrice, { min: 0, fieldName: 'Harga Jual per Unit' }),
      () => validateNumber(monthlySales, { min: 0, required: false, fieldName: 'Estimasi Penjualan Bulanan' }),
    ]);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const calculatedResult = safeCalculate<BEPResult>(() => {
        const fixed = Number.parseFloat(fixedCosts) || 0;
        const variable = Number.parseFloat(variableCost) || 0;
        const price = Number.parseFloat(sellingPrice) || 0;
        const monthly = Number.parseFloat(monthlySales) || 0;

        const contributionMargin = price - variable;
        const contributionMarginRatio = safeDivide(contributionMargin * 100, price, 0);

        const breakEvenUnits = safeDivide(fixed, contributionMargin, 0);
        const breakEvenRevenue = breakEvenUnits * price;

        const monthsToBreakEven = monthly > 0 ? safeDivide(breakEvenUnits, monthly, 0) : 0;

        return {
          fixedCosts: fixed,
          variableCostPerUnit: variable,
          sellingPricePerUnit: price,
          contributionMargin,
          contributionMarginRatio,
          breakEvenUnits,
          breakEvenRevenue,
          monthsToBreakEven,
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
      'Kalkulator Break Even Point (BEP)',
      {
        'Biaya Tetap': formatCurrency(result.fixedCosts),
        'Biaya Variabel per Unit': formatCurrency(result.variableCostPerUnit),
        'Harga Jual per Unit': formatCurrency(result.sellingPricePerUnit),
        'Estimasi Penjualan Bulanan': `${monthlySales} unit`,
      },
      {
        'Contribution Margin': formatCurrency(result.contributionMargin),
        'Contribution Margin Ratio': `${result.contributionMarginRatio.toFixed(2)}%`,
        'Break Even Point (Unit)': `${Math.ceil(result.breakEvenUnits).toLocaleString('id-ID')} unit`,
        'Break Even Point (Revenue)': formatCurrency(result.breakEvenRevenue),
        'Waktu Mencapai BEP': `${result.monthsToBreakEven.toFixed(1)} bulan`,
      },
    );

    downloadAsText(content, `break-even-point-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Kalkulator Break Even Point',
      `BEP: ${Math.ceil(result.breakEvenUnits).toLocaleString('id-ID')} unit atau ${formatCurrency(result.breakEvenRevenue)} (${result.monthsToBreakEven.toFixed(1)} bulan)`,
    );

    await shareResult('Hasil Kalkulator Break Even Point', shareText);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
            <Target className="h-4 w-4" />
            Customer Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white">
            Kalkulator Break Even Point (BEP)
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Hitung kapan bisnis Anda mulai menghasilkan profit. Ketahui target penjualan minimal!
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Input Data Bisnis</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="fixed-costs" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Biaya Tetap (Fixed Costs)
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="fixed-costs"
                      type="text"
                      value={fixedCosts}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setFixedCosts(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="50000000"
                      aria-describedby="fixed-costs-help"
                    />
                  </div>
                  <p id="fixed-costs-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Contoh: sewa, gaji tetap, utilitas.
                    {' '}
                    {fixedCosts && formatCurrency(Number.parseFloat(fixedCosts) || 0)}
                  </p>
                </div>

                <div>
                  <label htmlFor="variable-cost" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Biaya Variabel per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="variable-cost"
                      type="text"
                      value={variableCost}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setVariableCost(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="50000"
                      aria-describedby="variable-cost-help"
                    />
                  </div>
                  <p id="variable-cost-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Contoh: bahan baku, packaging.
                    {' '}
                    {variableCost && formatCurrency(Number.parseFloat(variableCost) || 0)}
                  </p>
                </div>

                <div>
                  <label htmlFor="selling-price" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Harga Jual per Unit
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="selling-price"
                      type="text"
                      value={sellingPrice}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setSellingPrice(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="100000"
                      aria-describedby="selling-price-help"
                    />
                  </div>
                  <p id="selling-price-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    {sellingPrice && formatCurrency(Number.parseFloat(sellingPrice) || 0)}
                  </p>
                </div>

                <div>
                  <label htmlFor="monthly-sales" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Estimasi Penjualan Bulanan (unit)
                  </label>
                  <input
                    id="monthly-sales"
                    type="text"
                    value={monthlySales}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setMonthlySales(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-4 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="500"
                    aria-describedby="monthly-sales-help"
                  />
                  <p id="monthly-sales-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Untuk menghitung berapa bulan mencapai BEP
                  </p>
                </div>

                <Button
                  onClick={calculateBEP}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  size="lg"
                  disabled={isCalculating}
                  aria-label="Hitung break even point"
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
                          <Target className="mr-2 h-5 w-5" />
                          Hitung BEP
                        </>
                      )}
                </Button>
              </div>
            </Card>

            <Card className="border-l-4 border-orange-500 bg-orange-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-orange-600" />
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <p className="mb-1 font-semibold">Apa itu Break Even Point?</p>
                  <p>
                    BEP adalah titik dimana total pendapatan sama dengan total biaya.
                    Setelah melewati BEP, bisnis mulai menghasilkan profit.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil perhitungan break even point">
                    <Card className="bg-gradient-to-br from-orange-600 to-red-600 p-6 text-white">
                      <h3 className="mb-4 text-lg font-semibold">Break Even Point</h3>
                      <div className="space-y-4">
                        <div className="text-center">
                          <p className="text-sm text-orange-100">Minimal Penjualan (Unit)</p>
                          <p className="text-4xl font-bold">
                            {Math.ceil(result.breakEvenUnits).toLocaleString('id-ID')}
                          </p>
                          <p className="mt-1 text-sm text-orange-100">unit</p>
                        </div>
                        <div className="border-t border-white/20 pt-4 text-center">
                          <p className="text-sm text-orange-100">Minimal Revenue</p>
                          <p className="text-2xl font-bold">{formatCurrency(result.breakEvenRevenue)}</p>
                        </div>
                        {result.monthsToBreakEven > 0 && (
                          <div className="border-t border-white/20 pt-4 text-center">
                            <p className="text-sm text-orange-100">Waktu Mencapai BEP</p>
                            <p className="text-2xl font-bold">
                              {result.monthsToBreakEven.toFixed(1)}
                              {' '}
                              bulan
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                        <BarChart3 className="h-5 w-5 text-orange-600" />
                        Analisis Contribution Margin
                      </h3>

                      <div className="space-y-4">
                        <div className="rounded-lg bg-gradient-to-r from-orange-50 to-red-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Contribution Margin</span>
                            <span className="text-2xl font-bold text-orange-600">
                              {formatCurrency(result.contributionMargin)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Profit per unit sebelum biaya tetap
                          </p>
                        </div>

                        <div className="rounded-lg bg-gradient-to-r from-red-50 to-orange-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">CM Ratio</span>
                            <span className="text-2xl font-bold text-red-600">
                              {result.contributionMarginRatio.toFixed(2)}
                              %
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Persentase contribution margin dari harga jual
                          </p>
                        </div>

                        <div className="space-y-2 border-t pt-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Harga Jual</span>
                            <span className="font-medium">{formatCurrency(result.sellingPricePerUnit)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Biaya Variabel</span>
                            <span className="font-medium text-red-600">
                              -
                              {formatCurrency(result.variableCostPerUnit)}
                            </span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium text-slate-900 dark:text-white">Contribution Margin</span>
                            <span className="font-bold text-green-600">
                              {formatCurrency(result.contributionMargin)}
                            </span>
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
                      <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">Proyeksi Profit</h4>
                      <div className="space-y-2 text-sm">
                        {[1.2, 1.5, 2].map((multiplier) => {
                          const units = Math.ceil(result.breakEvenUnits * multiplier);
                          const revenue = units * result.sellingPricePerUnit;
                          const totalCost = result.fixedCosts + (units * result.variableCostPerUnit);
                          const profit = revenue - totalCost;

                          return (
                            <div key={multiplier} className="flex items-center justify-between rounded-lg bg-white p-3">
                              <span className="text-slate-700 dark:text-slate-300">
                                {units.toLocaleString('id-ID')}
                                {' '}
                                unit
                              </span>
                              <span className="font-bold text-green-600">
                                +
                                {formatCurrency(profit)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </Card>
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <Target className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Masukkan data bisnis dan klik tombol hitung
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-orange-100 p-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  Real-time Financial Planning & Analysis
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  Hitung BEP manual setiap kali ada perubahan? BizOps otomatis menghitung BEP,
                  proyeksi profit, dan financial forecasting secara real-time.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo Financial Module
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-orange-500 bg-orange-50 p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-orange-600" />
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Tips Menggunakan BEP:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Semakin rendah BEP, semakin cepat bisnis menghasilkan profit</li>
                <li>Tingkatkan contribution margin dengan menaikkan harga atau menurunkan biaya variabel</li>
                <li>Monitor BEP secara berkala, terutama saat ada perubahan biaya</li>
                <li>Gunakan BEP sebagai target minimal penjualan tim sales</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
