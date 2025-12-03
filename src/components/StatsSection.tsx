'use client';

import { Building2, Clock, TrendingUp, Users } from 'lucide-react';
import AnimatedCounter from './ui/AnimatedCounter';

export default function StatsSection() {
  const stats = [
    {
      icon: Building2,
      value: 1000,
      suffix: '+',
      label: 'Perusahaan Terpercaya',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Users,
      value: 50000,
      suffix: '+',
      label: 'Pengguna Aktif',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: TrendingUp,
      value: 99.9,
      decimals: 1,
      suffix: '%',
      label: 'Uptime Guarantee',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Clock,
      value: 24,
      suffix: '/7',
      label: 'Support Available',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-lg lg:p-8"
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor}`}>
              <Icon className={`h-7 w-7 ${stat.color}`} />
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-slate-900 lg:text-4xl">
                <AnimatedCounter
                  to={stat.value}
                  duration={2500}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className="text-sm font-medium text-slate-600">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
