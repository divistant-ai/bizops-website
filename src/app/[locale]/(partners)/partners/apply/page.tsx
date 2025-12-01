import { CheckCircle2 } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';

export default function PartnerApplyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="pt-32 pb-20">
        <Container size="4xl">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm md:p-12">
            <h1 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">Bergabung dengan Ekosistem BizOps</h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-neutral-600">
              Isi formulir singkat ini untuk memulai proses aplikasi kemitraan. Tim Channel Manager kami akan menghubungi Anda dalam 2x24 jam.
            </p>

            {/* Placeholder for actual form integration (e.g. Typeform or Hubspot) */}
            <div className="mb-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-10">
              <p className="mb-6 text-neutral-500 italic">[Formulir Aplikasi Partner akan dimuat di sini]</p>
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 rounded-full text-white">
                Buka Formulir Aplikasi (External)
              </Button>
            </div>

            <div className="mx-auto max-w-lg text-left">
              <h3 className="mb-4 font-bold text-neutral-900">Syarat Minimum:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-neutral-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span>Badan usaha resmi (PT/CV/Firma).</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span>Memiliki pengalaman di industri terkait (IT/Konsultan/Akuntansi).</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-600">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                  <span>Berkomitmen untuk sertifikasi tim teknis/sales (min. 1 orang).</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
