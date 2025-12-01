import { Home, Search } from 'lucide-react';
import Link from 'next/link';
import { Container, Section } from '@/components/layout';
import { Button, Typography } from '@/components/ui';

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] items-center">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h1" as="h1" className="mb-4">
            404
          </Typography>
          <Typography variant="h2" as="h2" className="mb-4">
            Page Not Found
          </Typography>
          <Typography variant="body" color="muted" className="mb-8">
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/search">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
