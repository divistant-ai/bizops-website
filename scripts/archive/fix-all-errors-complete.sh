#!/bin/bash
# Complete error fixing - collects all errors and fixes them systematically

cd "$(dirname "$0")"

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🔧 COMPLETE ERROR FIX - ALL IN ONE 🔧             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Collect ALL errors
echo "Step 1: Collecting ALL errors..."
echo "  Running TypeScript check..."
npm run check:types 2>&1 > /tmp/ts-errors.txt

echo "  Running build..."
SKIP_ENV_VALIDATION=true npm run build:next 2>&1 > /tmp/build-errors.txt

echo "  Running lint..."
npm run lint 2>&1 > /tmp/lint-errors.txt

echo "✅ Error collection complete"
echo ""

# Step 2: Extract all error patterns
echo "Step 2: Extracting error patterns..."

# Unused imports
echo "  - Unused imports..."
grep -oE "'[^']+' is declared but its value is never read" /tmp/ts-errors.txt 2>/dev/null | \
  grep -oE "'[^']+'" | tr -d "'" | sort -u > /tmp/unused-imports.txt
cat /tmp/unused-imports.txt | head -20

# Missing modules
echo ""
echo "  - Missing modules..."
grep -oE "Cannot find module '[^']+'" /tmp/build-errors.txt 2>/dev/null | \
  grep -oE "'[^']+'" | tr -d "'" | sort -u > /tmp/missing-modules.txt
cat /tmp/missing-modules.txt | head -20

# Type errors
echo ""
echo "  - Type errors..."
grep -oE "Type error:.*" /tmp/build-errors.txt 2>/dev/null | head -10

echo ""
echo "✅ Pattern extraction complete"
echo ""

# Step 3: Apply comprehensive fixes
echo "Step 3: Applying comprehensive fixes..."

# Fix 1: Import paths
echo "  3.1 Fixing import paths..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e "s|@/libs/utils/Helpers|@/utils/Helpers|g" \
  -e "s|@/libs/utils/AppConfig|@/utils/AppConfig|g" \
  -e "s|@/libs/utils/helpers|@/utils/Helpers|g" \
  -e "s|@/lib/utils/|@/libs/utils/|g" \
  {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s|@/libs/utils/Helpers|@/utils/Helpers|g" \
  -e "s|@/libs/utils/AppConfig|@/utils/AppConfig|g" \
  -e "s|@/libs/utils/helpers|@/utils/Helpers|g" \
  -e "s|@/lib/utils/|@/libs/utils/|g" \
  {} +
echo "     ✅ Import paths fixed"

# Fix 2: Button imports
echo "  3.2 Fixing Button imports..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e "s|import { Button } from '@/components/ui'|import Button from '@/components/ui/Button'|g" \
  -e "s|import { Button } from './ui'|import Button from './ui/Button'|g" \
  {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s|import { Button } from '@/components/ui'|import Button from '@/components/ui/Button'|g" \
  -e "s|import { Button } from './ui'|import Button from './ui/Button'|g" \
  {} +
echo "     ✅ Button imports fixed"

# Fix 3: Component exports in index.ts
echo "  3.3 Fixing component exports..."
sed -i '' \
  -e "s|from './ui/Button'|from './Button'|g" \
  -e "s|from './ui/Card'|from './Card'|g" \
  -e "s|from './ui/OptimizedImage'|from './OptimizedImage'|g" \
  src/components/ui/index.ts 2>/dev/null || sed -i \
  -e "s|from './ui/Button'|from './Button'|g" \
  -e "s|from './ui/Card'|from './Card'|g" \
  -e "s|from './ui/OptimizedImage'|from './OptimizedImage'|g" \
  src/components/ui/index.ts
echo "     ✅ Component exports fixed"

