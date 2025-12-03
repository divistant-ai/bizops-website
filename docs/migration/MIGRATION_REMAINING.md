# Migration Remaining: What Still Needs to be Migrated

## 📊 Migration Status Summary

### ✅ Already Migrated (100%)
- ✅ Core Infrastructure (contexts, hooks, data)
- ✅ UI Components (17 components)
- ✅ Layout Components (4 components)
- ✅ HomePage (1 page)
- ✅ Root files (design-tokens, types)
- ✅ Lib/Utils (6 utility files)

### ⚠️ Still Need Migration

## 1. PAGES (High Priority)

### From bizops-website-v2: ~57 pages remaining

#### Marketing Pages (9 pages)
- [ ] `app/(marketing)/about/page.tsx`
- [ ] `app/(marketing)/blog/page.tsx`
- [ ] `app/(marketing)/blog/[slug]/page.tsx`
- [ ] `app/(marketing)/contact/page.tsx`
- [ ] `app/(marketing)/demo/page.tsx`
- [ ] `app/(marketing)/platform/page.tsx`
- [ ] `app/(marketing)/pricing/page.tsx`
- [ ] `app/(marketing)/pricing/calculator/page.tsx`
- [ ] `app/(marketing)/thank-you/page.tsx`
- [ ] `app/(marketing)/trust/page.tsx`
- [ ] `app/(marketing)/why-bizops/page.tsx`

#### Product Pages (20+ pages)
- [ ] `app/(product)/analytics/page.tsx`
- [ ] `app/(product)/compare/page.tsx`
- [ ] `app/(product)/comparisons/page.tsx`
- [ ] `app/(product)/integrations/page.tsx`
- [ ] `app/(product)/platform/capabilities/[slug]/page.tsx`
- [ ] `app/(product)/platform/modules/[slug]/page.tsx`
- [ ] `app/(product)/platform/multi-company/page.tsx`
- [ ] `app/(product)/platform/portals/page.tsx`
- [ ] `app/(product)/platform/technology/page.tsx`
- [ ] `app/(product)/product-tour/page.tsx`
- [ ] `app/(product)/role/[slug]/page.tsx`
- [ ] `app/(product)/services/page.tsx`
- [ ] `app/(product)/services/[slug]/page.tsx`
- [ ] `app/(product)/services/automation-ai/page.tsx`
- [ ] `app/(product)/services/custom-development/page.tsx`
- [ ] `app/(product)/services/managed-services/page.tsx`
- [ ] `app/(product)/solutions/page.tsx`
- [ ] `app/(product)/solutions/industries/[slug]/page.tsx`
- [ ] `app/(product)/use-cases/page.tsx`
- [ ] `app/(product)/use-cases/[slug]/page.tsx`

#### Resources Pages (12+ pages)
- [ ] `app/(resources)/docs/page.tsx`
- [ ] `app/(resources)/download/page.tsx`
- [ ] `app/(resources)/events/page.tsx`
- [ ] `app/(resources)/events/[slug]/page.tsx`
- [ ] `app/(resources)/glossary/page.tsx`
- [ ] `app/(resources)/migration/page.tsx`
- [ ] `app/(resources)/resources/page.tsx`
- [ ] `app/(resources)/roadmap/page.tsx`
- [ ] `app/(resources)/search/page.tsx`
- [ ] `app/(resources)/sitemap/page.tsx`
- [ ] `app/(resources)/status/page.tsx`
- [ ] `app/(resources)/system-requirements/page.tsx`
- [ ] `app/(resources)/tools/assessment/page.tsx`
- [ ] `app/(resources)/tools/needs-analysis/page.tsx`
- [ ] `app/(resources)/tools/roi-calculator/page.tsx`
- [ ] `app/(resources)/tools/timeline-generator/page.tsx`

#### Company Pages (3 pages)
- [ ] `app/(company)/careers/page.tsx`
- [ ] `app/(company)/customers/page.tsx`
- [ ] `app/(company)/media-kit/page.tsx`

#### Partners Pages (4 pages)
- [ ] `app/(partners)/partners/page.tsx`
- [ ] `app/(partners)/partners/apply/page.tsx`
- [ ] `app/(partners)/partners/directory/page.tsx`
- [ ] `app/(partners)/partners/startup-program/page.tsx`

#### Legal Pages (4 pages)
- [ ] `app/(legal)/accessibility/page.tsx`
- [ ] `app/(legal)/legal/page.tsx`
- [ ] `app/(legal)/legal/[slug]/page.tsx`
- [ ] `app/(legal)/security/page.tsx`

