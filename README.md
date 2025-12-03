# BizOps Website V3

> Platform ERP Indonesia yang menyatukan HR, Finance, Operations, Sales, dan Supply Chain dalam satu sistem terintegrasi.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0+-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/divistant-ai/bizops-website.git
cd bizops-website

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` 🎉

## ✨ Features

### Core Features
- ⚡ **Next.js 16+** with App Router
- 🎨 **Tailwind CSS 4** for styling
- 🔐 **Clerk** for authentication
- 🗄️ **Drizzle ORM** + Neon Postgres
- 🌐 **i18n** with next-intl (ID + EN)
- 🎭 **Framer Motion** for animations
- 📊 **PostHog** analytics
- 🐛 **Sentry** error monitoring

### Developer Experience
- 📝 **TypeScript** strict mode
- 🧪 **Vitest** + Playwright testing
- 🎯 **ESLint** + Prettier
- 🪝 **Lefthook** git hooks
- 📦 **Drizzle Studio** database explorer

## 📚 Documentation

See [docs/README.md](./docs/README.md) for complete documentation.

- **[Testing Guide](./docs/guides/TESTING.md)** - Writing tests
- **[Animation Guide](./docs/guides/ANIMATION.md)** - Using Framer Motion
- **[Deployment Guide](./docs/guides/DEPLOYMENT.md)** - Deploy to production

## 🏗️ Project Structure

```
bizops-website-v3/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── [locale]/           # Internationalized routes
│   │       ├── (marketing)/    # Marketing pages
│   │       ├── (auth)/         # Auth pages
│   │       └── (dashboard)/    # Dashboard pages
│   ├── components/             # React components
│   │   ├── ui/                 # Base UI components
│   │   ├── layout/             # Layout components
│   │   ├── templates/          # Page templates
│   │   └── pages/              # Page-specific components
│   ├── data/                   # Static data & content
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Utility functions
│   ├── libs/                   # Third-party integrations
│   └── locales/                # i18n translations
├── public/                     # Static assets
├── tests/                      # Test files
│   ├── e2e/                    # End-to-end tests
│   ├── integration/            # Integration tests
│   └── unit/                   # Unit tests
└── docs/                       # Documentation
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables

Required variables for production:

```env
# Database
DATABASE_URL=postgresql://...

# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Monitoring (Sentry)
SENTRY_DSN=https://...@sentry.io/...
```

See [Deployment Guide](./docs/guides/DEPLOYMENT.md) for detailed instructions.

## 📊 Project Status

✅ **Production Ready** - All features complete and tested

## 🛠️ Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # TypeScript type checking
```

### Database
```bash
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open Drizzle Studio
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run test:coverage # Generate coverage report
```

## 🎨 Key Features

### Animation System
Consistent animations using Framer Motion:

```tsx
import { FADE_UP_VARIANTS, STAGGER_CONTAINER } from '@/utils/animation';

<motion.div variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={FADE_UP_VARIANTS}>
      {item.content}
    </motion.div>
  ))}
</motion.div>;
```

### Formatting Utilities
Consistent data formatting:

```tsx
import { formatCurrency, formatDate } from '@/utils/format';

<p>Harga: {formatCurrency(2500000)}</p>
<p>Tanggal: {formatDate(new Date())}</p>
```

### Custom Hooks
Reusable React hooks:

```tsx
import { useDebounce, useErrorHandler, useModal } from '@/hooks';

const debouncedSearch = useDebounce(searchTerm, 500);
const modal = useModal();
const handleError = useErrorHandler();
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit: `git commit -m "feat: your feature"`
6. Push: `git push origin feature/your-feature`
7. Create a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📞 Support

- **Email:** dev@bizops.id
- **Documentation:** [docs.bizops.id](https://docs.bizops.id)
- **Issues:** [GitHub Issues](https://github.com/divistant-ai/bizops-website/issues)

## 📄 License

Copyright © 2024 BizOps Indonesia. All rights reserved.

See [LICENSE](./LICENSE) for more information.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Clerk](https://clerk.com/) - Authentication
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [PostHog](https://posthog.com/) - Product analytics
- [Sentry](https://sentry.io/) - Error monitoring

---

**Made with ❤️ by BizOps Team**

**Version:** 3.0.0
**Last Updated:** December 1, 2024
