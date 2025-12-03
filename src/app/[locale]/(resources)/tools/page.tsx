import {
  BarChart3,
  Calculator,
  Calendar,
  DollarSign,
  Factory,
  FileCheck,
  GitCompare,
  LineChart,
  PieChart,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Badge, Button, Card } from '@/components/ui';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Business Tools & Calculators | BizOps',
  description:
    'Kumpulan tools gratis untuk membantu Anda merencanakan transformasi digital: ROI Calculator, Timeline Generator, Maturity Assessment, dan lainnya.',
});

const customerTools = [
  {
    id: 'pajak-pph21',
    title: 'Kalkulator Pajak PPh 21',
    subtitle: 'Tax Calculator',
    description: 'Hitung pajak penghasilan karyawan sesuai aturan terbaru dengan akurat.',
    icon: Calculator,
    href: '/tools/pajak-pph21',
    color: 'blue',
    badge: 'Popular',
    features: ['Progressive Tax', 'PTKP Calculation', 'Breakdown per Bracket'],
  },
  {
    id: 'gaji-bersih',
    title: 'Kalkulator Gaji Bersih',
    subtitle: 'Take Home Pay',
    description: 'Hitung gaji bersih setelah dipotong pajak dan BPJS.',
    icon: Wallet,
    href: '/tools/gaji-bersih',
    color: 'emerald',
    badge: 'Popular',
    features: ['PPh 21', 'BPJS', 'Annual Projection'],
  },
  {
    id: 'bpjs',
    title: 'Kalkulator BPJS',
    subtitle: 'Health & Employment',
    description: 'Hitung iuran BPJS Kesehatan dan Ketenagakerjaan (JHT, JP, JKK, JKM).',
    icon: Shield,
    href: '/tools/bpjs',
    color: 'teal',
    badge: null,
    features: ['Kesehatan', 'Ketenagakerjaan', 'Risk Level'],
  },
  {
    id: 'margin-markup',
    title: 'Kalkulator Margin & Markup',
    subtitle: 'Pricing Calculator',
    description: 'Hitung margin profit, markup, dan harga jual optimal untuk produk Anda.',
    icon: TrendingUp,
    href: '/tools/margin-markup',
    color: 'orange',
    badge: null,
    features: ['Margin', 'Markup', 'Sales Projection'],
  },
  {
    id: 'invoice-checker',
    title: 'Checker Kelengkapan Invoice',
    subtitle: 'Invoice Validator',
    description: 'Validasi kelengkapan dan kebenaran data invoice sebelum diproses.',
    icon: FileCheck,
    href: '/tools/invoice-checker',
    color: 'indigo',
    badge: null,
    features: ['8 Validation Checks', 'Score', 'Error Detection'],
  },
  {
    id: 'break-even-point',
    title: 'Kalkulator Break Even Point',
    subtitle: 'BEP Calculator',
    description: 'Hitung berapa unit yang harus dijual agar bisnis mencapai titik impas.',
    icon: Target,
    href: '/tools/break-even-point',
    color: 'emerald',
    badge: null,
    features: ['Contribution Margin', 'Scenario Analysis', 'Time to BEP'],
  },
  {
    id: 'efisiensi-produksi',
    title: 'Kalkulator Efisiensi Produksi',
    subtitle: 'OEE Calculator',
    description: 'Hitung Overall Equipment Effectiveness untuk mengukur efisiensi mesin.',
    icon: Factory,
    href: '/tools/efisiensi-produksi',
    color: 'slate',
    badge: null,
    features: ['Availability', 'Performance', 'Quality'],
  },
];

