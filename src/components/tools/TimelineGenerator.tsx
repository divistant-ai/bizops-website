'use client';

import type { TimelineInput } from '@/data/timelineData';
import { Calendar, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge, Button, Card } from '@/components/ui';
// Assuming Select/Input exist or fallback to standard
import { modules } from '@/data/needsAnalysisData';
import { calculateTimeline } from '@/data/timelineData';

export default function TimelineGenerator() {
  const [input, setInput] = useState<TimelineInput>({
    employeeCount: 50,
    modules: [], // selected module ids
    dataReadiness: 'partial',
    teamAvailability: 'partial',
    customizationLevel: 'minor',
  });

  const result = useMemo(() => calculateTimeline(input), [input]);

  const handleModuleToggle = (modId: string) => {
    setInput((prev) => {
      const current = prev.modules;
      const next = current.includes(modId)
        ? current.filter(id => id !== modId)
        : [...current, modId];
      return { ...prev, modules: next };
    });
  };

  const today = new Date();
  const goLiveDate = new Date(today);
  goLiveDate.setDate(today.getDate() + result.totalDays);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* Sidebar Input */}
      <div className="space-y-6 lg:col-span-4">
        <Card className="border-neutral-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 flex items-center gap-2 font-bold text-neutral-900">
            <Users className="text-primary-600 h-5 w-5" />
            {' '}
            Profil Proyek
          </h3>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Jumlah Karyawan</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={input.employeeCount}
                  onChange={e => setInput({ ...input, employeeCount: Number.parseInt(e.target.value) })}
                  className="accent-primary-600 h-2 w-full cursor-pointer appearance-none rounded-lg bg-neutral-200"
                />
                <span className="text-primary-600 w-16 text-right font-bold">{input.employeeCount}</span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Kesiapan Data Master</label>
              <select
                className="focus:ring-primary-500 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2"
                value={input.dataReadiness}
                onChange={e => setInput({ ...input, dataReadiness: e.target.value as any })}
              >
                <option value="ready">Ready (Excel Rapi)</option>
                <option value="partial">Partial (Perlu Cleansing)</option>
                <option value="messy">Messy (Berantakan)</option>
                <option value="hardcopy">Hardcopy (Perlu Input)</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Ketersediaan Tim Internal</label>
              <select
                className="focus:ring-primary-500 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2"
                value={input.teamAvailability}
                onChange={e => setInput({ ...input, teamAvailability: e.target.value as any })}
              >
                <option value="full">Full Support</option>
                <option value="partial">Sambil Kerja Rutin</option>
                <option value="none">Sangat Sibuk</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Level Kustomisasi</label>
              <select
                className="focus:ring-primary-500 w-full rounded-xl border border-neutral-300 px-4 py-2 outline-none focus:ring-2"
                value={input.customizationLevel}
                onChange={e => setInput({ ...input, customizationLevel: e.target.value as any })}
              >
                <option value="none">Standard (No Code)</option>
                <option value="minor">Minor Tweaks</option>
                <option value="major">Major Customization</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">Cakupan Modul</label>
              <div className="custom-scrollbar max-h-48 space-y-2 overflow-y-auto rounded-xl border border-neutral-100 p-2 pr-2">
                {modules.map(mod => (
                  <label key={mod.id} className="flex cursor-pointer items-start gap-2 rounded-lg p-2 transition-colors hover:bg-neutral-50">
                    <input
                      type="checkbox"
                      checked={input.modules.includes(mod.id)}
                      onChange={() => handleModuleToggle(mod.id)}
                      className="text-primary-600 focus:ring-primary-500 mt-1 rounded border-neutral-300"
                    />
                    <span className="text-sm leading-tight text-neutral-600">{mod.title}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Result */}
      <div className="space-y-6 lg:col-span-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="bg-primary-50 border-primary-100 p-4 text-center">
            <div className="text-primary-600 mb-1 text-xs font-bold tracking-wider uppercase">Total Durasi</div>
            <div className="text-primary-900 text-3xl font-extrabold">
              {result.totalWeeks}
              {' '}
              <span className="text-base font-normal">Minggu</span>
            </div>
          </Card>
          <Card className="border-neutral-200 bg-white p-4 text-center">
            <div className="mb-1 text-xs font-bold tracking-wider text-neutral-500 uppercase">Go-Live Target</div>
            <div className="text-xl font-bold text-neutral-900">{goLiveDate.toLocaleDateString('id-ID', { month: 'short', year: '2-digit' })}</div>
          </Card>
          <Card className="border-neutral-200 bg-white p-4 text-center">
            <div className="mb-1 text-xs font-bold tracking-wider text-neutral-500 uppercase">Kompleksitas</div>
             <Badge variant="success">
              {result.complexity.toUpperCase()}
            </Badge>
          </Card>
          <Card className="border-neutral-200 bg-white p-4 text-center">
            <div className="mb-1 text-xs font-bold tracking-wider text-neutral-500 uppercase">Resiko</div>
            <div className={`font-bold ${result.riskFactor === 'high' ? 'text-red-600' : 'text-green-600'}`}>
              {result.riskFactor === 'high' ? 'TINGGI' : 'RENDAH'}
            </div>
          </Card>
        </div>

        {/* Gantt Chart Visual */}
        <Card className="overflow-hidden border-neutral-200 bg-white p-6">
          <h3 className="mb-6 flex items-center gap-2 font-bold text-neutral-900">
            <Calendar className="text-primary-600 h-5 w-5" />
            {' '}
            Timeline Implementasi
          </h3>

          <div className="relative">
            {/* Grid Lines */}
            <div className="pointer-events-none absolute inset-0 flex justify-between opacity-20">
              {[...Array.from({ length: 6 })].map((_, i) => (
                <div key={i} className="h-full w-px border-l border-dashed bg-neutral-400"></div>
              ))}
            </div>

            <div className="relative z-10 space-y-4">
              {result.phases.map((phase) => {
                // Calculate width percentage based on totalDays
                // Max width is 100% = totalDays
                const widthPercent = (phase.duration / result.totalDays) * 100;
                const leftPercent = (phase.startDay / result.totalDays) * 100;

                return (
                  <div key={phase.id} className="group">
                    <div className="mb-1 flex justify-between px-1 text-xs text-neutral-500">
                      <span className="font-bold text-neutral-700">{phase.title}</span>
                      <span>
                        {phase.duration}
                        {' '}
                        Hari
                      </span>
                    </div>
                    <div className="relative h-8 w-full overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className={`absolute top-0 bottom-0 rounded-full ${phase.color} flex items-center px-3 opacity-80 shadow-sm transition-all group-hover:opacity-100`}
                        style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                      >
                        <span className="truncate text-[10px] font-bold text-white">
                          Minggu
                          {' '}
                          {Math.ceil((phase.startDay + 1) / 7)}
                          {' '}
                          -
                          {' '}
                          {Math.ceil((phase.endDay) / 7)}
                        </span>
                      </div>
                    </div>

                    {/* Hover Detail */}
                    <div className="animate-fade-in mt-2 hidden rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600 group-hover:block">
                      <strong>Deliverables:</strong>
                      {' '}
                      {phase.deliverables.join(', ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Phase Details List */}
        <div className="space-y-4">
          <h3 className="font-bold text-neutral-900">Detail Fase & Persiapan</h3>
           {result.phases.map((phase) => (
            <div key={phase.id} className="hover:border-primary-200 rounded-xl border border-neutral-200 bg-white p-4 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-lg ${phase.color} bg-opacity-10 flex items-center justify-center text-neutral-700`}>
                  <phase.icon className="h-5 w-5" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-neutral-900">{phase.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {phase.duration}
                      {' '}
                      Hari
                    </Badge>
                  </div>
                  <p className="mb-3 text-sm text-neutral-600">{phase.description}</p>

                  <div className="grid gap-4 text-xs md:grid-cols-2">
                    <div>
                      <strong className="mb-1 block text-neutral-900">Persiapan Anda:</strong>
                      <ul className="list-inside list-disc space-y-1 text-neutral-500">
                        {phase.preparation.map((prep, idx) => (
                          <li key={idx}>{prep}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <strong className="mb-1 block text-neutral-900">Resiko Potensial:</strong>
                      <ul className="list-inside list-disc space-y-1 text-red-500">
                        {phase.risks.map((risk, idx) => (
                          <li key={idx}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-neutral-900 p-6 text-white md:flex-row">
          <div>
            <h3 className="mb-2 text-lg font-bold">Butuh Timeline Resmi untuk Proposal?</h3>
            <p className="text-sm text-neutral-400">Download PDF timeline ini lengkap dengan Quotation harga.</p>
          </div>
          <Button className="bg-primary-600 hover:bg-primary-700 whitespace-nowrap text-white">
            Download Proposal PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
