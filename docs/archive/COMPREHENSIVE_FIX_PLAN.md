# 🔧 Comprehensive Fix Plan - Based on Root Cause Analysis

## Root Causes Summary

### 1. Path Alias Inconsistency ⚠️ **CRITICAL**
- **73 files** menggunakan `@/libs/utils/*`
- **8 files** menggunakan `@/utils/*`
- **File duplicates**: `DBConnection.ts` ada di 2 tempat
- **Case sensitivity**: `helpers.ts` vs `Helpers.ts`

### 2. Component Export Paths ⚠️
- `src/components/ui/index.ts` menggunakan path salah

### 3. Missing Imports ⚠️
- Components menggunakan icons tanpa import

### 4. Incomplete Migration ⚠️
- File duplicate dan import paths tidak konsisten

## Decision: Standard Path Structure

**Decision**: Keep `src/libs/utils/` sebagai standard karena:
- 73 files sudah menggunakan `@/libs/utils/*` (91% dari total)
- Template original juga menggunakan `@/libs/*` untuk beberapa utilities
- Lebih konsisten dengan struktur `src/libs/`

**Action**:
- Migrate 8 files dari `@/utils/*` ke `@/libs/utils/*`
- Merge duplicate files
- Remove `src/utils/` folder (atau keep hanya untuk template-specific files)

## Fix Strategy

### Phase 1: Standardize Path Structure
1. **Analyze** files di `src/utils/` vs `src/libs/utils/`
2. **Merge** duplicate files (pilih yang lebih complete)
3. **Migrate** semua imports dari `@/utils/*` ke `@/libs/utils/*`
4. **Remove** duplicates

### Phase 2: Fix Component Exports
1. Fix `src/components/ui/index.ts` paths
2. Verify all exports

### Phase 3: Fix Missing Imports
1. Auto-detect missing imports
2. Fix secara batch

### Phase 4: Verify
1. TypeScript check
2. Build test
3. Lint check

## Implementation Steps

### Step 1: Analyze File Differences
```bash
# Compare duplicate files
diff src/utils/DBConnection.ts src/libs/utils/DBConnection.ts
diff src/utils/Helpers.ts src/libs/utils/helpers.ts
```

### Step 2: Merge & Standardize
- Keep `src/libs/utils/DBConnection.ts` (lebih complete)
- Keep `src/libs/utils/helpers.ts` (sudah digunakan 73 files)
- Migrate `src/utils/AppConfig.ts` ke `src/libs/utils/AppConfig.ts` jika belum ada

### Step 3: Update All Imports
```bash
# Migrate @/utils/* to @/libs/utils/*
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  's|@/utils/|@/libs/utils/|g' {} +
```

### Step 4: Remove Duplicates
```bash
# Remove src/utils/ folder (atau keep untuk template-specific)
rm -rf src/utils/DBConnection.ts
rm -rf src/utils/Helpers.ts
```

### Step 5: Fix Component Exports
- Fix `src/components/ui/index.ts`

### Step 6: Auto-Fix Missing Imports
- Run `node fix-missing-imports.js`

### Step 7: Verify
```bash
npm run check:types
SKIP_ENV_VALIDATION=true npm run build:next
```

---

**Status**: Ready to implement
**Priority**: High
**Estimated Time**: 30-60 minutes
