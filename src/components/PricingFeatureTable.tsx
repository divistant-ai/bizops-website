'use client';

import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import { featureComparison } from '@/data/pricingData';

const PricingFeatureTable: React.FC = () => {
  // Safety check for data
  const data = featureComparison || [];
  const initialCategory = data.length > 0 && data[0] ? data[0].category : '';

  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    initialCategory,
  ]);

  if (data.length === 0) {
    return null; // Or render loading state
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category],
    );
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <div className="flex justify-center">
          <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex justify-center">
          <X className="h-5 w-5 text-slate-300 dark:text-slate-700" />
        </div>
      );
    }
    // String value
    return (
      <div className="text-center text-sm font-medium text-slate-700 dark:text-slate-300">
        {value}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
          Perbandingan Fitur Detail
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Lihat semua fitur yang tersedia di setiap paket
        </p>
      </div>

      {/* Desktop Accordion View */}
      <div className="hidden space-y-4 lg:block">
        {/* Header Row */}
        <Card padding="none">
          <div className="grid grid-cols-4 gap-4 bg-slate-100 p-6 dark:bg-slate-800">
            <div className="font-bold text-slate-900 dark:text-white">Fitur</div>
            <div className="text-center">
              <div className="font-bold text-slate-900 dark:text-white">Business</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">IDR 2.5 Jt/bln</div>
            </div>
            <div className="rounded-lg bg-blue-50 p-2 text-center dark:bg-blue-900/20">
              <div className="font-bold text-blue-600 dark:text-blue-400">Growth</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">IDR 7.5 Jt/bln</div>
              <div className="mt-2 inline-block rounded-full bg-blue-600 px-2 py-1 text-xs text-white">
                POPULAR
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-slate-900 dark:text-white">Enterprise</div>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">Custom</div>
            </div>
          </div>
        </Card>

        {/* Categories */}
        {data.map(category => (
          <Card key={category.category} padding="none">
            <button
              onClick={() => toggleCategory(category.category)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {category.category}
              </h3>
              {expandedCategories.includes(category.category)
                ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                  )
                : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  )}
            </button>

            {expandedCategories.includes(category.category) && (
              <div className="border-t border-slate-200 dark:border-slate-800">
                {category.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 gap-4 border-b border-slate-100 p-4 transition-colors last:border-b-0 hover:bg-slate-50 dark:border-slate-800/50 dark:hover:bg-slate-800/30"
                  >
                    <div className="text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <span>{feature.name}</span>
                        {feature.description && (
                          <span className="text-xs text-slate-500">
                            (
                            {feature.description}
                            )
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center">{renderFeatureValue(feature.business)}</div>
                    <div className="flex justify-center rounded bg-blue-50/30 dark:bg-blue-900/10">
                      {renderFeatureValue(feature.growth)}
                    </div>
                    <div className="flex justify-center">{renderFeatureValue(feature.enterprise)}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Mobile Accordion View */}
      <div className="space-y-4 lg:hidden">
        {data.map(category => (
          <Card key={category.category} padding="none">
            <button
              onClick={() => toggleCategory(category.category)}
              className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <h3 className="font-bold text-slate-900 dark:text-white">
                {category.category}
              </h3>
              {expandedCategories.includes(category.category)
                ? (
                    <ChevronUp className="h-5 w-5 text-slate-500" />
                  )
                : (
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  )}
            </button>

            {expandedCategories.includes(category.category) && (
              <div className="border-t border-slate-200 dark:border-slate-800">
                {category.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="border-b border-slate-100 p-4 last:border-b-0 dark:border-slate-800/50"
                  >
                    <div className="mb-3 font-medium text-slate-900 dark:text-white">
                      {feature.name}
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                          Business
                        </div>
                        {renderFeatureValue(feature.business)}
                      </div>
                      <div>
                        <div className="mb-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                          Growth
                        </div>
                        {renderFeatureValue(feature.growth)}
                      </div>
                      <div>
                        <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                          Enterprise
                        </div>
                        {renderFeatureValue(feature.enterprise)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Legend */}
      <Card className="mt-8">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            <span className="text-slate-700 dark:text-slate-300">Included</span>
          </div>
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-slate-300" />
            <span className="text-slate-700 dark:text-slate-300">Not Available</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">-</span>
            <span className="text-slate-700 dark:text-slate-300">
              Custom text indicates feature level or limit
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PricingFeatureTable;
