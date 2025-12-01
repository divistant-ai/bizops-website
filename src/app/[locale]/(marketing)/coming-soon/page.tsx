import Link from 'next/link';
import { Clock, ArrowRight, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Typography } from '@/components/ui';
import Container from '@/components/layout/Container';
import Stack from '@/components/ui/Stack';
import { Section } from '@/components/layout';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Coming Soon | BizOps',
  description: 'Fitur atau halaman ini sedang dalam pengembangan.',
  url: '/coming-soon',
});

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
      <Section className="text-center">
        <Container size="4xl">
          <Stack direction="vertical" gap={6} align="center" className="mb-8">
            <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <Typography variant="h1" as="h1">Coming Soon</Typography>
            <Typography variant="body" className="text-slate-600 dark:text-slate-400 max-w-md">
              Fitur atau halaman ini sedang dalam pengembangan. Kami sedang bekerja keras untuk menyediakan pengalaman terbaik untuk Anda.
            </Typography>
          </Stack>

          <Stack direction="vertical" gap={4} align="center" className="mt-12">
            <Link href="/">
              <Button size="md" variant="primary">
                Kembali ke Beranda <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Hubungi Kami untuk Update
            </Link>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}

