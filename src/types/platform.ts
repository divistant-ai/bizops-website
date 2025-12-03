import type { LucideIcon } from 'lucide-react';

export type ModuleFeature = {
  title: string;
  desc: string;
  icon?: LucideIcon;
};

export type ModuleMetric = {
  value: string;
  label: string;
};

export type ModuleProblem = {
  title: string;
  desc: string;
  icon?: LucideIcon;
};

export type ModuleMobileAdvantage = {
  title: string;
  desc: string;
};

export type ModuleConnection = {
  target: string;
  desc: string;
};

export type ModuleTestimonial = {
  quote: string;
  author: string;
  role: string;
  avatar: string;
};

export type ModuleFAQ = {
  question: string;
  answer: string;
};

export type ModuleCTA = {
  text: string;
  buttonLabel: string;
};

export type ModuleData = {
  title: string;
  subtitle: string;
  description: string;
  metaTitle?: string;
  metaDesc?: string;
  icon: LucideIcon;
  features: ModuleFeature[];
  metrics?: ModuleMetric[];
  problems?: ModuleProblem[];
  mobileAdvantage?: ModuleMobileAdvantage;
  connections?: ModuleConnection[];
  testimonial?: ModuleTestimonial;
  faqs?: ModuleFAQ[];
  cta?: ModuleCTA;
};
