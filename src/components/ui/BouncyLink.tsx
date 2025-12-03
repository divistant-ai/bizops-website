'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { BouncyButton } from './motion-button';

type BouncyLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function BouncyLink({ href, children, className }: BouncyLinkProps) {
  return (
    <Link href={href} className="inline-block">
      <BouncyButton className={className} type="button">
        {children}
      </BouncyButton>
    </Link>
  );
}
