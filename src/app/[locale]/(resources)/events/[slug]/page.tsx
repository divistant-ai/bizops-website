import { Container, Section } from '@/components/layout';
import { Typography } from '@/components/ui';
import { generateMetadata as generatePageMetadata } from '@/libs/utils/metadata';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return generatePageMetadata({
    title: `${slug} Event - BizOps`,
    description: `Join ${slug} event from BizOps`,
    url: `/events/${slug}`,
    type: 'article',
  });
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <Section>
      <Container>
        <Typography variant="h1" as="h1" className="mb-6">
          {slug.charAt(0).toUpperCase() + slug.slice(1)}
          {' '}
          Event
        </Typography>
        <Typography variant="body" color="muted">
          Event detail page content will be migrated here...
        </Typography>
      </Container>
    </Section>
  );
}
