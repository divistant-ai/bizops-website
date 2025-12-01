import { Linkedin, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  const footerLinks = {
    platform: [
      { href: '/platform/modules', label: 'Modules' },
      { href: '/platform/capabilities', label: 'Capabilities' },
      { href: '/platform/technology', label: 'Technology' },
    ],
    solutions: [
      { href: '/solutions', label: 'By Industry' },
      { href: '/role', label: 'By Role' },
      { href: '/use-cases', label: 'Use Cases' },
    ],
    company: [
      { href: '/about', label: 'About Us' },
      { href: '/careers', label: 'Careers' },
      { href: '/partners', label: 'Partners' },
      { href: '/contact', label: 'Contact' },
    ],
    resources: [
      { href: '/blog', label: 'Blog' },
      { href: '/docs', label: 'Documentation' },
      { href: '/events', label: 'Events' },
      { href: '/resources', label: 'Resources' },
    ],
    legal: [
      { href: '/legal/privacy', label: 'Privacy Policy' },
      { href: '/legal/terms', label: 'Terms of Service' },
      { href: '/accessibility', label: 'Accessibility' },
      { href: '/security', label: 'Security' },
    ],
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg">
                <div className="h-4 w-4 rotate-45 transform rounded-sm bg-white"></div>
              </div>
              <span className="text-xl font-bold">BizOps</span>
            </Link>
            <p className="mb-4 text-sm text-slate-400">
              The Adaptive Business Operating System. Streamline operations, boost productivity, and scale with confidence.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-slate-400 transition-colors hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-slate-400 transition-colors hover:text-white" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-slate-400 transition-colors hover:text-white" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">Solutions</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <div className="flex flex-wrap gap-6 text-sm text-slate-400">
            {footerLinks.legal.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-slate-400">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            BizOps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
