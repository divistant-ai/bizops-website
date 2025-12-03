# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 3. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

### 4. Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure

- `src/app/[locale]/` - All pages (with i18n support)
- `src/components/` - React components
- `src/contexts/` - React contexts
- `src/hooks/` - Custom React hooks
- `src/data/` - Data files and content
- `src/libs/` - Utility libraries
- `src/styles/` - Global styles

## 🌐 i18n Support

- Default locale: `id` (Indonesian)
- Supported locales: `id`, `en`, `fr`
- All pages are under `[locale]` route

## 🎨 Styling

- Tailwind CSS v4
- Dark mode support
- Custom animations included

## ✅ Migration Status

- ✅ 100% Complete
- ✅ All pages migrated
- ✅ All components migrated
- ✅ All data files migrated
- ✅ Ready for testing

## 📝 Notes

- Some pages may need i18n adaptation
- Some links may need i18n routing updates
- Test all pages after migration
