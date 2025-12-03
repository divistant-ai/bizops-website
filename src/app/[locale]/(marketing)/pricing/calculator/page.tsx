'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/ui/Loading';

export default function PricingCalculatorPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/tools/pricing-calculator');
  }, [router]);

  return <Loading />;
}
