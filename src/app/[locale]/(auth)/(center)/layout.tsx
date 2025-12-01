import { setRequestLocale } from 'next-intl/server';
import React from 'react';

export default async function CenteredLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {props.children}
    </div>
  );
}
