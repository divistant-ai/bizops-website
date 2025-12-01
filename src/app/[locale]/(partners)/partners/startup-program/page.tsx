import { Container, Section } from '@/components/layout';
import { Typography } from '@/components/ui';
import { generateMetadata } from '@/libs/utils/metadata';

export const metadata = generateMetadata({
  title: 'StartupProgram - BizOps',
  description: 'StartupProgram page description',
  url: '/partners/startup-program',
});

export default function StartupProgramPage() {
  return (
    <Section>
      <Container>
        <Typography variant="h1" as="h1" className="mb-6">
          StartupProgram
        </Typography>
        <Typography variant="body" color="muted">
          {/* Content akan dimigrasikan dari bizops-website/pages/StartupProgramPage.tsx */}
          Page content will be migrated here...
        </Typography>
      </Container>
    </Section>
  );
}
