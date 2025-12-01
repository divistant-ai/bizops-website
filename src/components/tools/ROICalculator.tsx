'use client';

import { AlertCircle, ArrowRight, Calculator, Clock, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button, Card } from '@/components/ui';
import { Input } from '@/components/ui/Form';
import { pricingPlans } from '@/data/pricingData';

const formatIDR = (val: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

export default function ROICalculator() {
  const [inputs, setInputs] = useState({
    employeeCount: 50,
    avgSalary: 6000000,
    inefficientHours: 5, // hours per week per employee
    otherCosts: 2000000, // monthly paper/printing/tools
  });

  const [results, setResults] = useState({
    monthlyInefficiencyCost: 0,
    potentialSavings: 0,
    softwareCost: 0,
    netSavings: 0,
    roiPercentage: 0,
    recommendedPlan: pricingPlans[0],
  });

  useEffect(() => {
    // 1. Calculate Monthly Inefficiency Cost
    // Formula: Employees * (Salary / 173 hours) * Inefficient Hours/Week * 4.3 weeks
    const hourlyRate = inputs.avgSalary / 173;
    const monthlyLostHours = inputs.inefficientHours * 4.3;
    const laborCostInefficiency = inputs.employeeCount * hourlyRate * monthlyLostHours;

    const totalInefficiency = laborCostInefficiency + Number(inputs.otherCosts);

    // 2. Estimate Savings (Assume 70% efficiency gain with ERP)
    const efficiencyFactor = 0.7;
    const potentialSavings = totalInefficiency * efficiencyFactor;

    // 3. Determine Software Cost based on recommended plan
    let plan = pricingPlans.find(p => p.id === 'business');
    if (inputs.employeeCount > 50 && inputs.employeeCount <= 200) {
      plan = pricingPlans.find(p => p.id === 'growth');
    } else if (inputs.employeeCount > 200) {
      plan = pricingPlans.find(p => p.id === 'enterprise');
    }
    
    // Ensure plan is always defined
    if (!plan && pricingPlans.length > 0) {
      plan = pricingPlans[0];
    }

    // For Enterprise, use a placeholder base price if 0
    const planCost = plan?.priceMonthly || 15000000;

    // 4. Calculate ROI
    const netSavings = potentialSavings - planCost;
    const roi = (netSavings / planCost) * 100;

    setResults({
      monthlyInefficiencyCost: totalInefficiency,
      potentialSavings,
      softwareCost: planCost,
      netSavings,
      roiPercentage: roi,
      recommendedPlan: plan,
    });
  }, [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number.parseFloat(value) || 0,
    }));
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* Input Section */}
      <div className="space-y-6 lg:col-span-5">
        <Card className="border-neutral-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-neutral-100 pb-4">
            <div className="bg-primary-50 text-primary-600 flex h-10 w-10 items-center justify-center rounded-full">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">Parameter Bisnis</h3>
              <p className="text-xs text-neutral-500">Sesuaikan dengan kondisi saat ini</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Jumlah Karyawan (Total)
              </label>
              <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-neutral-400" />
                <input
                  type="range"
                  name="employeeCount"
                  min="5"
                  max="500"
                  step="5"
                  value={inputs.employeeCount}
                  onChange={handleChange}
                  className="accent-primary-600 h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200"
                />
                <span className="text-primary-600 w-12 text-right font-bold">{inputs.employeeCount}</span>
              </div>
            </div>

            <Input
              label="Rata-rata Gaji per Bulan (IDR)"
              name="avgSalary"
              type="number"
              value={inputs.avgSalary}
              onChange={handleChange}
              className="text-right font-mono"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Jam Terbuang untuk Admin Manual / Minggu
              </label>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-neutral-400" />
                <input
                  type="range"
                  name="inefficientHours"
                  min="1"
                  max="40"
                  step="1"
                  value={inputs.inefficientHours}
                  onChange={handleChange}
                  className="accent-primary-600 h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200"
                />
                <span className="text-primary-600 w-12 text-right font-bold">
                  {inputs.inefficientHours}
                  {' '}
                  Jam
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                *Waktu untuk rekap data, cari dokumen, fix error Excel, dll per orang.
              </p>
            </div>

            <Input
              label="Biaya Operasional Lain (Kertas/Printing/Tools) per Bulan"
              name="otherCosts"
              type="number"
              value={inputs.otherCosts}
              onChange={handleChange}
              className="text-right font-mono"
            />
          </div>
        </Card>

        <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p>
            Kalkulasi ini menggunakan asumsi efisiensi 70% setelah implementasi sistem ERP terintegrasi. Hasil aktual dapat bervariasi.
          </p>
        </div>
      </div>

      {/* Result Section */}
      <div className="space-y-6 lg:col-span-7">
        {/* Main ROI Card */}
        <Card className="relative overflow-hidden border-neutral-800 bg-neutral-900 p-8 text-white">
          <div className="bg-primary-500/20 pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-1 font-medium text-neutral-400">Estimasi ROI (Return on Investment)</p>
                <div className="text-primary-400 text-5xl font-extrabold tracking-tight md:text-6xl">
                  {results.roiPercentage.toFixed(0)}
                  %
                </div>
                <p className="mt-2 text-sm text-neutral-400">
                  Modal kembali dalam
                  {' '}
                  <span className="font-bold text-white">
                    {'<'}
                    {' '}
                    1 Bulan
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="mb-1 font-medium text-neutral-400">Potensi Penghematan Bersih / Tahun</p>
                <div className="text-2xl font-bold text-green-400 md:text-4xl">
                  {formatIDR(results.netSavings * 12)}
                </div>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="space-y-4 border-t border-white/10 pt-6">
              {/* Before */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-neutral-400">Biaya Inefisiensi Saat Ini</span>
                  <span className="font-mono">
                    {formatIDR(results.monthlyInefficiencyCost)}
                    {' '}
                    / bln
                  </span>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="animate-pulse-slow h-full w-full bg-red-500/80"></div>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-neutral-400">Biaya dengan BizOps (Langganan)</span>
                  <span className="text-primary-300 font-mono">
                    {formatIDR(results.softwareCost)}
                    {' '}
                    / bln
                  </span>
                </div>
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-white/10">
                  {/* The bar length is proportional to software cost vs inefficiency cost */}
                  <div
                    className="bg-primary-500 absolute top-0 left-0 h-full transition-all duration-1000"
                    style={{ width: `${Math.min((results.softwareCost / results.monthlyInefficiencyCost) * 100, 100)}%` }}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Breakdown & Recommendation */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-neutral-200 bg-white p-6">
            <h4 className="mb-4 flex items-center gap-2 font-bold text-neutral-900">
              <TrendingUp className="h-4 w-4 text-green-600" />
              {' '}
              Analisis Efisiensi
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-600">Total Biaya Terbuang</span>
                <span className="font-bold text-red-600">{formatIDR(results.monthlyInefficiencyCost)}</span>
              </li>
              <li className="flex justify-between border-b border-neutral-100 py-2">
                <span className="text-neutral-600">Potensi Hemat (70%)</span>
                <span className="font-bold text-green-600">{formatIDR(results.potentialSavings)}</span>
              </li>
              <li className="flex justify-between py-2">
                <span className="text-neutral-600">Net Saving Bulanan</span>
                <span className="font-bold text-neutral-900">{formatIDR(results.netSavings)}</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-primary-50 border-primary-100 p-6">
            <h4 className="text-primary-900 mb-2 font-bold">Rekomendasi Paket</h4>
            <div className="text-primary-700 mb-1 text-2xl font-extrabold">
              {results.recommendedPlan?.name || 'Business'}
              {' '}
              Plan
            </div>
            <p className="text-primary-800/80 mb-6 text-sm">
              Cocok untuk skala bisnis Anda (
              {inputs.employeeCount}
              {' '}
              karyawan).
            </p>

            <div className="mb-6 space-y-2">
              {results.recommendedPlan?.features?.slice(0, 3).map((f, i) => (
                <div key={i} className="text-primary-800 flex items-center gap-2 text-sm">
                  <div className="bg-primary-500 h-1.5 w-1.5 rounded-full"></div>
                  {f}
                </div>
              ))}
            </div>

            <Button className="bg-primary-600 hover:bg-primary-700 shadow-primary-500/20 w-full text-white shadow-lg">
              Pelajari Paket
              {' '}
              {results.recommendedPlan?.name || 'Business'}
              {' '}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
