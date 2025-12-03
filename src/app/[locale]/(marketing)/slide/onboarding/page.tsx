import { generateMetadata as genMeta } from '@/libs/utils/metadata';
import OnboardingSlideContent from './OnboardingSlideContent';

export const metadata = genMeta({
  title: 'BizOps Onboarding Journey',
  description: 'End-to-end implementation guide for BizOps platform onboarding.',
});

export default function OnboardingSlidePage() {
  return <OnboardingSlideContent />;
}
