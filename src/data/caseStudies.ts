/**
 * Case Studies Data
 * Detailed customer success stories
 */

export type CaseStudy = {
  slug: string;
  title: string;
  client: {
    name: string;
    industry: string;
    size: string;
    location: string;
    logo?: string;
  };
  challenge: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
    modules: string[];
    implementation: string;
  };
  results: {
    title: string;
    metrics: Array<{
      value: string;
      label: string;
      description: string;
    }>;
    testimonial: {
      quote: string;
      author: string;
      role: string;
      avatar?: string;
    };
  };
  image?: string;
  tags: string[];
};

export const caseStudiesData: Record<string, CaseStudy> = {
  'pt-teknologi-maju': {
    slug: 'pt-teknologi-maju',
    title: 'Transformasi Digital PT Teknologi Maju: Efisiensi 70% dalam 6 Bulan',
    client: {
      name: 'PT Teknologi Maju Indonesia',
      industry: 'Technology & Software',
      size: '250+ karyawan',
      location: 'Jakarta, Indonesia',
    },
    challenge: {
      title: 'Tantangan Bisnis',
      description: 'PT Teknologi Maju menghadapi kesulitan dalam mengelola operasional yang berkembang pesat dengan sistem yang terpisah-pisah.',
      painPoints: [
        'Data HR, Finance, dan Operasional tersebar di 7 sistem berbeda',
        'Proses approval memakan waktu 5-7 hari',
        'Kesulitan tracking project profitability secara real-time',
        'Payroll processing manual memakan 3 hari setiap bulan',
        'Tidak ada visibilitas end-to-end untuk manajemen',
      ],
    },
    solution: {
      title: 'Solusi BizOps',
      description: 'Implementasi platform BizOps terintegrasi dengan fokus pada otomatisasi dan real-time visibility.',
      modules: [
        'HR & Payroll Management',
        'Finance & Accounting',
        'Project Management',
        'Time Tracking & Attendance',
        'Advanced Analytics',
      ],
      implementation: '3 bulan implementasi dengan training komprehensif untuk 250+ users',
    },
    results: {
      title: 'Hasil yang Dicapai',
      metrics: [
        {
          value: '70%',
          label: 'Efisiensi Operasional',
          description: 'Pengurangan waktu proses administratif',
        },
        {
          value: '5 hari → 2 jam',
          label: 'Approval Process',
          description: 'Percepatan proses persetujuan',
        },
        {
          value: '85%',
          label: 'Cost Reduction',
          description: 'Penghematan biaya operasional',
        },
        {
          value: '100%',
          label: 'Data Accuracy',
          description: 'Eliminasi human error dalam payroll',
        },
      ],
      testimonial: {
        quote: 'BizOps mengubah cara kami bekerja secara fundamental. Yang tadinya memakan waktu berhari-hari, sekarang bisa diselesaikan dalam hitungan jam. ROI yang kami dapatkan jauh melebihi ekspektasi.',
        author: 'Budi Santoso',
        role: 'CEO',
      },
    },
    tags: ['Technology', 'HR', 'Finance', 'Project Management'],
  },
  'cv-manufaktur-jaya': {
    slug: 'cv-manufaktur-jaya',
    title: 'CV Manufaktur Jaya: Kontrol Inventory Real-Time & Profit Margin +40%',
    client: {
      name: 'CV Manufaktur Jaya',
      industry: 'Manufacturing',
      size: '150+ karyawan',
      location: 'Surabaya, Indonesia',
    },
    challenge: {
      title: 'Tantangan Bisnis',
      description: 'CV Manufaktur Jaya kesulitan mengelola inventory dan production planning dengan sistem manual.',
      painPoints: [
        'Stock opname manual memakan waktu 2 minggu setiap bulan',
        'Sering terjadi stockout dan overstock',
        'Tidak bisa tracking cost per product secara akurat',
        'Production planning tidak terintegrasi dengan sales',
        'Kesulitan forecast demand dan raw material needs',
      ],
    },
    solution: {
      title: 'Solusi BizOps',
      description: 'Implementasi modul Supply Chain dan Manufacturing dengan fokus pada inventory optimization.',
      modules: [
        'Inventory Management',
        'Production Planning',
        'Purchase Management',
        'Quality Control',
        'Cost Accounting',
      ],
      implementation: '4 bulan implementasi dengan integrasi ke existing machinery',
    },
    results: {
      title: 'Hasil yang Dicapai',
      metrics: [
        {
          value: '40%',
          label: 'Profit Margin Increase',
          description: 'Peningkatan margin melalui cost optimization',
        },
        {
          value: '60%',
          label: 'Inventory Turnover',
          description: 'Percepatan perputaran inventory',
        },
        {
          value: '95%',
          label: 'On-Time Delivery',
          description: 'Peningkatan ketepatan waktu pengiriman',
        },
        {
          value: '2 minggu → 2 jam',
          label: 'Stock Opname',
          description: 'Efisiensi proses stock taking',
        },
      ],
      testimonial: {
        quote: 'Sebelum BizOps, kami seperti mengemudi dengan mata tertutup. Sekarang kami punya visibility penuh atas seluruh operasi. Profit margin kami naik 40% dalam 6 bulan pertama.',
        author: 'Siti Rahayu',
        role: 'Operations Director',
      },
    },
    tags: ['Manufacturing', 'Inventory', 'Supply Chain', 'Production'],
  },
  'pt-retail-indonesia': {
    slug: 'pt-retail-indonesia',
    title: 'PT Retail Indonesia: Omnichannel Integration & Customer Satisfaction 98%',
    client: {
      name: 'PT Retail Indonesia',
      industry: 'Retail & E-Commerce',
      size: '500+ karyawan, 25 stores',
      location: 'Jakarta & nationwide',
    },
    challenge: {
      title: 'Tantangan Bisnis',
      description: 'PT Retail Indonesia perlu mengintegrasikan 25 toko fisik dengan platform e-commerce dan marketplace.',
      painPoints: [
        'Inventory tidak sinkron antara online dan offline',
        'Customer data tersebar di multiple systems',
        'Tidak bisa tracking customer journey cross-channel',
        'Proses fulfillment manual dan error-prone',
        'Kesulitan managing promotions across channels',
      ],
    },
    solution: {
      title: 'Solusi BizOps',
      description: 'Implementasi platform omnichannel dengan integrasi ke marketplace dan payment gateways.',
      modules: [
        'Point of Sale (POS)',
        'E-Commerce Integration',
        'Inventory Management',
        'CRM & Loyalty Program',
        'Omnichannel Analytics',
      ],
      implementation: '5 bulan implementasi dengan rollout bertahap ke 25 stores',
    },
    results: {
      title: 'Hasil yang Dicapai',
      metrics: [
        {
          value: '98%',
          label: 'Customer Satisfaction',
          description: 'Peningkatan kepuasan pelanggan',
        },
        {
          value: '150%',
          label: 'Online Sales Growth',
          description: 'Pertumbuhan penjualan online',
        },
        {
          value: '99.5%',
          label: 'Inventory Accuracy',
          description: 'Akurasi inventory real-time',
        },
        {
          value: '3x faster',
          label: 'Fulfillment Speed',
          description: 'Percepatan proses fulfillment',
        },
      ],
      testimonial: {
        quote: 'BizOps memungkinkan kami memberikan pengalaman seamless kepada customer, baik mereka belanja online atau offline. Inventory sync real-time adalah game changer untuk bisnis retail kami.',
        author: 'Ahmad Wijaya',
        role: 'Chief Digital Officer',
      },
    },
    tags: ['Retail', 'E-Commerce', 'Omnichannel', 'CRM'],
  },
};

export const caseStudiesList = Object.values(caseStudiesData);
