/**
 * Comparison Data
 * BizOps vs Competitors
 */

export type ComparisonFeature = {
  category: string;
  features: Array<{
    name: string;
    bizops: boolean | string;
    competitor: boolean | string;
    highlight?: boolean;
  }>;
};

export type ComparisonData = {
  slug: string;
  competitor: {
    name: string;
    tagline: string;
  };
  hero: {
    title: string;
    description: string;
  };
  features: ComparisonFeature[];
  conclusion: {
    title: string;
    points: string[];
  };
};

export const comparisonsData: Record<string, ComparisonData> = {
  'vs-sap': {
    slug: 'vs-sap',
    competitor: {
      name: 'SAP',
      tagline: 'Enterprise ERP Global',
    },
    hero: {
      title: 'BizOps vs SAP: Solusi ERP untuk Bisnis Indonesia',
      description: 'Perbandingan lengkap antara BizOps dan SAP untuk membantu Anda memilih platform ERP yang tepat.',
    },
    features: [
      {
        category: 'Harga & Investasi',
        features: [
          {
            name: 'Biaya Implementasi',
            bizops: 'Rp 50-200 juta',
            competitor: 'Rp 500 juta - 5 miliar',
            highlight: true,
          },
          {
            name: 'Biaya Lisensi Tahunan',
            bizops: 'Mulai Rp 10 juta/tahun',
            competitor: 'Mulai Rp 100 juta/tahun',
            highlight: true,
          },
          {
            name: 'Biaya Training',
            bizops: 'Included',
            competitor: 'Rp 50-100 juta',
          },
          {
            name: 'ROI Timeline',
            bizops: '3-6 bulan',
            competitor: '12-24 bulan',
          },
        ],
      },
      {
        category: 'Kemudahan Penggunaan',
        features: [
          {
            name: 'User Interface',
            bizops: 'Modern & Intuitif',
            competitor: 'Complex & Technical',
            highlight: true,
          },
          {
            name: 'Training Duration',
            bizops: '1-2 minggu',
            competitor: '3-6 bulan',
          },
          {
            name: 'Mobile App',
            bizops: true,
            competitor: 'Limited',
          },
          {
            name: 'Bahasa Indonesia',
            bizops: 'Full Support',
            competitor: 'Partial',
            highlight: true,
          },
        ],
      },
      {
        category: 'Fitur & Fungsionalitas',
        features: [
          {
            name: 'HR & Payroll',
            bizops: true,
            competitor: true,
          },
          {
            name: 'Finance & Accounting',
            bizops: true,
            competitor: true,
          },
          {
            name: 'Supply Chain',
            bizops: true,
            competitor: true,
          },
          {
            name: 'Compliance Indonesia',
            bizops: 'PPh21, BPJS, e-Faktur',
            competitor: 'Requires Customization',
            highlight: true,
          },
          {
            name: 'WhatsApp Integration',
            bizops: true,
            competitor: false,
            highlight: true,
          },
        ],
      },
      {
        category: 'Support & Maintenance',
        features: [
          {
            name: 'Local Support Team',
            bizops: 'Jakarta-based',
            competitor: 'International',
            highlight: true,
          },
          {
            name: 'Response Time',
            bizops: '< 2 jam',
            competitor: '24-48 jam',
          },
          {
            name: 'Support Bahasa Indonesia',
            bizops: true,
            competitor: 'Limited',
            highlight: true,
          },
          {
            name: 'Support Hours',
            bizops: '24/7',
            competitor: 'Business Hours',
          },
        ],
      },
    ],
    conclusion: {
      title: 'Kapan Memilih BizOps?',
      points: [
        'Perusahaan menengah dengan budget terbatas (< Rp 500 juta)',
        'Membutuhkan implementasi cepat (< 6 bulan)',
        'Prioritas kemudahan penggunaan dan training minimal',
        'Butuh compliance Indonesia (PPh21, BPJS, e-Faktur)',
        'Ingin support lokal dengan response time cepat',
      ],
    },
  },
  'vs-odoo': {
    slug: 'vs-odoo',
    competitor: {
      name: 'Odoo',
      tagline: 'Open Source ERP',
    },
    hero: {
      title: 'BizOps vs Odoo: Mana yang Lebih Cocok untuk Bisnis Anda?',
      description: 'Perbandingan mendalam antara BizOps dan Odoo untuk membantu keputusan ERP Anda.',
    },
    features: [
      {
        category: 'Model Bisnis',
        features: [
          {
            name: 'Licensing',
            bizops: 'SaaS Subscription',
            competitor: 'Open Source + Paid Modules',
          },
          {
            name: 'Total Cost of Ownership',
            bizops: 'Predictable',
            competitor: 'Variable',
            highlight: true,
          },
          {
            name: 'Hidden Costs',
            bizops: 'None',
            competitor: 'Module fees, hosting, maintenance',
            highlight: true,
          },
        ],
      },
      {
        category: 'Implementasi',
        features: [
          {
            name: 'Implementation Time',
            bizops: '2-4 bulan',
            competitor: '4-8 bulan',
            highlight: true,
          },
          {
            name: 'Technical Expertise Required',
            bizops: 'None',
            competitor: 'High (Python, PostgreSQL)',
          },
          {
            name: 'Hosting',
            bizops: 'Included (Cloud)',
            competitor: 'Self-host or pay extra',
          },
        ],
      },
      {
        category: 'Fitur Out-of-the-Box',
        features: [
          {
            name: 'Indonesian Compliance',
            bizops: 'Built-in',
            competitor: 'Requires customization',
            highlight: true,
          },
          {
            name: 'Multi-Company',
            bizops: 'Included',
            competitor: 'Paid module',
          },
          {
            name: 'Advanced Analytics',
            bizops: 'Included',
            competitor: 'Paid module',
          },
        ],
      },
    ],
    conclusion: {
      title: 'Kapan Memilih BizOps?',
      points: [
        'Tidak punya tim IT internal yang kuat',
        'Ingin biaya yang predictable tanpa surprise',
        'Butuh implementasi cepat dengan minimal customization',
        'Prioritas compliance Indonesia built-in',
        'Ingin fokus ke bisnis, bukan maintain server',
      ],
    },
  },
};

export const comparisonsList = Object.values(comparisonsData);
