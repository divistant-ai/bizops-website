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
    <div className="invisible absolute top-full left-0 z-50 w-full rounded-b-xl border-t border-slate-100 bg-white opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar (Tabs) */}
        <div className={`${type === 'platform' ? 'w-64' : 'w-60'} flex-shrink-0 rounded-bl-xl border-r border-slate-100 bg-slate-50 py-6 dark:border-slate-800 dark:bg-slate-950`}>
          <div className="mb-3 px-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
            {type === 'platform' && 'Platform Overview'}
            {type === 'solutions' && 'Find Solutions'}
            {type === 'resources' && 'Resource Hub'}
            {type === 'company' && 'Who We Are'}
          </div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onMouseEnter={() => setActiveTab(tab.id)}
              className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400 border-l-4 bg-white shadow-sm dark:bg-slate-900'
                  : 'border-l-4 border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'}`} />
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight className="text-primary-600 h-3 w-3" />}
            </button>
          ))}

          {/* Additional Links */}
          {type === 'platform' && (
            <div className="mt-6 px-4">
              <Link href="/tour" className="bg-primary-50 dark:bg-primary-900/20 border-primary-100 dark:border-primary-900/50 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/40 mb-2 flex items-center gap-2 rounded-lg border p-3 text-xs font-bold transition-colors">
                <MousePointer className="h-4 w-4" />
                {' '}
                Interactive Tour
              </Link>
              <Link href="/download" className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                <Download className="h-4 w-4" />
                {' '}
                Download Apps
              </Link>
            </div>
          )}

          {type === 'company' && (
            <div className="mt-6 px-4">
              <Link href="/contact" className="hover:border-primary-200 group/btn flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                <div className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover/btn:bg-primary-100 flex h-6 w-6 items-center justify-center rounded-md transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                Contact Us
              </Link>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="min-h-[350px] flex-1 p-8">
          {activeContent && (
            <>
              <div className="mb-6">
                <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
                  {activeContent.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {activeContent.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {activeContent.items.map((item, idx) => {
                  const bgColor = item.bg || 'bg-slate-100 dark:bg-slate-800 group-hover/item:bg-white dark:group-hover/item:bg-slate-700 shadow-sm';
                  const iconColor = item.color || 'text-slate-600 dark:text-slate-300';

                  return (
                    <Link
                      key={idx}
                      href={item.to}
                      onClick={onClose}
                      className="group/item -ml-2 flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <div className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all ${bgColor}`}>
                        <item.icon className={`h-5 w-5 ${iconColor}`} />
                      </div>
                      <div>
                        <div className="group-hover/item:text-primary-600 text-sm font-bold text-slate-900 transition-colors dark:text-white">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end border-t border-slate-100 pt-6 dark:border-slate-800">
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
                  {' '}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
