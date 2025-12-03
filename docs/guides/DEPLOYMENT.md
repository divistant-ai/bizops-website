# Deployment Guide

Panduan lengkap deployment BizOps Website V3 ke production.

## 📚 Table of Contents

- [Overview](#overview)
- [Vercel Deployment](#vercel-deployment)
- [Environment Variables](#environment-variables)
- [Pre-deployment Checklist](#pre-deployment-checklist)
- [Post-deployment](#post-deployment)

## 🎯 Overview

BizOps Website V3 dioptimalkan untuk deployment di **Vercel**, platform yang dibuat oleh tim Next.js.

### Deployment Options

1. **Vercel** (Recommended) - Zero-config, automatic deployments
2. **Docker** - Self-hosted dengan container
3. **Node.js** - Traditional server deployment

## 🚀 Vercel Deployment

### 1. Install Vercel CLI

```bash
npm i -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Deploy to Preview

```bash
vercel
```

### 4. Deploy to Production

```bash
vercel --prod
```

### Automatic Deployments

Connect your GitHub repository to Vercel for automatic deployments:

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables
5. Click "Deploy"

**Result:**
- Every push to `main` → Production deployment
- Every PR → Preview deployment

## 🔐 Environment Variables

### Required Variables

```env
# Database (Neon Postgres)
DATABASE_URL=postgresql://user:password@host/database

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Monitoring (Sentry)
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN=xxxxx

# App Config
NEXT_PUBLIC_APP_URL=https://bizops.id
NODE_ENV=production
```

### Setting Variables in Vercel

**Via Dashboard:**
1. Go to Project Settings
2. Click "Environment Variables"
3. Add variables for Production, Preview, Development

**Via CLI:**
```bash
vercel env add VARIABLE_NAME production
```

## ✅ Pre-deployment Checklist

### 1. Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

### 2. Testing

```bash
# Run all tests
npm run test

# Run E2E tests
npm run test:e2e

# Check coverage
npm run test:coverage
```

### 3. Build Verification

```bash
# Build for production
npm run build

# Test production build locally
npm run start
```

### 4. Performance Audit

```bash
# Run Lighthouse
npx lighthouse http://localhost:3000 --view

# Check bundle size
npm run analyze
```

### 5. Security Check

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### 6. SEO Verification

- [ ] All pages have meta tags
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured
- [ ] Open Graph images set
- [ ] Structured data added

### 7. Content Review

- [ ] All text reviewed for typos
- [ ] All images optimized
- [ ] All links working
- [ ] All forms tested
- [ ] 404 page exists

## 🔄 Deployment Process

### Step-by-Step

1. **Merge to Main**
   ```bash
   git checkout main
   git pull origin main
   git merge feature/your-feature
   git push origin main
   ```

2. **Automatic Build**
   - Vercel detects push
   - Runs `npm run build`
   - Deploys to production

3. **Verification**
   - Check deployment logs
   - Visit production URL
   - Test critical flows

### Rollback

If deployment fails:

```bash
# Via Vercel Dashboard
# Go to Deployments → Select previous deployment → Promote to Production

# Via CLI
vercel rollback
```

## 📊 Post-deployment

### 1. Monitor Performance

**Vercel Analytics:**
- Real User Monitoring (RUM)
- Web Vitals tracking
- Error tracking

**PostHog:**
- User behavior analytics
- Feature usage tracking
- Conversion funnels

**Sentry:**
- Error tracking
- Performance monitoring
- Release tracking

### 2. Check Health

```bash
# Check if site is up
curl -I https://bizops.id

# Check API endpoints
curl https://bizops.id/api/health
```

### 3. Verify Features

Test critical user flows:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Forms submit
- [ ] Auth works
- [ ] Search works
- [ ] Mobile responsive

### 4. SEO Verification

```bash
# Check robots.txt
curl https://bizops.id/robots.txt

# Check sitemap
curl https://bizops.id/sitemap.xml

# Check meta tags
curl -s https://bizops.id | grep -i "<meta"
```

## 🐛 Troubleshooting

### Build Fails

**Error:** `Module not found`
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error:** `Type errors`
```bash
# Run type checking locally
npm run type-check
```

### Runtime Errors

**Error:** `Environment variable not found`
- Check Vercel environment variables
- Ensure variables are set for production

**Error:** `Database connection failed`
- Check DATABASE_URL is correct
- Verify database is accessible from Vercel

### Performance Issues

**Slow page loads:**
- Check bundle size: `npm run analyze`
- Optimize images: Use Next.js Image component
- Enable caching: Configure `next.config.ts`

## 🔧 Advanced Configuration

### Custom Domain

1. Go to Vercel Project Settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records

### Edge Functions

```typescript
// app/api/edge/route.ts
export const runtime = 'edge';

export async function GET() {
  return new Response('Hello from Edge!');
}
```

### ISR (Incremental Static Regeneration)

```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);
  return <Article post={post} />;
}
```

### Caching Strategy

```typescript
// next.config.ts
export default {
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 📋 Deployment Checklist

Before every deployment:

- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] No linting errors
- [ ] Build succeeds locally
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Performance tested
- [ ] Security checked
- [ ] SEO verified
- [ ] Monitoring configured

## 🔗 Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)

---

**Last Updated:** December 1, 2024
