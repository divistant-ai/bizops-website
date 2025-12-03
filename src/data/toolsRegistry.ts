import type { LucideIcon } from 'lucide-react';
import {
  Calculator,
  Calendar,
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

export type ToolMetadata = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  category: 'customer' | 'consultant';
  badge?: string | null;
  features: string[];
  keywords: string[];
  relatedTools?: string[];
};

export const toolsRegistry: ToolMetadata[] = [
  // Customer Tools
  {
    id: 'pajak-pph21',
    title: 'Kalkulator Pajak PPh 21',
    subtitle: 'Tax Calculator',
    description: 'Hitung pajak penghasilan karyawan sesuai aturan terbaru dengan akurat.',
    icon: Calculator,
    href: '/tools/pajak-pph21',
    color: 'blue',
    category: 'customer',
    badge: 'Popular',
    features: ['Progressive Tax', 'PTKP Calculation', 'Breakdown per Bracket'],
    keywords: ['pajak', 'pph', 'pph21', 'tax', 'payroll', 'gaji', 'karyawan'],
    relatedTools: ['gaji-bersih', 'bpjs'],
  },
  {
    id: 'gaji-bersih',
    title: 'Kalkulator Gaji Bersih',
    subtitle: 'Take Home Pay',
    description: 'Hitung gaji bersih setelah dipotong pajak dan BPJS.',
    icon: Wallet,
    href: '/tools/gaji-bersih',
    color: 'emerald',
    category: 'customer',
    badge: 'Popular',
    features: ['PPh 21', 'BPJS', 'Annual Projection'],
    keywords: ['gaji', 'salary', 'take home pay', 'payroll', 'bersih', 'nett'],
    relatedTools: ['pajak-pph21', 'bpjs'],
  },
  {
    id: 'bpjs',
    title: 'Kalkulator BPJS',
    subtitle: 'Health & Employment',
    description: 'Hitung iuran BPJS Kesehatan dan Ketenagakerjaan (JHT, JP, JKK, JKM).',
    icon: Shield,
    href: '/tools/bpjs',
    color: 'teal',
    category: 'customer',
    badge: null,
    features: ['Kesehatan', 'Ketenagakerjaan', 'Risk Level'],
    keywords: ['bpjs', 'kesehatan', 'ketenagakerjaan', 'jht', 'jp', 'jkk', 'jkm', 'iuran'],
    relatedTools: ['gaji-bersih', 'pajak-pph21'],
  },
  {
    id: 'margin-markup',
    title: 'Kalkulator Margin & Markup',
    subtitle: 'Pricing Calculator',
    description: 'Hitung margin profit, markup, dan harga jual optimal untuk produk Anda.',
    icon: TrendingUp,
    href: '/tools/margin-markup',
    color: 'orange',
    category: 'customer',
    badge: null,
    features: ['Margin', 'Markup', 'Sales Projection'],
    keywords: ['margin', 'markup', 'pricing', 'harga', 'jual', 'profit', 'untung'],
    relatedTools: ['break-even-point', 'roi-calculator'],
  },
  {
    id: 'invoice-checker',
    title: 'Checker Kelengkapan Invoice',
    subtitle: 'Invoice Validator',
    description: 'Validasi kelengkapan dan kebenaran data invoice sebelum diproses.',
    icon: FileCheck,
    href: '/tools/invoice-checker',
    color: 'indigo',
    category: 'customer',
    badge: null,
    features: ['8 Validation Checks', 'Score', 'Error Detection'],
    keywords: ['invoice', 'faktur', 'validasi', 'checker', 'kelengkapan', 'npwp', 'ppn'],
    relatedTools: ['pajak-pph21'],
  },
  {
    id: 'break-even-point',
    title: 'Kalkulator Break Even Point',
    subtitle: 'BEP Calculator',
    description: 'Hitung berapa unit yang harus dijual agar bisnis mencapai titik impas.',
    icon: Target,
    href: '/tools/break-even-point',
    color: 'emerald',
    category: 'customer',
    badge: null,
    features: ['Contribution Margin', 'Scenario Analysis', 'Time to BEP'],
    keywords: ['bep', 'break even', 'titik impas', 'profit', 'loss', 'balik modal'],
    relatedTools: ['margin-markup', 'roi-calculator'],
  },
  {
    id: 'efisiensi-produksi',
    title: 'Kalkulator Efisiensi Produksi',
    subtitle: 'OEE Calculator',
    description: 'Hitung Overall Equipment Effectiveness untuk mengukur efisiensi mesin.',
    icon: Factory,
    href: '/tools/efisiensi-produksi',
    color: 'slate',
    category: 'customer',
    badge: null,
    features: ['Availability', 'Performance', 'Quality'],
    keywords: ['oee', 'efisiensi', 'produksi', 'manufacturing', 'mesin', 'availability', 'performance', 'quality'],
    relatedTools: ['break-even-point'],
  },
  // Consultant Tools
  {
    id: 'needs-analysis',
    title: 'Needs Analysis',
    subtitle: 'Solution Finder',
    description: 'Temukan solusi ERP yang tepat dengan analisis kebutuhan komprehensif 7-step.',
    icon: Search,
    href: '/tools/needs-analysis',
    color: 'blue',
    category: 'consultant',
    badge: 'Essential',
    features: ['7-Step Wizard', 'Smart Recommendations', 'Visual Roadmap'],
    keywords: ['needs', 'analysis', 'solution', 'finder', 'erp', 'kebutuhan', 'analisis'],
    relatedTools: ['assessment', 'roi-calculator'],
  },
  {
    id: 'roi-calculator',
    title: 'ROI Calculator',
    subtitle: 'Investment Analysis',
    description: 'Hitung potensi ROI dan break-even point dari investasi ERP Anda.',
    icon: DollarSign,
    href: '/tools/roi-calculator',
    color: 'emerald',
    category: 'consultant',
    badge: 'Essential',
    features: ['Detailed Savings', 'Payback Period', 'Lead Form'],
    keywords: ['roi', 'return', 'investment', 'payback', 'savings', 'hemat', 'investasi'],
    relatedTools: ['needs-analysis', 'timeline-generator'],
  },
  {
    id: 'timeline-generator',
    title: 'Timeline Generator',
    subtitle: 'Project Planning',
    description: 'Buat estimasi timeline implementasi dengan Gantt Chart interaktif.',
    icon: Calendar,
    href: '/tools/timeline-generator',
    color: 'purple',
    category: 'consultant',
    badge: null,
    features: ['Gantt Chart', 'Expandable Phases', 'Risk Analysis'],
    keywords: ['timeline', 'gantt', 'project', 'planning', 'implementasi', 'jadwal'],
    relatedTools: ['roi-calculator', 'needs-analysis'],
  },
  {
    id: 'assessment',
    title: 'Maturity Assessment',
    subtitle: 'Digital Readiness',
    description: 'Evaluasi tingkat kematangan digital perusahaan dengan framework CMMI.',
    icon: PieChart,
    href: '/tools/assessment',
    color: 'amber',
    category: 'consultant',
    badge: null,
    features: ['8 Dimensions', 'Detailed Report', 'Recommendations'],
    keywords: ['maturity', 'assessment', 'digital', 'readiness', 'cmmi', 'kematangan', 'evaluasi'],
    relatedTools: ['needs-analysis', 'roi-calculator'],
  },
  {
    id: 'pricing-calculator',
    title: 'Pricing Calculator',
    subtitle: 'Cost Estimation',
    description: 'Dapatkan estimasi harga yang akurat berdasarkan kebutuhan spesifik Anda.',
    icon: Calculator,
    href: '/pricing/calculator',
    color: 'rose',
    category: 'consultant',
    badge: null,
    features: ['Custom Pricing', 'Add-ons', 'Instant Quote'],
    keywords: ['pricing', 'cost', 'estimation', 'harga', 'biaya', 'estimasi', 'quote'],
    relatedTools: ['roi-calculator', 'needs-analysis'],
  },
  {
    id: 'biaya-turnover',
    title: 'Kalkulator Biaya Turnover',
    subtitle: 'HR Cost Analysis',
    description: 'Hitung biaya tersembunyi yang perusahaan keluarkan akibat turnover karyawan.',
    icon: Users,
    href: '/tools/biaya-turnover',
    color: 'rose',
    category: 'consultant',
    badge: 'New',
    features: ['Direct Costs', 'Indirect Costs', 'ROI Insight'],
    keywords: ['turnover', 'hr', 'karyawan', 'resign', 'biaya', 'hidden cost', 'retention'],
    relatedTools: ['roi-calculator'],
  },
];

// Helper functions
export function getToolById(id: string): ToolMetadata | undefined {
  return toolsRegistry.find(tool => tool.id === id);
}

export function getToolsByCategory(category: 'customer' | 'consultant'): ToolMetadata[] {
  return toolsRegistry.filter(tool => tool.category === category);
}

export function getRelatedTools(toolId: string, limit: number = 3): ToolMetadata[] {
  const tool = getToolById(toolId);
  if (!tool || !tool.relatedTools) {
    return [];
  }

  return tool.relatedTools
    .map(id => getToolById(id))
    .filter((t): t is ToolMetadata => t !== undefined)
    .slice(0, limit);
}

export function searchTools(query: string): ToolMetadata[] {
  const lowerQuery = query.toLowerCase();
  return toolsRegistry.filter(tool =>
    tool.title.toLowerCase().includes(lowerQuery)
    || tool.description.toLowerCase().includes(lowerQuery)
    || tool.keywords.some(keyword => keyword.includes(lowerQuery)),
  );
}

export const customerTools = getToolsByCategory('customer');
export const consultantTools = getToolsByCategory('consultant');
