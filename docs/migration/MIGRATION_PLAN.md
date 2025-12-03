# MIGRATION PLAN: BizOps V2 -> V3

## 1. Core Strategy: "Data-Driven Templates"
Instead of manually rewriting JSX for every single page (which is slow and error-prone), we will:
1.  **Migrate Data First:** Move all structured content (text, features, pricing) to `v3/src/data/`.
2.  **Create Smart Templates:** Build reusable page layouts (`GenericLanding`, `ArticleLayout`) that accept data as props.
3.  **Rapid Routing:** Create page files that simply import data + template.

## 2. Component Mapping

| Old Component (Vite) | New Component (Next.js) | Action |
| :--- | :--- | :--- |
| `<SEO />` | `export const metadata` | Replace logic |
| `<Link to="...">` | `<Link href="...">` | Global Search/Replace |
| `<img />` | `<OptimizedImage />` | Use Next/Image wrapper |
| `framer-motion` | `<FadeIn />` | Simplify animations |
| `Card` | `src/components/ui/Card` | Already migrated |
| `Section/Container` | `src/components/layout/*` | Already migrated |

## 3. Execution Phases

### Phase 1: Bulk Data Migration (Immediate)
- Copy all files from `bizops-website/data/*.ts` to `bizops-website-v3/src/data/`.
- **Validation:** Check for syntax errors (e.g. imports of React icons in data files).

### Phase 2: Template Creation
- **`GenericLandingPage.tsx`**: Handles Hero, Feature Grid, Stats, and CTA sections.
- **`ArticlePage.tsx`**: Handles Blog posts, Legal docs, and text-heavy pages.

### Phase 3: Rapid Page Generation
We will generate the following groups using the templates:

**Group A: Solutions (Industries)**
- `/solutions/manufacturing`
- `/solutions/retail`
- `/solutions/construction`
- `/solutions/services`

**Group B: Platform (Modules)**
- `/platform/finance`
- `/platform/hr`
- `/platform/operations`
- `/platform/crm`

**Group C: Resources**
- `/legal/privacy`
- `/legal/terms`
- `/blog` (Index & Detail)

## 4. Automation Scripts
I will create a script `migrate-content.js` to automatically:
1.  Read the old `data/*.ts`.
2.  Strip out React-specific imports (like Icons) if they cause issues in Server Components.
3.  Format them for Next.js usage.

## 5. Timeline
- **Setup (Templates & Data):** 20 Minutes
- **Page Implementation:** 5 Minutes per group (vs 30 mins manual)
- **QA/Review:** Final check.
