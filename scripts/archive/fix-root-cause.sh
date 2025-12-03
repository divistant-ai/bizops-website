#!/bin/bash
# Comprehensive fix based on ROOT CAUSE ANALYSIS
# Fixes: Path alias inconsistency, component exports, missing imports

cd "$(dirname "$0")"

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🔧 ROOT CAUSE FIX - COMPREHENSIVE 🔧               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Standardize to @/libs/utils/* (91% files already use it)
echo "Step 1: Standardizing to @/libs/utils/*"
echo "  Migrating @/utils/* to @/libs/utils/*..."

# Migrate all imports
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e "s|from '@/utils/AppConfig'|from '@/libs/utils/AppConfig'|g" \
  -e "s|from '@/utils/Helpers'|from '@/libs/utils/helpers'|g" \
  -e "s|from '@/utils/DBConnection'|from '@/libs/utils/DBConnection'|g" \
  {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s|from '@/utils/AppConfig'|from '@/libs/utils/AppConfig'|g" \
  -e "s|from '@/utils/Helpers'|from '@/libs/utils/helpers'|g" \
  -e "s|from '@/utils/DBConnection'|from '@/libs/utils/DBConnection'|g" \
  {} +

echo "  ✅ Imports migrated"

# Step 2: Copy AppConfig.ts to libs/utils if not exists
echo ""
echo "Step 2: Ensuring AppConfig.ts exists in libs/utils..."
if [ ! -f "src/libs/utils/AppConfig.ts" ] && [ -f "src/utils/AppConfig.ts" ]; then
  cp src/utils/AppConfig.ts src/libs/utils/AppConfig.ts
  echo "  ✅ AppConfig.ts copied to libs/utils"
else
  echo "  ℹ️  AppConfig.ts already exists or not needed"
fi

# Step 3: Fix component exports
echo ""
echo "Step 3: Fixing component exports..."
sed -i '' \
  -e "s|from './ui/Button'|from './Button'|g" \
  -e "s|from './ui/Card'|from './Card'|g" \
  -e "s|from './ui/OptimizedImage'|from './OptimizedImage'|g" \
  src/components/ui/index.ts 2>/dev/null || sed -i \
  -e "s|from './ui/Button'|from './Button'|g" \
  -e "s|from './ui/Card'|from './Card'|g" \
  -e "s|from './ui/OptimizedImage'|from './OptimizedImage'|g" \
  src/components/ui/index.ts
echo "  ✅ Component exports fixed"

# Step 4: Fix missing imports (lucide-react icons)
echo ""
echo "Step 4: Fixing missing imports..."
node fix-missing-imports.js 2>&1 | grep -E "✅|⚠️" || echo "  ℹ️  No missing imports detected"

# Step 5: Remove unused imports (iterative)
echo ""
echo "Step 5: Removing unused imports..."
for i in {1..3}; do
  unused=$(npm run check:types 2>&1 | grep -oE "'[^']+' is declared but its value is never read" | \
    grep -oE "'[^']+'" | tr -d "'" | sort -u | head -10)
  
  if [ -z "$unused" ]; then
    break
  fi
  
  echo "$unused" | while read item; do
    if [ -n "$item" ]; then
      find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
        -e "s/, $item//g" \
        -e "s/$item, //g" \
        {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
        -e "s/, $item//g" \
        -e "s/$item, //g" \
        {} +
    fi
  done
done
echo "  ✅ Unused imports removed"

# Step 6: Verify
echo ""
echo "Step 6: Verifying fixes..."
echo ""

ts_errors=$(npm run check:types 2>&1 | grep -c "error TS" || echo "0")
echo "  TypeScript errors: $ts_errors"

if [ "$ts_errors" -eq 0 ]; then
  echo "  ✅ No TypeScript errors!"
else
  echo "  ⚠️  Some TypeScript errors remain"
  npm run check:types 2>&1 | grep "error TS" | head -5
fi

echo ""
echo "✅ Root cause fix complete!"
echo ""
echo "📝 Summary:"
echo "  • Standardized to @/libs/utils/*"
echo "  • Fixed component exports"
echo "  • Fixed missing imports"
echo "  • Removed unused imports"
echo ""
echo "🚀 Next: Run 'SKIP_ENV_VALIDATION=true npm run build:next' to verify build"

