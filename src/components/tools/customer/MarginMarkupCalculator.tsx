'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertCircle, Calculator, DollarSign, Info, Loader2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate, safeDivide, validateFields, validateNumber } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type CalculationMode = 'margin' | 'markup' | 'selling-price';

type Result = {
  cost: number;
  sellingPrice: number;
  profit: number;
  margin: number;
  markup: number;
};

export default function MarginMarkupCalculator() {
  const [mode, setMode] = useState<CalculationMode>('margin');
  const [cost, setCost] = useState<string>('100000');
  const [percentage, setPercentage] = useState<string>('30');
  const [sellingPrice, setSellingPrice] = useState<string>('150000');
  const [result, setResult] = useState<Result | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setErrors([]);
    setIsCalculating(true);

    let validationErrors: (CalculationError | null)[] = [];

    if (mode === 'selling-price') {
      validationErrors = validateFields([
        () => validateNumber(cost, { min: 0, fieldName: 'Harga Pokok' }),
        () => validateNumber(sellingPrice, { min: 0, fieldName: 'Harga Jual' }),
      ]);
    } else {
      validationErrors = validateFields([
        () => validateNumber(cost, { min: 0, fieldName: 'Harga Pokok' }),
        () => validateNumber(percentage, { min: 0, max: 1000, fieldName: mode === 'margin' ? 'Margin' : 'Markup' }),
      ]);
    }

    const filteredErrors = validationErrors.filter((e): e is CalculationError => e !== null);
    if (filteredErrors.length > 0) {
      setErrors(filteredErrors);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const calculatedResult = safeCalculate<Result>(() => {
        const costValue = Number.parseFloat(cost) || 0;
        const percentageValue = Number.parseFloat(percentage) || 0;
        const sellingPriceValue = Number.parseFloat(sellingPrice) || 0;

        let calculatedResult: Result;

        if (mode === 'margin') {
          const calculatedSellingPrice = safeDivide(costValue, (1 - percentageValue / 100), costValue);
          const profit = calculatedSellingPrice - costValue;
          const markup = safeDivide(profit * 100, costValue, 0);

          calculatedResult = {
            cost: costValue,
            sellingPrice: calculatedSellingPrice,
            profit,
            margin: percentageValue,
            markup,
          };
        } else if (mode === 'markup') {
          const profit = costValue * (percentageValue / 100);
          const calculatedSellingPrice = costValue + profit;
          const margin = safeDivide(profit * 100, calculatedSellingPrice, 0);

          calculatedResult = {
            cost: costValue,
            sellingPrice: calculatedSellingPrice,
            profit,
            margin,
            markup: percentageValue,
          };
        } else {
          const profit = sellingPriceValue - costValue;
          const margin = safeDivide(profit * 100, sellingPriceValue, 0);
          const markup = safeDivide(profit * 100, costValue, 0);

          calculatedResult = {
            cost: costValue,
            sellingPrice: sellingPriceValue,
            profit,
            margin,
            markup,
          };
        }

        return calculatedResult;
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
      'Kalkulator Margin & Markup',
      {
        'Mode Perhitungan': mode === 'margin' ? 'Dari Margin' : mode === 'markup' ? 'Dari Markup' : 'Dari Harga Jual',
        'Harga Pokok': formatCurrency(result.cost),
        ...(mode !== 'selling-price' ? { Persentase: `${percentage}%` } : {}),
        ...(mode === 'selling-price' ? { 'Harga Jual': formatCurrency(result.sellingPrice) } : {}),
      },
      {
        'Harga Jual': formatCurrency(result.sellingPrice),
        'Profit': formatCurrency(result.profit),
        'Margin': `${result.margin.toFixed(2)}%`,
        'Markup': `${result.markup.toFixed(2)}%`,
      },
    );

    downloadAsText(content, `margin-markup-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Kalkulator Margin & Markup',
      `Harga Jual: ${formatCurrency(result.sellingPrice)} | Margin: ${result.margin.toFixed(1)}% | Markup: ${result.markup.toFixed(1)}%`,
    );

    await shareResult('Hasil Kalkulator Margin & Markup', shareText);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            <Calculator className="h-4 w-4" />
            Customer Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Kalkulator Margin & Markup
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Hitung harga jual optimal dengan margin atau markup yang tepat. Pahami perbedaannya!
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Mode Perhitungan</h2>

              <div className="mb-6 grid grid-cols-3 gap-2">
                <button
                  onClick={() => setMode('margin')}
                  className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                    mode === 'margin'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:text-white'
                  }`}
                  aria-pressed={mode === 'margin'}
                >
                  Dari Margin
                </button>
                <button
                  onClick={() => setMode('markup')}
                  className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                    mode === 'markup'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:text-white'
                  }`}
                  aria-pressed={mode === 'markup'}
                >
                  Dari Markup
                </button>
                <button
                  onClick={() => setMode('selling-price')}
                  className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                    mode === 'selling-price'
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:text-white'
                  }`}
                  aria-pressed={mode === 'selling-price'}
                >
                  Dari Harga Jual
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="cost" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Harga Pokok / Cost
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-500 dark:text-slate-500">Rp</span>
                    <input
                      id="cost"
                      type="text"
                      value={cost}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setCost(value);
                      }}
                      className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                      placeholder="100000"
                      aria-describedby="cost-help"
                    />
                  </div>
                  <p id="cost-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    {cost && formatCurrency(Number.parseFloat(cost) || 0)}
                  </p>
                </div>

                {mode !== 'selling-price'
                  ? (
                      <div>
                        <label htmlFor="percentage" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                          {mode === 'margin' ? 'Target Margin (%)' : 'Target Markup (%)'}
                        </label>
                        <div className="relative">
                          <input
                            id="percentage"
                            type="text"
                            value={percentage}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^\d.]/g, '');
                              setPercentage(value);
                            }}
                            className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="30"
                          />
                          <span className="absolute top-3 right-3 text-gray-500 dark:text-slate-500">%</span>
                        </div>
                      </div>
                    )
                  : (
                      <div>
                        <label htmlFor="selling-price" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                          Harga Jual
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
                            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-12 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="150000"
                            aria-describedby="selling-price-help"
                          />
                        </div>
                        <p id="selling-price-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                          {sellingPrice && formatCurrency(Number.parseFloat(sellingPrice) || 0)}
                        </p>
                      </div>
                    )}

                <Button
                  onClick={calculate}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                  disabled={isCalculating}
                  aria-label="Hitung margin dan markup"
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
                          <Calculator className="mr-2 h-5 w-5" />
                          Hitung
                        </>
                      )}
                </Button>
              </div>
            </Card>

            <Card className="border-l-4 border-purple-500 bg-purple-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-purple-600" />
                <div className="text-xs text-gray-700 dark:text-slate-300">
                  <p className="mb-2 font-semibold">Perbedaan Margin vs Markup:</p>
                  <ul className="space-y-1">
                    <li>
                      <strong>Margin:</strong>
                      {' '}
                      Profit dibagi Harga Jual × 100%
                    </li>
                    <li>
                      <strong>Markup:</strong>
                      {' '}
                      Profit dibagi Harga Pokok × 100%
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil perhitungan margin markup">
                    <Card className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white">
                      <h3 className="mb-4 text-lg font-semibold">Hasil Perhitungan</h3>
                      <div className="mb-4 text-center">
                        <p className="text-sm text-purple-100">Harga Jual Optimal</p>
                        <p className="text-4xl font-bold">{formatCurrency(result.sellingPrice)}</p>
                      </div>
                      <div className="space-y-2 border-t border-white/20 pt-4">
                        <div className="flex justify-between">
                          <span className="text-purple-100">Harga Pokok</span>
                          <span className="font-medium">{formatCurrency(result.cost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-100">Profit</span>
                          <span className="font-bold text-yellow-300">{formatCurrency(result.profit)}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        Analisis Profit
                      </h3>

                      <div className="space-y-4">
                        <div className="rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Margin</span>
                            <span className="text-2xl font-bold text-purple-600">
                              {result.margin.toFixed(2)}
                              %
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-slate-400">
                            Dari setiap Rp 100 penjualan, Rp
                            {' '}
                            {result.margin.toFixed(0)}
                            {' '}
                            adalah profit
                          </p>
                        </div>

                        <div className="rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Markup</span>
                            <span className="text-2xl font-bold text-pink-600">
                              {result.markup.toFixed(2)}
                              %
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-slate-400">
                            Harga jual
                            {' '}
                            {result.markup.toFixed(0)}
                            % lebih tinggi dari harga pokok
                          </p>
                        </div>

                        <div className="rounded-lg border-2 border-dashed border-gray-300 p-4 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Profit per Unit</span>
                            <span className="text-xl font-bold text-green-600">
                              {formatCurrency(result.profit)}
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
                      <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        Proyeksi Penjualan
                      </h4>
                      <div className="grid grid-cols-3 gap-3 text-center text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-slate-400">10 Unit</p>
                          <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(result.profit * 10)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-slate-400">100 Unit</p>
                          <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(result.profit * 100)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-slate-400">1000 Unit</p>
                          <p className="font-bold text-gray-900 dark:text-white">{formatCurrency(result.profit * 1000)}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <Calculator className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Pilih mode dan masukkan data untuk menghitung
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-purple-100 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  Otomasi Pricing & Profit Analysis
                </h3>
                <p className="mb-4 text-gray-600 dark:text-slate-400">
                  Hitung margin untuk ratusan produk secara manual? BizOps otomatis menghitung harga jual optimal,
                  analisis profit, dan rekomendasi pricing strategy.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo Pricing Module
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-purple-500 bg-purple-50 p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-purple-600" />
            <div className="text-sm text-gray-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Tips Pricing:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Margin 20-30% cocok untuk produk retail dengan kompetisi tinggi</li>
                <li>Margin 40-60% untuk produk premium atau niche market</li>
                <li>Pertimbangkan biaya operasional dan overhead dalam harga pokok</li>
                <li>Monitor harga kompetitor untuk tetap kompetitif</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
