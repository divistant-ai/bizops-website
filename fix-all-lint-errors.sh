#!/bin/bash
# Comprehensive fix for all lint and TypeScript errors

cd "$(dirname "$0")"

set -e

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🔧 FIXING ALL LINT & TYPE ERRORS 🔧               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Fix import paths
echo "1️⃣  Fixing import paths..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e "s|@/libs/utils/Helpers|@/utils/Helpers|g" \
  -e "s|@/libs/utils/AppConfig|@/utils/AppConfig|g" \
  -e "s|@/libs/utils/helpers|@/utils/Helpers|g" \
  {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s|@/libs/utils/Helpers|@/utils/Helpers|g" \
  -e "s|@/libs/utils/AppConfig|@/utils/AppConfig|g" \
  -e "s|@/libs/utils/helpers|@/utils/Helpers|g" \
  {} +
echo "   ✅ Import paths fixed"

# Step 2: Fix component imports in ui/index.ts
echo "2️⃣  Fixing component exports..."
sed -i '' \
  -e "s|from './ui/Button'|from './Button'|g" \
  -e "s|from './ui/Card'|from './Card'|g" \
  -e "s|from './ui/OptimizedImage'|from './OptimizedImage'|g" \
  src/components/ui/index.ts 2>/dev/null || sed -i \
  -e "s|from './ui/Button'|from './Button'|g" \
  -e "s|from './ui/Card'|from './Card'|g" \
  -e "s|from './ui/OptimizedImage'|from './OptimizedImage'|g" \
  src/components/ui/index.ts
echo "   ✅ Component exports fixed"

# Step 3: Fix Button imports (ensure default import)
echo "3️⃣  Fixing Button imports..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e "s|import { Button } from '@/components/ui'|import Button from '@/components/ui/Button'|g" \
  -e "s|import { Button } from './ui'|import Button from './ui/Button'|g" \
  -e "s|import { Button } from '../ui'|import Button from '../ui/Button'|g" \
  {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s|import { Button } from '@/components/ui'|import Button from '@/components/ui/Button'|g" \
  -e "s|import { Button } from './ui'|import Button from './ui/Button'|g" \
  -e "s|import { Button } from '../ui'|import Button from '../ui/Button'|g" \
  {} +
echo "   ✅ Button imports fixed"

# Step 4: Remove unused imports (iterative)
echo "4️⃣  Removing unused imports..."
for i in {1..5}; do
  unused=$(npm run check:types 2>&1 | grep -oE "'[^']+' is declared but its value is never read" | grep -oE "'[^']+'" | tr -d "'" | sort -u | head -5)
  if [ -z "$unused" ]; then
    echo "   ✅ No unused imports found"
    break
  fi
  echo "   Iteration $i: Removing unused imports..."
  echo "$unused" | while read item; do
    find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
      -e "s/, $item//g" \
      -e "s/$item, //g" \
      -e "s/^import { $item } from/\/\/ removed: $item/g" \
      {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
      -e "s/, $item//g" \
      -e "s/$item, //g" \
      -e "s/^import { $item } from/\/\/ removed: $item/g" \
      {} +
  done
done

# Step 5: Fix generateMetadata conflicts
echo "5️⃣  Fixing generateMetadata conflicts..."
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
echo "   ✅ generateMetadata conflicts fixed"

# Step 6: Fix ErrorBoundary override modifiers
echo "6️⃣  Fixing ErrorBoundary..."
sed -i '' \
  -e 's/^  public state:/  public override state:/g' \
  -e 's/^  public componentDidCatch(/  public override componentDidCatch(/g' \
  -e 's/^  public render()/  public override render()/g' \
  src/components/ErrorBoundary.tsx 2>/dev/null || sed -i \
  -e 's/^  public state:/  public override state:/g' \
  -e 's/^  public componentDidCatch(/  public override componentDidCatch(/g' \
  -e 's/^  public render()/  public override render()/g' \
  src/components/ErrorBoundary.tsx
echo "   ✅ ErrorBoundary fixed"

echo ""
echo "✅ All fixes applied!"
echo ""

