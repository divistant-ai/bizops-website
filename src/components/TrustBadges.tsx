'use client';

import { Award, CheckCircle, Lock, Shield, Star, Zap } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: 'ISO 27001',
      subtitle: 'Certified',
      color: 'blue',
    },
    {
      icon: Lock,
      title: 'GDPR',
      subtitle: 'Compliant',
      color: 'green',
    },
    {
      icon: CheckCircle,
      title: '99.9%',
      subtitle: 'Uptime SLA',
      color: 'indigo',
    },
    {
      icon: Star,
      title: '4.9/5',
      subtitle: 'Customer Rating',
      color: 'yellow',
    },
    {
      icon: Award,
      title: 'SOC 2',
      subtitle: 'Type II',
      color: 'purple',
    },
    {
      icon: Zap,
      title: '24/7',
      subtitle: 'Support',
      color: 'orange',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {badges.map((badge, idx) => {
        const Icon = badge.icon;
        const colorClass = colorClasses[badge.color as keyof typeof colorClasses];

        return (
          <div
            key={idx}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all hover:shadow-lg ${colorClass}`}
          >
            <Icon className="h-8 w-8" />
            <div>
              <div className="text-sm font-bold">{badge.title}</div>
              <div className="text-xs opacity-75">{badge.subtitle}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
