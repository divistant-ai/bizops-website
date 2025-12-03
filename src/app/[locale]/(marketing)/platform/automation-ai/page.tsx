import type { Metadata } from 'next';
import AutomationAIContent from './AutomationAIContent';

export const metadata: Metadata = {
  title: 'Business Process Automation & AI Features | BizOps Engine',
  description:
    'Otomatisasi alur kerja bisnis Anda. Fitur Low-Code Workflow Builder, OCR Scanner cerdas, dan AI Forecasting untuk operasional autopilot.',
};

export default function AutomationAIPage() {
  return <AutomationAIContent />;
}
