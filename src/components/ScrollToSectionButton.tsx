'use client';

import type React from 'react';
import { Button } from '@/components/ui';

type ScrollToSectionButtonProps = React.ComponentProps<typeof Button> & {
  sectionId: string;
};

export function ScrollToSectionButton({ sectionId, children, ...props }: ScrollToSectionButtonProps) {
  const handleClick = () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
