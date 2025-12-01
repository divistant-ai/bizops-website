import { Check, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button } from '@/components/ui';
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn';
import { faqs, pricingPlans } from '@/data/pricingData';
import { generateMetadata as genMeta } from '@/libs/utils/metadata';

export const metadata = genMeta({
  title: 'Harga & Paket Langganan | BizOps',
  description: 'Transparan. Tanpa biaya tersembunyi. Pilih paket yang sesuai dengan skala bisnis Anda.',
});

export default function PricingPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price).replace('Rp', 'Rp ');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Section className="bg-neutral-900 pt-32 pb-20 text-center text-white">
        <Container>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Investasi Cerdas untuk Masa Depan.</h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-neutral-300">
            Pilih paket yang sesuai dengan fase pertumbuhan Anda. Upgrade atau downgrade kapan saja.
          </p>

          {/* Toggle Monthly/Yearly could go here later */}
        </Container>
      </Section>

      <Section className="-mt-20">
        <Container size="7xl">
          <FadeInStagger>
            <div className="grid items-start gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan, i) => (
                <FadeIn key={plan.id} delay={i * 0.1}>
                  <div className={`relative rounded-3xl border bg-white p-8 shadow-xl ${plan.popular ? 'border-primary-500 ring-primary-500/20 ring-4' : 'border-neutral-200'} flex h-full flex-col`}>

                    {plan.popular && (
                      <div className="bg-primary-600 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-1 text-sm font-bold tracking-wide text-white uppercase shadow-lg">
                        Most Popular
                      </div>
                    )}

                    <div className="mb-8 text-center">
                      <h3 className="mb-2 text-2xl font-bold text-neutral-900">{plan.name}</h3>
                      <p className="mb-6 text-neutral-500">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-extrabold text-neutral-900">
                          {plan.priceMonthly === 0 ? 'Hubungi Kami' : formatPrice(plan.priceMonthly)}
                        </span>
                        {plan.priceMonthly > 0 && <span className="text-neutral-500">/bulan</span>}
                      </div>
                    </div>

                    <div className="mb-8 flex-grow space-y-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="text-primary-600 mt-0.5 h-5 w-5 shrink-0" />
                          <span className="text-sm text-neutral-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Link href={plan.id === 'enterprise' ? '/contact' : '/demo'} className="block">
                        <Button
                          variant={plan.popular ? 'primary' : 'outline'}
                          className="h-12 w-full justify-center rounded-xl text-base"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeInStagger>
        </Container>
      </Section>

      {/* FAQs */}
      <Section className="border-t border-neutral-200 bg-white">
        <Container size="4xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-neutral-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6">
                <h3 className="mb-2 flex items-start gap-3 text-lg font-bold text-neutral-900">
                  <HelpCircle className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                  {faq.q}
                </h3>
                <p className="pl-8 text-neutral-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
