import { LoginContent } from '@/components/pages/LoginContent';
import { generateMetadata } from '@/libs/utils/metadata';

export const metadata = generateMetadata({
  title: 'Login to BizOps | Enterprise ERP',
  description: 'Secure access to your BizOps workspace.',
  url: '/login',
});

export default function LoginPage() {
  return <LoginContent />;
}
