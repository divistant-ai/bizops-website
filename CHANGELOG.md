# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Structured Data (JSON-LD) for SEO rich snippets
- Content Security Policy (CSP) header
- Rate limiting middleware for form submissions
- Floating WhatsApp button component
- Complete physical address in footer
- 3 detailed case studies (PT Teknologi Maju, CV Manufaktur Jaya, PT Retail Indonesia)
- Trust badges component (ISO 27001, GDPR, SOC 2, etc.)
- Live statistics counter with animation
- PDF export utility for calculator results
- Comparison pages data (BizOps vs SAP, BizOps vs Odoo)
- Enhanced keyboard support in PricingCalculator
- Optimized blur scale in Tailwind config

### Changed
- Migrated all environment variables from Vite (`VITE_*`) to Next.js (`NEXT_PUBLIC_*`)
- Refactored 6 page components from Client to Server Components
- Enhanced footer with complete NAP (Name, Address, Phone)
- Improved accessibility with full keyboard navigation support

### Fixed
- Removed duplicate middleware file (merged into proxy.ts)
- Fixed TypeScript type dependencies (removed schema-dts)
- Resolved all linter errors
- Fixed metadata export issues in page components

### Removed
- Legacy SEO.tsx component (replaced with Next.js Metadata API)
- 6 redundant Client Wrapper components
- Duplicate middleware.ts file
- 35+ temporary audit and migration documentation files

---

## [3.0.0] - 2025-12-01

### Major Changes
- Complete migration from Vite to Next.js 16+ (App Router)
- Full technical and business audit completion (100/100 score)
- Production-ready with enterprise-grade features

### Technical Improvements
- Server Components optimization
- Performance optimization (Core Web Vitals)
- Security hardening (8 security headers + CSP)
- Accessibility compliance (WCAG 2.1 AA)
- SEO optimization (100% metadata coverage)

### Business Improvements
- Complete NAP information
- WhatsApp integration
- Case studies implementation
- Trust signals and credibility elements

---

## [2.0.0] - Previous Version

### Initial Features
- Next.js setup
- Basic routing
- i18n support
- Authentication with Clerk
- Database with Drizzle ORM

---

For detailed migration and audit history, see `docs/history/`.

