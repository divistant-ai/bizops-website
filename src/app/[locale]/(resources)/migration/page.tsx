import Link from 'next/link';
import { migrationData } from '@/data/resourcesContent';
import { FileSpreadsheet, Cloud, Server, Download, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import { Grid } from '@/components/ui';
import { Section } from '@/components/layout';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Migration Center | Panduan Migrasi ke BizOps',
  description: 'Panduan lengkap migrasi data dari Excel, Software Akuntansi, atau Legacy ERP ke BizOps.',
  url: '/migration',
});

export default function MigrationPage() {
  const getIcon = (id: string) => {
    switch (id) {
      case 'spreadsheet': return FileSpreadsheet;
      case 'saas': return Cloud;
      case 'legacy': return Server;
      default: return FileSpreadsheet;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Section className="pt-32 pb-20">
        <Container size="7xl">
          <div className="text-center mb-16">
            <Typography variant="h1" as="h1" className="mb-6">
              Migration Center
            </Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Panduan lengkap untuk migrasi data Anda dari sistem lama ke BizOps. Setiap sumber memiliki tantangan unik—kami siap membantu.
            </Typography>
          </div>

          <Grid cols={3} gap={8}>
            {migrationData.map((item) => {
              const Icon = getIcon(item.id);
              return (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <Typography variant="h3" as="h3" className="font-bold mb-2">{item.title}</Typography>
                  <Typography variant="body" className="text-slate-500 dark:text-slate-400 mb-6">{item.desc}</Typography>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        <Typography variant="small" className="font-bold text-red-700 dark:text-red-400">Challenge</Typography>
                      </div>
                      <Typography variant="small" className="text-slate-700 dark:text-slate-300">{item.challenge}</Typography>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <Typography variant="small" className="font-bold text-green-700 dark:text-green-400">Solution</Typography>
                      </div>
                      <Typography variant="small" className="text-slate-700 dark:text-slate-300">{item.solution}</Typography>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" /> {item.asset}
                  </Button>
                </div>
              );
            })}
          </Grid>
        </Container>
      </Section>

      <Section className="bg-slate-900 text-white dark">
        <Container size="7xl" className="text-center">
          <Typography variant="h2" as="h2" className="mb-6">Butuh Bantuan Migrasi?</Typography>
          <Typography variant="body" className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Tim implementasi kami siap membantu migrasi data Anda dengan aman dan efisien.
          </Typography>
          <Link href="/demo">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Konsultasi Gratis <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Container>
      </Section>
    </div>
  );
}
