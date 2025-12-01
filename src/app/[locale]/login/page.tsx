import { generateMetadata } from '@/libs/utils/metadata';
import { LoginContent } from '@/components/pages/LoginContent';

export const metadata = generateMetadata({
  title: 'Login to BizOps | Enterprise ERP',
  description: 'Secure access to your BizOps workspace.',
  url: '/login',
});

export default function LoginPage() {
  return <LoginContent />;
}
