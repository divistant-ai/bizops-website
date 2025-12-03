'use client';

import {
  Calculator,
  Calendar,
  ChevronRight,
  DollarSign,
  Factory,
  FileCheck,
  PieChart,
  Search,
  Shield,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Tool = {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
  description: string;
  category: 'customer' | 'consultant';
};

const allTools: Tool[] = [
  // Customer Tools
  {
    id: 'pajak-pph21',
    title: 'Kalkulator Pajak PPh 21',
    icon: Calculator,
    href: '/tools/pajak-pph21',
    description: 'Hitung pajak penghasilan karyawan',
    category: 'customer',
  },
  {
    id: 'gaji-bersih',
    title: 'Kalkulator Gaji Bersih',
    icon: Wallet,
    href: '/tools/gaji-bersih',
    description: 'Hitung take home pay',
    category: 'customer',
  },
  {
    id: 'bpjs',
    title: 'Kalkulator BPJS',
    icon: Shield,
    href: '/tools/bpjs',
    description: 'Hitung iuran BPJS',
    category: 'customer',
  },
  {
    id: 'margin-markup',
    title: 'Kalkulator Margin & Markup',
    icon: TrendingUp,
    href: '/tools/margin-markup',
    description: 'Hitung harga jual optimal',
    category: 'customer',
  },
  {
    id: 'invoice-checker',
    title: 'Checker Kelengkapan Invoice',
    icon: FileCheck,
    href: '/tools/invoice-checker',
    description: 'Validasi invoice sebelum diproses',
    category: 'customer',
  },
  {
    id: 'break-even-point',
    title: 'Kalkulator Break Even Point',
    icon: Target,
    href: '/tools/break-even-point',
    description: 'Hitung titik impas bisnis',
    category: 'customer',
  },
  {
    id: 'efisiensi-produksi',
    title: 'Kalkulator Efisiensi Produksi',
    icon: Factory,
    href: '/tools/efisiensi-produksi',
    description: 'Hitung OEE mesin produksi',
    category: 'customer',
  },
  // Consultant Tools
  {
    id: 'needs-analysis',
    title: 'Needs Analysis',
    icon: Search,
    href: '/tools/needs-analysis',
    description: 'Temukan solusi yang tepat',
    category: 'consultant',
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    icon: DollarSign,
    href: '/tools/roi-calculator',
    description: 'Hitung potensi ROI',
    category: 'consultant',
  },
  {
    id: 'timeline-generator',
    title: 'Timeline Generator',
    icon: Calendar,
    href: '/tools/timeline-generator',
    description: 'Estimasi waktu implementasi',
    category: 'consultant',
  },
  {
    id: 'assessment',
    title: 'Maturity Assessment',
    icon: PieChart,
    href: '/tools/assessment',
    description: 'Evaluasi kematangan digital',
    category: 'consultant',
  },
  {
    id: 'pricing-calculator',
    title: 'Pricing Calculator',
    icon: Calculator,
    href: '/pricing/calculator',
    description: 'Estimasi biaya investasi',
    category: 'consultant',
  },
  {
    id: 'biaya-turnover',
    title: 'Kalkulator Biaya Turnover',
    icon: Users,
    href: '/tools/biaya-turnover',
    description: 'Hitung hidden cost turnover',
    category: 'consultant',
  },
];

type ToolsNavigationProps = {
  currentTool?: string;
  title?: string;
  description?: string;
  recommendedNext?: string[];
  category?: 'customer' | 'consultant' | 'all';
};

export default function ToolsNavigation({
  currentTool: _currentTool,
  title = 'Lanjutkan Eksplorasi',
  description = 'Tools lain yang mungkin berguna untuk Anda:',
  recommendedNext,
  category = 'all',
}: ToolsNavigationProps) {
  const pathname = usePathname();

  // Get recommended tools or filter by category
  let displayTools = allTools;

  // Filter by recommended IDs if provided
  if (recommendedNext) {
    displayTools = displayTools.filter(tool => recommendedNext.includes(tool.id));
  }
  // Otherwise filter by category
  else if (category !== 'all') {
    displayTools = displayTools.filter(tool => tool.category === category);
  }

  // Filter out current tool
  displayTools = displayTools.filter(tool => !pathname.includes(tool.id));

  // Limit to 3 tools
  const toolsToShow = displayTools.slice(0, 3);

  return (
    <div className="mt-16 border-t border-neutral-200 pt-10 dark:border-slate-800">
      <div className="mb-6 text-center">
        <h3 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-neutral-600 dark:text-slate-400">{description}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {toolsToShow.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="group hover:border-primary-500 dark:hover:border-primary-600 rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 mb-4 flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-6" />
              </div>
              <h4 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 font-bold text-neutral-900 dark:text-white">
                {tool.title}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">{tool.description}</p>
              <div className="text-primary-600 dark:text-primary-400 flex items-center text-xs font-bold">
                Coba Sekarang
                {' '}
                <ChevronRight className="ml-1 size-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All Tools */}
      <div className="mt-8 text-center">
        <Link
          href="/tools"
          className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors dark:text-slate-400"
        >
          Lihat Semua Tools
          {' '}
          <ChevronRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
