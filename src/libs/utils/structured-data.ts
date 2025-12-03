/**
 * Structured Data (JSON-LD) Utilities
 * For rich snippets in search results
 * @see https://schema.org/
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bizops.id';
const SITE_NAME = 'BizOps';

/**
 * Organization Schema
 * Shows company info in search results
 */
export function getOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    'name': SITE_NAME,
    'legalName': 'PT BizOps Indonesia',
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/logo.png`,
      'width': '512',
      'height': '512',
    },
    'description': 'Platform ERP Indonesia yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain dalam satu sistem terintegrasi.',
    'email': 'sales@bizops.id',
    'telephone': '+62-21-3970-2834',
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'ID',
      'addressLocality': 'Jakarta',
      'addressRegion': 'DKI Jakarta',
    },
    'sameAs': [
      'https://www.linkedin.com/company/bizops-id',
      'https://www.instagram.com/bizops.id',
      'https://twitter.com/bizops_id',
      'https://www.facebook.com/bizops.id',
    ],
    'foundingDate': '2020',
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'value': '50-100',
    },
  };
}

/**
 * WebSite Schema
 * Enables site search box in Google
 */
export function getWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': SITE_NAME,
    'description': 'Platform ERP Indonesia - Business Operating System untuk transformasi digital bisnis Anda',
    'publisher': {
      '@id': `${SITE_URL}/#organization`,
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * WebPage Schema
 * Basic page info
 */
export function getWebPageSchema(props: {
  url: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': `${SITE_URL}${props.url}#webpage`,
    'url': `${SITE_URL}${props.url}`,
    'name': props.title,
    'description': props.description,
    'isPartOf': {
      '@id': `${SITE_URL}/#website`,
    },
    'about': {
      '@id': `${SITE_URL}/#organization`,
    },
    'datePublished': props.datePublished,
    'dateModified': props.dateModified || props.datePublished,
  };
}

/**
 * BreadcrumbList Schema
 * Shows breadcrumb navigation in search results
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * FAQPage Schema
 * Shows FAQ accordion in search results
 */
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}

/**
 * Product Schema
 * For product/service pages
 */
export function getProductSchema(props: {
  name: string;
  description: string;
  url: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    '@type': 'Product',
    'name': props.name,
    'description': props.description,
    'url': `${SITE_URL}${props.url}`,
    'image': props.image ? `${SITE_URL}${props.image}` : undefined,
    'brand': {
      '@type': 'Brand',
      'name': SITE_NAME,
    },
    'offers': props.offers
      ? {
          '@type': 'Offer',
          'price': props.offers.price,
          'priceCurrency': props.offers.priceCurrency,
          'availability': 'https://schema.org/InStock',
          'url': `${SITE_URL}${props.url}`,
        }
      : undefined,
  };
}

/**
 * Service Schema
 * For service pages
 */
export function getServiceSchema(props: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  areaServed?: string;
}) {
  return {
    '@type': 'Service',
    'name': props.name,
    'description': props.description,
    'url': `${SITE_URL}${props.url}`,
    'serviceType': props.serviceType,
    'provider': {
      '@id': `${SITE_URL}/#organization`,
    },
    'areaServed': props.areaServed
      ? {
          '@type': 'Country',
          'name': props.areaServed,
        }
      : undefined,
  };
}

/**
 * Article Schema
 * For blog posts and news articles
 */
export function getArticleSchema(props: {
  headline: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
}) {
  return {
    '@type': 'Article',
    'headline': props.headline,
    'description': props.description,
    'url': `${SITE_URL}${props.url}`,
    'image': props.image ? `${SITE_URL}${props.image}` : `${SITE_URL}/og-image.jpg`,
    'datePublished': props.datePublished,
    'dateModified': props.dateModified || props.datePublished,
    'author': {
      '@type': 'Person',
      'name': props.author.name,
      'url': props.author.url || `${SITE_URL}/about`,
    },
    'publisher': props.publisher
      ? {
          '@type': 'Organization',
          'name': props.publisher.name,
          'logo': props.publisher.logo
            ? {
                '@type': 'ImageObject',
                'url': `${SITE_URL}${props.publisher.logo}`,
              }
            : undefined,
        }
      : {
          '@id': `${SITE_URL}/#organization`,
        },
  };
}

/**
 * SoftwareApplication Schema
 * For product/platform pages
 */
export function getSoftwareApplicationSchema(props: {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    '@type': 'SoftwareApplication',
    'name': props.name,
    'description': props.description,
    'url': `${SITE_URL}${props.url}`,
    'applicationCategory': props.applicationCategory,
    'operatingSystem': props.operatingSystem,
    'offers': props.offers
      ? {
          '@type': 'Offer',
          'price': props.offers.price,
          'priceCurrency': props.offers.priceCurrency,
          'availability': 'https://schema.org/InStock',
        }
      : undefined,
    'provider': {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Generate JSON-LD script tag
 */
export function generateJsonLd(data: object | object[]): string {
  const jsonLd = Array.isArray(data)
    ? {
        '@context': 'https://schema.org',
        '@graph': data,
      }
    : {
        '@context': 'https://schema.org',
        ...data,
      };

  return JSON.stringify(jsonLd);
}
