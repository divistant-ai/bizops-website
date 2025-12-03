'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/components/ui/Loading';

export default function PricingCalculatorPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/tools/pricing-calculator');
  }, [router]);

  return <Loading />;
}
