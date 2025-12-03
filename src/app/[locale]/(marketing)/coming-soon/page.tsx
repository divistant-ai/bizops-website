import { ArrowRight, Clock, Mail } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/layout';
import Container from '@/components/layout/Container';
import { Typography } from '@/components/ui';
import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Coming Soon | BizOps',
  description: 'Fitur atau halaman ini sedang dalam pengembangan.',
  url: '/coming-soon',
});

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Section className="text-center">
        <Container size="4xl">
          <Stack direction="vertical" gap={6} align="center" className="mb-8">
            <div className="bg-primary-100 dark:bg-primary-900/20 flex h-20 w-20 items-center justify-center rounded-full">
              <Clock className="text-primary-600 dark:text-primary-400 h-10 w-10" />
            </div>
            <Typography variant="h1" as="h1">Coming Soon</Typography>
            <Typography variant="body" className="max-w-md text-slate-600 dark:text-slate-400">
              Fitur atau halaman ini sedang dalam pengembangan. Kami sedang bekerja keras untuk menyediakan pengalaman terbaik untuk Anda.
            </Typography>
          </Stack>

          <Stack direction="vertical" gap={4} align="center" className="mt-12">
            <Link href="/">
              <Button size="md" variant="primary">
                Kembali ke Beranda
                {' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Mail className="h-4 w-4" />
              {' '}
              Hubungi Kami untuk Update
            </Link>
          </Stack>
        </Container>
      </Section>
    </div>
  );
}
