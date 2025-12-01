'use client';

import { Button } from '@/components/ui';
import type React from 'react';

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

