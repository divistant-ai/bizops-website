'use client';

import { ChevronRight, Download, MousePointer, Phone } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { companyContent, companyTabs, platformContent, platformTabs, resourcesContent, resourcesTabs, solutionsContent, solutionsTabs } from '../../data/navData';

type MegaMenuProps = {
  type: 'platform' | 'solutions' | 'resources' | 'company';
  onClose?: () => void;
};

const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  const getTabs = () => {
    switch (type) {
      case 'platform': return platformTabs;
      case 'solutions': return solutionsTabs;
      case 'resources': return resourcesTabs;
      case 'company': return companyTabs;
      default: return [];
    }
  };

  const getContent = () => {
    switch (type) {
      case 'platform': return platformContent;
      case 'solutions': return solutionsContent;
      case 'resources': return resourcesContent;
      case 'company': return companyContent;
      default: return {};
    }
  };

  const getDefaultTab = () => {
    switch (type) {
      case 'platform': return 'modules';
      case 'solutions': return 'industry';
      case 'resources': return 'insights';
      case 'company': return 'story';
      default: return '';
    }
  };

  const tabs = getTabs();
  const content = getContent();
  const [activeTab, setActiveTab] = useState(getDefaultTab());

  const activeContent = content[activeTab];

  return (
    <>
      {/* Backdrop */}
      <div className="invisible fixed inset-0 top-[64px] z-[90] bg-slate-900/20 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:top-[80px]" />

      {/* Mega Menu Content */}
      <div className="invisible fixed top-[64px] right-0 left-0 z-[100] opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:top-[80px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            {/* Sidebar (Tabs) */}
            <div className="w-64 flex-shrink-0 border-r border-slate-200 bg-slate-50 py-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 px-4 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                {type === 'platform' && 'Platform Overview'}
                {type === 'solutions' && 'Find Solutions'}
                {type === 'resources' && 'Resource Hub'}
                {type === 'company' && 'Who We Are'}
              </div>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onMouseEnter={() => setActiveTab(tab.id)}
                  onClick={() => setActiveTab(tab.id)}
                  className={`focus-visible:ring-primary-500 flex w-full items-center justify-between border-l-4 px-5 py-3.5 text-left text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 bg-white shadow-sm dark:bg-slate-950'
                      : 'border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    {tab.label}
                  </div>
                  {activeTab === tab.id && <ChevronRight className="text-primary-600 dark:text-primary-400 h-4 w-4" />}
                </button>
              ))}

              {/* Additional Links */}
              {type === 'platform' && (
                <div className="mt-6 px-4">
                  <Link
                    href="/product-tour"
                    className="border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 mb-2 flex items-center gap-2 rounded-lg border p-3 text-xs font-bold transition-colors"
                  >
                    <MousePointer className="h-4 w-4" />
                    Interactive Tour
                  </Link>
                  <Link
                    href="/download"
                    className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    <Download className="h-4 w-4" />
                    Download Apps
                  </Link>
                </div>
              )}

              {type === 'company' && (
                <div className="mt-6 px-4">
                  <Link
                    href="/contact"
                    className="group/btn hover:border-primary-200 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
                  >
                    <div className="bg-primary-50 text-primary-600 group-hover/btn:bg-primary-100 flex h-6 w-6 items-center justify-center rounded-md transition-colors">
                      <Phone className="h-3.5 w-3.5" />
                    </div>
                    Contact Us
                  </Link>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="min-h-[350px] flex-1 p-7">
              {activeContent && (
                <>
                  <div className="mb-6">
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                      {activeContent.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {activeContent.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {activeContent.items.map((item, idx) => {
                      const bgColor = item.bg || 'bg-slate-100 dark:bg-slate-800 group-hover/item:bg-white dark:group-hover/item:bg-slate-700 shadow-sm';
                      const iconColor = item.color || 'text-slate-600 dark:text-slate-400';

                      return (
                        <Link
                          key={idx}
                          href={item.to}
                          onClick={onClose}
                          className="group/item focus-visible:ring-primary-500 -ml-2 flex items-start gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:outline-none dark:hover:bg-slate-900"
                        >
                          <div className={`mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${bgColor}`}>
                            <item.icon className={`h-5 w-5 ${iconColor}`} />
                          </div>
                          <div>
                            <div className="group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 text-sm font-bold text-slate-900 transition-colors duration-200 dark:text-white">
                              {item.label}
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                              {item.desc}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end border-t border-slate-200 pt-5 dark:border-slate-800">
                    <Link
                      href={
                        type === 'platform'
                          ? '/platform'
                          : type === 'solutions'
                            ? '/solutions'
                            : type === 'resources'
                              ? '/resources'
                              : type === 'company' ? '/about' : '#'
                      }
                      onClick={onClose}
                      className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-semibold"
                    >
                      View all
                      {' '}
                      {type}
                      {' '}
                      features
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;
