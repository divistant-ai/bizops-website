# 🔧 Auto-Fix Error Guide

## Solusi Efektif untuk Memperbaiki Semua Error

Script ini dirancang untuk **secara otomatis memperbaiki semua error** yang mungkin muncul dalam project.

## 📝 Scripts yang Tersedia

### 1. `auto-fix-all.sh` ⭐ **RECOMMENDED**

Script utama yang menjalankan semua fixes sekaligus:

```bash
./auto-fix-all.sh
```

**Apa yang dilakukan:**
- ✅ Fix semua import paths (`@/lib/utils` → `@/libs/utils`)
- ✅ Fix Button imports (default vs named export)
- ✅ Fix component imports
- ✅ Fix ErrorBoundary override modifiers
- ✅ Fix generateMetadata conflicts
- ✅ Install missing dependencies
- ✅ Remove unused imports (iterative, sampai bersih)

### 2. `fix-all-errors.sh`

Fix errors umum tanpa iterative cleanup:

```bash
./fix-all-errors.sh
```

### 3. `fix-unused-imports.js`

Hanya remove unused imports:

```bash
node fix-unused-imports.js
```

## 🚀 Cara Pakai

### Quick Start (Recommended)

```bash
cd bizops-website-v3
./auto-fix-all.sh
```

### Manual Step-by-Step

Jika ingin lebih kontrol:

```bash
# 1. Fix common errors
./fix-all-errors.sh

# 2. Install dependencies (jika perlu)
npm install framer-motion lucide-react clsx tailwind-merge

# 3. Remove unused imports
node fix-unused-imports.js

# 4. Verify
npm run check:types
npm run build:next
```

## 🔍 Error Types yang Diperbaiki

### 1. Import Path Errors
- `@/lib/utils/*` → `@/libs/utils/*`
- Relative paths → Absolute paths dengan alias

### 2. Button Import Errors
- `import { Button }` → `import Button` (default export)
- Path corrections untuk Button component

### 3. Component Import Errors
- Fix relative imports di components folder
- Fix OptimizedImage, Card, dll imports

### 4. TypeScript Errors
- ErrorBoundary `override` modifiers
- generateMetadata naming conflicts
- Unused imports removal

### 5. Missing Dependencies
- Auto-install: framer-motion, lucide-react, clsx, tailwind-merge

## 📊 Verifikasi

Setelah menjalankan script, verifikasi dengan:

```bash
# TypeScript check
npm run check:types

# Build test
SKIP_ENV_VALIDATION=true npm run build:next

# Lint check
npm run lint
```

## ⚠️ Troubleshooting

### Jika masih ada error:

1. **Jalankan script lagi** - beberapa fixes perlu dijalankan beberapa kali
2. **Check error manual** - baca output error dan fix manual jika perlu
3. **Update script** - tambahkan pattern error baru ke script

### Error yang tidak bisa auto-fix:

- Logic errors (perlu fix manual)
- Type mismatches yang kompleks
- Missing type definitions (perlu install @types/*)

## 🎯 Best Practices

1. **Selalu backup** sebelum run script
2. **Commit changes** sebelum run auto-fix
3. **Review changes** setelah auto-fix
4. **Test build** setelah auto-fix

## 📝 Notes

- Script menggunakan `sed` untuk file replacement
- Compatible dengan macOS (sed -i '') dan Linux (sed -i)
- Script akan skip jika file tidak ditemukan
- Unused import removal bersifat iterative (max 5 iterations)

---

**Created:** $(date)
**Version:** 1.0.0