const consultantTools = [
  {
    id: 'needs-analysis',
    title: 'Needs Analysis',
    subtitle: 'Solution Finder',
    description: 'Temukan solusi ERP yang tepat dengan analisis kebutuhan komprehensif 7-step.',
    icon: Search,
    href: '/tools/needs-analysis',
    color: 'blue',
    badge: 'Essential',
    features: ['7-Step Wizard', 'Smart Recommendations', 'Visual Roadmap'],
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    subtitle: 'Investment Analysis',
    description: 'Hitung potensi ROI dan break-even point dari investasi ERP Anda.',
    icon: DollarSign,
    href: '/tools/roi-calculator',
    color: 'emerald',
    badge: 'Essential',
    features: ['Detailed Savings', 'Payback Period', 'Lead Form'],
  },
  {
    id: 'timeline-generator',
    title: 'Timeline Generator',
    subtitle: 'Project Planning',
    description: 'Buat estimasi timeline implementasi dengan Gantt Chart interaktif.',
    icon: Calendar,
    href: '/tools/timeline-generator',
    color: 'purple',
    badge: null,
    features: ['Gantt Chart', 'Expandable Phases', 'Risk Analysis'],
  },
  {
    id: 'assessment',
    title: 'Maturity Assessment',
    subtitle: 'Digital Readiness',
    description: 'Evaluasi tingkat kematangan digital perusahaan dengan framework CMMI.',
    icon: PieChart,
    href: '/tools/assessment',
    color: 'amber',
    badge: null,
    features: ['8 Dimensions', 'Detailed Report', 'Recommendations'],
  },
  {
    id: 'pricing-calculator',
    title: 'Pricing Calculator',
    subtitle: 'Cost Estimation',
    description: 'Dapatkan estimasi harga yang akurat berdasarkan kebutuhan spesifik Anda.',
    icon: Calculator,
    href: '/pricing/calculator',
    color: 'rose',
    badge: null,
    features: ['Custom Pricing', 'Add-ons', 'Instant Quote'],
  },
  {
    id: 'biaya-turnover',
    title: 'Kalkulator Biaya Turnover',
    subtitle: 'HR Cost Analysis',
    description: 'Hitung biaya tersembunyi yang perusahaan keluarkan akibat turnover karyawan.',
    icon: Users,
    href: '/tools/biaya-turnover',
    color: 'rose',
    badge: 'New',
    features: ['Direct Costs', 'Indirect Costs', 'ROI Insight'],
  },
  {
    id: 'comparisons',
    title: 'System Comparison',
    subtitle: 'Architecture Analysis',
    description: 'Bandingkan BizOps dengan Excel, Odoo, SAP, dan sistem lainnya secara teknis.',
    icon: GitCompare,
    href: '/comparisons',
    color: 'blue',
    badge: null,
    features: ['Technical Analysis', 'TCO Comparison', 'Bottleneck Score'],
  },
  {
    id: 'migration',
    title: 'Migration Center',
    subtitle: 'Data Migration',
    description: 'Panduan lengkap migrasi data dari Excel, Software Akuntansi, atau Legacy ERP.',
    icon: Rocket,
    href: '/migration',
    color: 'emerald',
    badge: null,
    features: ['Migration Guides', 'Templates', 'Best Practices'],
  },
  {
    id: 'roadmap',
    title: 'Product Roadmap',
    subtitle: 'Future Features',
    description: 'Lihat fitur yang sedang dikembangkan dan vote untuk prioritas Anda.',
    icon: LineChart,
    href: '/roadmap',
    color: 'purple',
    badge: null,
    features: ['Transparent', 'Community Voting', 'Quarterly Updates'],
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    hover: 'hover:border-blue-400 dark:hover:border-blue-600',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/10',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    hover: 'hover:border-emerald-400 dark:hover:border-emerald-600',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-900/10',
    border: 'border-teal-200 dark:border-teal-800',
    icon: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
    hover: 'hover:border-teal-400 dark:hover:border-teal-600',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    hover: 'hover:border-purple-400 dark:hover:border-purple-600',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-900/10',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    hover: 'hover:border-amber-400 dark:hover:border-amber-600',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-900/10',
    border: 'border-rose-200 dark:border-rose-800',
    icon: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    hover: 'hover:border-rose-400 dark:hover:border-rose-600',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-200 dark:border-orange-800',
    icon: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    hover: 'hover:border-orange-400 dark:hover:border-orange-600',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/10',
    border: 'border-indigo-200 dark:border-indigo-800',
    icon: 'text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    hover: 'hover:border-indigo-400 dark:hover:border-indigo-600',
  },
  slate: {
    bg: 'bg-slate-50 dark:bg-slate-900/10',
    border: 'border-slate-200 dark:border-slate-800',
    icon: 'text-slate-600 dark:text-slate-400',
    badge: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
    hover: 'hover:border-slate-400 dark:hover:border-slate-600',
  },
};

