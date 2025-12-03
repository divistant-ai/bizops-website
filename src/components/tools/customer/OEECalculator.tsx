'use client';

import type { CalculationError } from '@/utils/errorHandling';
import { AlertCircle, Factory, Gauge, Info, Loader2, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import ActionButtons from '@/components/tools/shared/ActionButtons';
import ErrorDisplay from '@/components/tools/shared/ErrorDisplay';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { safeCalculate, safeDivide, safePercentage, validateFields, validateNumber } from '@/utils/errorHandling';
import { downloadAsText, formatResultAsText, generateShareText, shareResult } from '@/utils/exportTools';

type OEEResult = {
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  classification: string;
  lossesBreakdown: {
    plannedDowntime: number;
    unplannedDowntime: number;
    speedLoss: number;
    qualityLoss: number;
  };
};

export default function OEECalculator() {
  const [plannedProductionTime, setPlannedProductionTime] = useState<string>('480');
  const [downtime, setDowntime] = useState<string>('60');
  const [idealCycleTime, setIdealCycleTime] = useState<string>('1');
  const [totalUnits, setTotalUnits] = useState<string>('400');
  const [goodUnits, setGoodUnits] = useState<string>('380');
  const [result, setResult] = useState<OEEResult | null>(null);
  const [errors, setErrors] = useState<CalculationError[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateOEE = () => {
    setErrors([]);
    setIsCalculating(true);

    const validationErrors = validateFields([
      () => validateNumber(plannedProductionTime, { min: 0, fieldName: 'Waktu Produksi' }),
      () => validateNumber(downtime, { min: 0, fieldName: 'Downtime' }),
      () => validateNumber(idealCycleTime, { min: 0, fieldName: 'Cycle Time Ideal' }),
      () => validateNumber(totalUnits, { min: 0, fieldName: 'Total Unit' }),
      () => validateNumber(goodUnits, { min: 0, fieldName: 'Good Units' }),
    ]);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      const calculatedResult = safeCalculate<OEEResult>(() => {
        const planned = Number.parseFloat(plannedProductionTime) || 0;
        const down = Number.parseFloat(downtime) || 0;
        const cycleTime = Number.parseFloat(idealCycleTime) || 0;
        const total = Number.parseFloat(totalUnits) || 0;
        const good = Number.parseFloat(goodUnits) || 0;

        const runTime = planned - down;
        const availability = safePercentage(runTime, planned);

        const idealProduction = safeDivide(runTime, cycleTime);
        const performance = safePercentage(total, idealProduction);

        const quality = safePercentage(good, total);

        const oee = (availability * performance * quality) / 10000;

        let classification = 'Poor';
        if (oee >= 85) {
          classification = 'World Class';
        } else if (oee >= 60) {
          classification = 'Good';
        } else if (oee >= 40) {
          classification = 'Fair';
        }

        const lossesBreakdown = {
          plannedDowntime: 0,
          unplannedDowntime: safePercentage(down, planned),
          speedLoss: 100 - performance,
          qualityLoss: 100 - quality,
        };

        return {
          availability,
          performance,
          quality,
          oee,
          classification,
          lossesBreakdown,
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
      'Kalkulator OEE (Overall Equipment Effectiveness)',
      {
        'Waktu Produksi (menit)': plannedProductionTime,
        'Downtime (menit)': downtime,
        'Cycle Time Ideal (menit/unit)': idealCycleTime,
        'Total Unit Diproduksi': totalUnits,
        'Good Units': goodUnits,
      },
      {
        'Availability': `${result.availability.toFixed(2)}%`,
        'Performance': `${result.performance.toFixed(2)}%`,
        'Quality': `${result.quality.toFixed(2)}%`,
        'OEE Score': `${result.oee.toFixed(2)}%`,
        'Classification': result.classification,
      },
    );

    downloadAsText(content, `oee-${Date.now()}.txt`);
  };

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const shareText = generateShareText(
      'Kalkulator OEE',
      `OEE Score: ${result.oee.toFixed(1)}% (${result.classification})`,
    );

    await shareResult('Hasil Kalkulator OEE', shareText);
  };

  const getOEEBgColor = (oee: number) => {
    if (oee >= 85) {
      return 'from-green-600 to-emerald-600';
    }
    if (oee >= 60) {
      return 'from-blue-600 to-cyan-600';
    }
    if (oee >= 40) {
      return 'from-yellow-600 to-orange-600';
    }
    return 'from-red-600 to-pink-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            <Factory className="h-4 w-4" />
            Customer Tool
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Kalkulator OEE (Overall Equipment Effectiveness)
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-400">
            Ukur efisiensi produksi dengan metode OEE. Identifikasi losses dan tingkatkan produktivitas!
          </p>
        </div>

        <ErrorDisplay errors={errors} className="mx-auto mb-6 max-w-4xl" />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Input Data Produksi</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="planned-time" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Waktu Produksi Terencana (menit)
                  </label>
                  <input
                    id="planned-time"
                    type="text"
                    value={plannedProductionTime}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setPlannedProductionTime(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="480"
                    aria-describedby="planned-time-help"
                  />
                  <p id="planned-time-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Contoh: 8 jam = 480 menit
                  </p>
                </div>

                <div>
                  <label htmlFor="downtime" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Total Downtime (menit)
                  </label>
                  <input
                    id="downtime"
                    type="text"
                    value={downtime}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setDowntime(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="60"
                    aria-describedby="downtime-help"
                  />
                  <p id="downtime-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Waktu mesin berhenti (breakdown, setup, dll)
                  </p>
                </div>

                <div>
                  <label htmlFor="cycle-time" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Cycle Time Ideal (menit/unit)
                  </label>
                  <input
                    id="cycle-time"
                    type="text"
                    value={idealCycleTime}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^\d.]/g, '');
                      setIdealCycleTime(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="1"
                    aria-describedby="cycle-time-help"
                  />
                  <p id="cycle-time-help" className="mt-1 text-xs text-gray-500 dark:text-slate-500">
                    Waktu ideal untuk memproduksi 1 unit
                  </p>
                </div>

                <div>
                  <label htmlFor="total-units" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Total Unit Diproduksi
                  </label>
                  <input
                    id="total-units"
                    type="text"
                    value={totalUnits}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setTotalUnits(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="400"
                  />
                </div>

                <div>
                  <label htmlFor="good-units" className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-300">
                    Good Units (Tanpa Defect)
                  </label>
                  <input
                    id="good-units"
                    type="text"
                    value={goodUnits}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      setGoodUnits(value);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    placeholder="380"
                  />
                </div>

                <Button
                  onClick={calculateOEE}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  size="lg"
                  disabled={isCalculating}
                  aria-label="Hitung OEE"
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
                          <Gauge className="mr-2 h-5 w-5" />
                          Hitung OEE
                        </>
                      )}
                </Button>
              </div>
            </Card>

            <Card className="border-l-4 border-indigo-500 bg-indigo-50 p-4">
              <div className="flex gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-indigo-600" />
                <div className="text-xs text-gray-700 dark:text-slate-300">
                  <p className="mb-1 font-semibold">OEE Formula:</p>
                  <p>OEE = Availability × Performance × Quality</p>
                  <ul className="mt-2 space-y-0.5">
                    <li>
                      •
                      <strong>World Class:</strong>
                      {' '}
                      ≥ 85%
                    </li>
                    <li>
                      •
                      <strong>Good:</strong>
                      {' '}
                      60-84%
                    </li>
                    <li>
                      •
                      <strong>Fair:</strong>
                      {' '}
                      40-59%
                    </li>
                    <li>
                      •
                      <strong>Poor:</strong>
                      {' '}
                      &lt; 40%
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {result
              ? (
                  <div role="region" aria-live="polite" aria-label="Hasil perhitungan OEE">
                    <Card className={`bg-gradient-to-br ${getOEEBgColor(result.oee)} p-6 text-white`}>
                      <h3 className="mb-4 text-lg font-semibold">OEE Score</h3>
                      <div className="mb-4 text-center">
                        <p className="text-6xl font-bold">
                          {result.oee.toFixed(1)}
                          %
                        </p>
                        <p className="mt-2 text-xl font-semibold">{result.classification}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3 border-t border-white/20 pt-4 text-center text-sm">
                        <div>
                          <p className="opacity-80">Availability</p>
                          <p className="text-lg font-bold">
                            {result.availability.toFixed(1)}
                            %
                          </p>
                        </div>
                        <div>
                          <p className="opacity-80">Performance</p>
                          <p className="text-lg font-bold">
                            {result.performance.toFixed(1)}
                            %
                          </p>
                        </div>
                        <div>
                          <p className="opacity-80">Quality</p>
                          <p className="text-lg font-bold">
                            {result.quality.toFixed(1)}
                            %
                          </p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <AlertCircle className="h-5 w-5 text-indigo-600" />
                        Analisis Losses
                      </h3>

                      <div className="space-y-3">
                        <div className="rounded-lg bg-red-50 p-4">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Downtime Loss</span>
                            <span className="text-lg font-bold text-red-600">
                              {result.lossesBreakdown.unplannedDowntime.toFixed(1)}
                              %
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-slate-400">
                            Mesin berhenti:
                            {' '}
                            {downtime}
                            {' '}
                            menit
                          </p>
                        </div>

                        <div className="rounded-lg bg-yellow-50 p-4">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Speed Loss</span>
                            <span className="text-lg font-bold text-yellow-600">
                              {result.lossesBreakdown.speedLoss.toFixed(1)}
                              %
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-slate-400">
                            Produksi lebih lambat dari ideal
                          </p>
                        </div>

                        <div className="rounded-lg bg-orange-50 p-4">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Quality Loss</span>
                            <span className="text-lg font-bold text-orange-600">
                              {result.lossesBreakdown.qualityLoss.toFixed(1)}
                              %
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-slate-400">
                            Defect:
                            {' '}
                            {Number.parseFloat(totalUnits) - Number.parseFloat(goodUnits)}
                            {' '}
                            unit
                          </p>
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
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">Rekomendasi Improvement</h4>
                      <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                        {result.availability < 90 && (
                          <li className="flex items-start gap-2">
                            <span className="text-red-600">•</span>
                            <span>Kurangi downtime dengan preventive maintenance</span>
                          </li>
                        )}
                        {result.performance < 95 && (
                          <li className="flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span>Optimalkan kecepatan produksi dan kurangi small stops</span>
                          </li>
                        )}
                        {result.quality < 99 && (
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600">•</span>
                            <span>Tingkatkan quality control dan kurangi defect rate</span>
                          </li>
                        )}
                      </ul>
                    </Card>
                  </div>
                )
              : (
                  <Card className="flex h-full items-center justify-center p-12 text-center">
                    <div>
                      <Factory className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 dark:text-slate-500">
                        Masukkan data produksi dan klik tombol hitung
                      </p>
                    </div>
                  </Card>
                )}
          </div>
        </div>

        {result && (
          <Card className="mt-8 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-indigo-100 p-3">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  Real-time OEE Monitoring & Analytics
                </h3>
                <p className="mb-4 text-gray-600 dark:text-slate-400">
                  Hitung OEE manual setiap hari? BizOps otomatis tracking OEE real-time,
                  analisis losses, dan rekomendasi improvement untuk setiap mesin.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                    Coba BizOps Gratis 14 Hari
                  </Button>
                  <Button variant="outline" size="lg">
                    Lihat Demo Manufacturing Module
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        <Card className="mt-8 border-l-4 border-indigo-500 bg-indigo-50 p-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-indigo-600" />
            <div className="text-sm text-gray-700 dark:text-slate-300">
              <p className="mb-2 font-semibold">Tips Meningkatkan OEE:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Implementasi TPM (Total Productive Maintenance)</li>
                <li>Standardisasi proses dan work instructions</li>
                <li>Training operator secara berkala</li>
                <li>Monitor OEE per shift untuk identifikasi pattern</li>
                <li>Focus on biggest losses first (Pareto principle)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
