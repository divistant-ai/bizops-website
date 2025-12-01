import { CheckCircle2, Layers, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn } from '@/components/ui/FadeIn';
import { whyBizOpsContent } from '@/data/companyContent';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Mengapa Memilih BizOps? | The BizOps Difference',
  description: 'Kami bukan sekadar software ERP. Kami adalah "Middleware Cerdas" yang menyatukan operasional bisnis Anda.',
});

export default function WhyBizOpsPage() {
  const { hero, reasons } = whyBizOpsContent;

  const icons = [Smartphone, ShieldCheck, Layers, Zap, CheckCircle2];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-center text-white">
        <Container size="4xl">
          <h1 className="mb-8 text-4xl leading-tight font-extrabold md:text-6xl">
            {hero.headline}
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-neutral-300">
            {hero.sub}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, i) => {
              const Icon = icons[i] || Zap;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group h-full rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-primary-50 text-primary-600 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="group-hover:text-primary-600 mb-4 text-xl font-bold text-neutral-900">{reason.title}</h3>
                    <p className="leading-relaxed text-neutral-600">{reason.desc}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-neutral-200 bg-white">
        <Container size="4xl" className="text-center">
          <h2 className="mb-6 text-3xl font-bold text-neutral-900">Siap untuk Transformasi?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/demo">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700 rounded-full px-8 text-white">
                Jadwalkan Demo
              </Button>
            </Link>
            <Link href="/compare">
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Bandingkan Kompetitor
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