function ToolCard({ tool }: { tool: typeof customerTools[0] }) {
  const colors = colorClasses[tool.color as keyof typeof colorClasses];
  const Icon = tool.icon;

  return (
    <Link href={tool.href} className="group">
      <Card
        className={`relative h-full overflow-hidden border-2 p-6 transition-all duration-300 ${colors.border} ${colors.hover}`}
      >
        {/* Badge */}
        {tool.badge && (
          <div className="absolute top-4 right-4">
            <Badge className={`text-xs font-bold ${colors.badge}`}>{tool.badge}</Badge>
          </div>
        )}

        {/* Icon */}
        <div
          className={`mb-4 flex size-14 items-center justify-center rounded-2xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`size-7 ${colors.icon}`} />
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="mb-1 text-xl font-bold text-neutral-900 dark:text-white">{tool.title}</h3>
          <p className="mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">{tool.subtitle}</p>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{tool.description}</p>
        </div>

        {/* Features */}
        <ul className="space-y-2">
          {tool.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
              <div className={`size-1.5 rounded-full ${colors.bg}`} />
              {feature}
            </li>
          ))}
        </ul>

        {/* Hover Arrow */}
        <div className="text-primary-600 dark:text-primary-400 mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Try it now
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  );
}

export default function ToolsHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <Section className="pt-32 pb-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <div className="border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-400 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
              <Sparkles className="size-4" />
              Free Business Tools
            </div>
            <h1 className="mb-6 text-5xl leading-tight font-extrabold text-neutral-900 md:text-6xl dark:text-white">
              Tools untuk Bisnis Anda
              <br />
              <span className="from-primary-600 bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                100% Gratis
              </span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-neutral-600 dark:text-neutral-400">
              Dari kalkulator pajak hingga strategic planning tools. Semuanya dirancang untuk membantu bisnis Anda
              tumbuh lebih cepat.
            </p>
          </div>

          {/* Customer Tools Section */}
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <Calculator className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Customer Tools</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Kalkulator & tools untuk operasional sehari-hari
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {customerTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* Consultant Tools Section */}
          <div>
            <div className="mb-8 flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <BarChart3 className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Strategic Tools</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Tools untuk perencanaan & transformasi digital
                </p>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {consultantTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="from-primary-50 dark:from-primary-900/20 mt-20 rounded-3xl border border-neutral-200 bg-gradient-to-br to-purple-50 p-8 md:p-12 dark:border-neutral-800 dark:to-purple-900/20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-4">
                  <Rocket className="text-primary-600 dark:text-primary-400 size-8" />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">
                Butuh Solusi yang Lebih Lengkap?
              </h2>
              <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
                Tools ini gratis dan powerful, tapi untuk otomasi penuh dan integrasi sistem, Anda butuh platform
                BizOps. Coba gratis 14 hari, no credit card required.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/demo">
                  <Button size="lg" className="bg-primary-600 hover:bg-primary-700 shadow-primary-500/30 shadow-lg">
                    Coba BizOps Gratis
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Konsultasi Gratis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Benefits Section */}
      <Section className="bg-white py-20 dark:bg-slate-950">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-neutral-900 dark:text-white">Kenapa Menggunakan Tools Kami?</h2>
            <p className="mb-12 text-lg text-neutral-600 dark:text-neutral-400">
              Dirancang berdasarkan pengalaman puluhan proyek implementasi ERP yang sukses.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Target,
                  title: 'Data-Driven',
                  desc: 'Keputusan berdasarkan data dan best practice industri, bukan asumsi.',
                },
                {
                  icon: LineChart,
                  title: 'Realistic Estimates',
                  desc: 'Estimasi yang realistis berdasarkan ratusan proyek nyata.',
                },
                {
                  icon: Sparkles,
                  title: 'Actionable Insights',
                  desc: 'Bukan hanya angka, tapi rekomendasi konkret yang bisa langsung dijalankan.',
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="bg-primary-50 dark:bg-primary-900/20 mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl">
                      <Icon className="text-primary-600 dark:text-primary-400 size-8" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
