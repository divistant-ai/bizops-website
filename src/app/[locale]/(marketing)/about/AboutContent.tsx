import { Building2, CheckCircle2, FileText, MapPin, ShieldCheck, Users, Zap, Code } from 'lucide-react';
import { Container, Section } from '@/components/layout';
import { Badge } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { aboutContent } from '@/data/companyContent';

export default function AboutContent() {
  const { hero, timeline, values, entity } = aboutContent;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <Section className="relative overflow-hidden bg-neutral-900 pt-32 pb-20 text-white">
        <div className="bg-primary-900/20 pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[120px]" />
        <Container size="4xl" className="relative z-10 text-center">
          <Badge variant="outline" className="text-primary-300 border-primary-500/30 mb-6 tracking-wider uppercase">
            Our Story
          </Badge>
          <h1 className="mb-8 text-4xl leading-tight font-extrabold md:text-6xl">
            {hero.headline}
          </h1>
          <p className="text-xl leading-relaxed text-neutral-300">
            {hero.subheadline}
          </p>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section className="bg-white">
        <Container size="5xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-neutral-900">Perjalanan Kami</h2>
          </div>
          <FadeInStagger>
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent md:before:mx-auto md:before:translate-x-0">
              {timeline.map((item, i) => (
                <FadeIn key={i}>
                  <div className="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse">

                    {/* Icon/Dot */}
                    <div className="group-hover:bg-primary-500 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-neutral-200 text-neutral-500 shadow transition-all group-hover:scale-110 group-hover:text-white md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <div className="h-3 w-3 rounded-full bg-current" />
                    </div>

                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] rounded-2xl border border-neutral-100 bg-neutral-50 p-6 shadow-sm transition-shadow hover:shadow-md md:w-[calc(50%-2.5rem)]">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-neutral-900">{item.title}</h3>
                        <span className="text-primary-600 bg-primary-50 rounded-full px-3 py-1 text-sm font-bold">{item.year}</span>
                      </div>
                      <p className="leading-relaxed text-neutral-600">{item.desc}</p>
                    </div>

                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="bg-neutral-900 text-white">
        <Container>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold">Manifesto & Nilai Inti</h2>
            <p className="mx-auto max-w-2xl text-neutral-400">Prinsip yang memandu setiap baris kode yang kami tulis dan setiap keputusan bisnis yang kami ambil.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((val, i) => (
              <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
                <div className="bg-primary-500/20 text-primary-400 mb-6 flex h-12 w-12 items-center justify-center rounded-xl">
                  {i === 0 ? <Zap className="h-6 w-6" /> : i === 1 ? <ShieldCheck className="h-6 w-6" /> : <Users className="h-6 w-6" />}
                </div>
                <h3 className="mb-4 text-xl font-bold">{val.title}</h3>
                <p className="mb-6 text-neutral-300 italic">
                  "
                  {val.manifesto}
                  "
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="flex items-start gap-2 text-sm text-neutral-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {val.proof}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Entity Section */}
      <Section className="border-t border-neutral-200 bg-white">
        <Container size="4xl">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-12">
            <div className="mb-10 text-center">
              <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-neutral-100 bg-white p-3 shadow-sm">
                <Building2 className="h-8 w-8 text-neutral-800" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900">{entity.name}</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Headquarters</h4>
                    <p className="text-sm text-neutral-600">{entity.hq}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Code className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-900">R&D Center</h4>
                    <p className="text-sm text-neutral-600">{entity.rnd}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FileText className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Legalitas</h4>
                    <p className="text-sm text-neutral-600">{entity.legal}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldCheck className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-neutral-900">Compliance</h4>
                    <p className="text-sm text-neutral-600">{entity.compliance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
