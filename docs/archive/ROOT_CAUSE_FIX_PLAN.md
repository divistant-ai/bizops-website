# Root Cause Fix Plan

## Root Causes Identified

### 1. Path Alias Inconsistency
- **Problem**: Dua lokasi utils (`src/utils/` dan `src/libs/utils/`)
- **Solution**: Standardize ke `src/utils/` (template standard)

### 2. Component Export Paths
- **Problem**: `src/components/ui/index.ts` menggunakan path salah
- **Solution**: Fix semua relative paths

### 3. Missing Imports
- **Problem**: Components menggunakan icons tanpa import
- **Solution**: Auto-detect dan fix

### 4. Incomplete Migration
- **Problem**: File duplicate dan import paths tidak konsisten
- **Solution**: Complete migration dengan proper mapping

## Fix Strategy

1. **Standardize** semua imports ke `@/utils/*`
2. **Remove** duplicates di `src/libs/utils/`
3. **Fix** component exports
4. **Auto-detect** missing imports
5. **Verify** build