#### Utility Pages (8 pages)
- [ ] `app/404/page.tsx`
- [ ] `app/access-denied/page.tsx`
- [ ] `app/coming-soon/page.tsx`
- [ ] `app/error/page.tsx`
- [ ] `app/error.tsx`
- [ ] `app/loading.tsx`
- [ ] `app/login/page.tsx`
- [ ] `app/maintenance/page.tsx`
- [ ] `app/not-found.tsx`
- [ ] `app/preferences/page.tsx`
- [ ] `app/template.tsx`

#### API Routes
- [ ] `app/api/health/route.ts`

#### Root Files
- [ ] `app/globals.css` (may need to merge with existing)
- [ ] `app/robots.ts` (already exists, may need update)
- [ ] `app/sitemap.ts` (already exists, may need update)
- [ ] `app/layout.tsx` (already exists, may need update)

## 2. COMPONENTS (Medium Priority)

### Missing from bizops-website-v2
- [ ] `components/Button/Button.stories.tsx` (Storybook - optional)
- [ ] `components/Button/Button.test.tsx` (Tests - optional)
- [ ] `components/Tooltip/Tooltip.tsx` (May be useful)

### From Original bizops-website (May be useful)
- [ ] `components/PricingFeatureTable.tsx`
- [ ] `components/FAQAccordion.tsx`
- [ ] `components/MethodologyReference.tsx`
- [ ] `components/Pagination.tsx`
- [ ] `components/NotificationCenter.tsx`
- [ ] `components/navbar/MegaMenu.tsx`
- [ ] `components/navbar/NavbarMobile.tsx`
- [ ] `components/navbar/NavbarLogo.tsx`
- [ ] `components/navbar/NavbarDesktop.tsx`
- [ ] `components/navbar/MobileMenu.tsx`
- [ ] Motion Components (if needed):
  - [ ] `components/ui/motion-text.tsx`
  - [ ] `components/ui/motion-button.tsx`
  - [ ] `components/ui/motion-scroll.tsx`
  - [ ] `components/ui/motion-transition.tsx`
  - [ ] `components/ui/motion-interactions.tsx`

## 3. STYLES & CONFIGURATION

### CSS/Styles
- [ ] `app/globals.css` - Check if needs merging with `src/styles/global.css`
- [ ] Check Tailwind config compatibility (v2 → v4)

### Configuration Files
- [ ] Check `next.config.ts` for any custom configs
- [ ] Check `tsconfig.json` for any path aliases
- [ ] Check `postcss.config.js` for any custom configs

## 4. UTILITIES & HELPERS

### From Original bizops-website
- [ ] Check `utils/` folder for any additional utilities
- [ ] Check for animation utilities
- [ ] Check for form validation utilities

## 📋 Migration Priority

### Priority 1: Essential Pages (Start Here)
1. **Marketing Pages** - About, Contact, Platform, Pricing
2. **Product Pages** - Solutions, Services, Platform overview
3. **Resources Pages** - Blog, Events, Docs

### Priority 2: Important Pages
4. **Product Detail Pages** - Dynamic routes for modules, capabilities, etc.
5. **Company Pages** - Careers, Customers
6. **Legal Pages** - Legal documents, Security

### Priority 3: Nice to Have
7. **Partners Pages**
8. **Tools Pages** - Assessment, ROI Calculator
9. **Utility Pages** - 404, Error, etc.

### Priority 4: Optional
10. **Components** - Motion components, Navbar enhancements
11. **Tests & Stories** - Storybook stories, test files

## 🚀 Quick Migration Commands

### Copy All Pages (Batch)
```bash
# Copy all pages from v2 to v3
cd /Users/andrimuhyidin/Workspace/bizops-new
cp -r bizops-website-v2/app/* bizops-website-v3/src/app/[locale]/
```

### Copy Specific Route Group
```bash
# Example: Copy marketing pages
cp -r bizops-website-v2/app/\(marketing\)/* bizops-website-v3/src/app/\[locale\]/\(marketing\)/
```

## ⚠️ Important Notes

1. **i18n Structure**: All pages need to be in `[locale]` folder
2. **Path Aliases**: Already correct (`@/*` → `./src/*`)
3. **Metadata**: May need to add `generateMetadata` for SEO
4. **Links**: May need to update to use i18n routing
5. **Server Components**: Some pages may need to be converted to client components

## 📊 Summary

- **Pages Remaining**: ~57 pages from v2
- **Components Remaining**: ~3-10 components (optional)
- **Status**: Core infrastructure complete, pages migration needed

**Recommendation**: Start with Priority 1 pages (Marketing, Product, Resources) as they are most important for the website.
