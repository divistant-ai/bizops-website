'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import Card from '@/components/ui/Card';

type FAQ = {
  q: string;
  a: string;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First item open by default

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <Card key={idx} padding="none" className="overflow-hidden">
          <button
            onClick={() => toggleFAQ(idx)}
            className="group flex w-full items-start justify-between p-6 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <h3 className="pr-4 font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
              {faq.q}
            </h3>
            <div className="flex-shrink-0">
              {expandedIndex === idx
                ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  )
                : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
            </div>
          </button>

          {expandedIndex === idx && (
            <div className="px-6 pt-0 pb-6">
              <div className="border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-400">
                {faq.a}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FAQAccordion;
