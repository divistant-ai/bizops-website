/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 */

import { generateJsonLd } from '@/libs/utils/structured-data';

type StructuredDataProps = {
  data: object | object[];
};

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateJsonLd(data) }}
    />
  );
}