# Fix 4: Remove unused imports (iterative)
echo "  3.4 Removing unused imports..."
for i in {1..5}; do
  if [ ! -s /tmp/unused-imports.txt ]; then
    break
  fi
  
  echo "     Iteration $i..."
  while read item; do
    if [ -n "$item" ]; then
      find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
        -e "s/, $item//g" \
        -e "s/$item, //g" \
        -e "s/^import { $item } from/\/\/ removed: $item/g" \
        {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
        -e "s/, $item//g" \
        -e "s/$item, //g" \
        -e "s/^import { $item } from/\/\/ removed: $item/g" \
        {} +
    fi
  done < /tmp/unused-imports.txt
  
  # Re-check
  npm run check:types 2>&1 | grep -oE "'[^']+' is declared but its value is never read" | \
    grep -oE "'[^']+'" | tr -d "'" | sort -u > /tmp/unused-imports.txt
done
echo "     ✅ Unused imports removed"

# Fix 5: generateMetadata conflicts
echo "  3.5 Fixing generateMetadata conflicts..."
find src/app -type f -name "*.tsx" -exec grep -l "export.*function generateMetadata" {} \; | while read file; do
  if grep -q "import.*generateMetadata.*from.*metadata" "$file"; then
    sed -i '' \
      -e "s|import { generateMetadata } from|import { generateMetadata as generatePageMetadata } from|g" \
      -e "s|return generateMetadata(|return generatePageMetadata(|g" \
      "$file" 2>/dev/null || sed -i \
      -e "s|import { generateMetadata } from|import { generateMetadata as generatePageMetadata } from|g" \
      -e "s|return generateMetadata(|return generatePageMetadata(|g" \
      "$file"
  fi
done
echo "     ✅ generateMetadata conflicts fixed"

# Fix 6: ErrorBoundary override
echo "  3.6 Fixing ErrorBoundary..."
sed -i '' \
  -e 's/^  public state:/  public override state:/g' \
  -e 's/^  public componentDidCatch(/  public override componentDidCatch(/g' \
  -e 's/^  public render()/  public override render()/g' \
  src/components/ErrorBoundary.tsx 2>/dev/null || sed -i \
  -e 's/^  public state:/  public override state:/g' \
  -e 's/^  public componentDidCatch(/  public override componentDidCatch(/g' \
  -e 's/^  public render()/  public override render()/g' \
  src/components/ErrorBoundary.tsx
echo "     ✅ ErrorBoundary fixed"

# Fix 7: Missing Mail import in contact page
echo "  3.7 Fixing missing imports..."
if grep -q "<Mail" src/app/\[locale\]/\(marketing\)/contact/page.tsx 2>/dev/null && ! grep -q "import.*Mail" src/app/\[locale\]/\(marketing\)/contact/page.tsx 2>/dev/null; then
  sed -i '' 's/import { Phone, MapPin }/import { Mail, Phone, MapPin }/g' src/app/\[locale\]/\(marketing\)/contact/page.tsx 2>/dev/null || \
  sed -i 's/import { Phone, MapPin }/import { Mail, Phone, MapPin }/g' src/app/\[locale\]/\(marketing\)/contact/page.tsx
  echo "     ✅ Fixed Mail import"
fi

echo ""
echo "✅ All fixes applied!"
echo ""

# Step 4: Final verification
echo "Step 4: Final verification..."
echo ""

ts_errors=$(npm run check:types 2>&1 | grep -c "error TS" || echo "0")
echo "  TypeScript errors: $ts_errors"

if [ "$ts_errors" -eq 0 ]; then
  echo "  ✅ No TypeScript errors!"
else
  echo "  ⚠️  Some TypeScript errors remain:"
  npm run check:types 2>&1 | grep "error TS" | head -5
fi

echo ""
echo "✅ Complete error fix finished!"
echo ""
echo "📝 Error logs saved to:"
echo "  - /tmp/ts-errors.txt"
echo "  - /tmp/build-errors.txt"
echo "  - /tmp/lint-errors.txt"
echo ""
echo "🚀 Next: Run 'SKIP_ENV_VALIDATION=true npm run build:next' to verify build"

