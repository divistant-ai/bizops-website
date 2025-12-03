#!/bin/bash
# Comprehensive error collection and batch fixing

cd "$(dirname "$0")"

echo "╔════════════════════════════════════════════════════════╗"
echo "║     📊 COLLECTING ALL ERRORS & FIXING 📊               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Collect all errors
echo "Step 1: Collecting all errors..."
echo "  - TypeScript errors..."
npm run check:types 2>&1 > /tmp/ts-errors.txt

echo "  - Build errors..."
SKIP_ENV_VALIDATION=true npm run build:next 2>&1 > /tmp/build-errors.txt

echo "  - ESLint errors..."
npm run lint 2>&1 > /tmp/lint-errors.txt

echo "✅ Error collection complete"
echo ""

# Step 2: Analyze and categorize errors
echo "Step 2: Analyzing errors..."
echo ""

# TypeScript errors
ts_count=$(grep -c "error TS" /tmp/ts-errors.txt 2>/dev/null || echo "0")
echo "  TypeScript errors: $ts_count"

# Build errors
build_count=$(grep -cE "Type error|Cannot find|Module not found" /tmp/build-errors.txt 2>/dev/null || echo "0")
echo "  Build errors: $build_count"

# Lint errors
lint_count=$(grep -cE "error|warning" /tmp/lint-errors.txt 2>/dev/null || echo "0")
echo "  Lint errors: $lint_count"

echo ""

# Step 3: Extract error patterns
echo "Step 3: Extracting error patterns..."

# Missing modules
echo "  Missing modules:"
grep -oE "Cannot find module '[^']+'" /tmp/build-errors.txt 2>/dev/null | sort -u | head -10

# Type errors
echo ""
echo "  Type errors:"
grep -oE "Type error:.*" /tmp/build-errors.txt 2>/dev/null | head -5

# Unused imports
echo ""
echo "  Unused imports:"
grep -oE "'[^']+' is declared but its value is never read" /tmp/ts-errors.txt 2>/dev/null | grep -oE "'[^']+'" | sort -u | head -10

echo ""
echo "✅ Analysis complete"
echo ""

# Step 4: Apply fixes
echo "Step 4: Applying fixes..."

# Fix missing modules
echo "  4.1 Fixing missing modules..."
./fix-all-errors.sh 2>&1 | grep -E "✅|Fixing" || true

# Fix import paths
echo "  4.2 Fixing import paths..."
find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
  -e "s|@/libs/utils/Helpers|@/utils/Helpers|g" \
  -e "s|@/libs/utils/AppConfig|@/utils/AppConfig|g" \
  -e "s|@/libs/utils/helpers|@/utils/Helpers|g" \
  {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
  -e "s|@/libs/utils/Helpers|@/utils/Helpers|g" \
  -e "s|@/libs/utils/AppConfig|@/utils/AppConfig|g" \
  -e "s|@/libs/utils/helpers|@/utils/Helpers|g" \
  {} +

# Fix unused imports (iterative)
echo "  4.3 Removing unused imports..."
for i in {1..3}; do
  unused=$(grep -oE "'[^']+' is declared but its value is never read" /tmp/ts-errors.txt 2>/dev/null | grep -oE "'[^']+'" | tr -d "'" | sort -u | head -5)
  if [ -z "$unused" ]; then
    break
  fi
  echo "$unused" | while read item; do
    find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
      -e "s/, $item//g" \
      -e "s/$item, //g" \
      {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
      -e "s/, $item//g" \
      -e "s/$item, //g" \
      {} +
  done
  # Re-check
  npm run check:types 2>&1 > /tmp/ts-errors.txt
done

echo "✅ All fixes applied"
echo ""

# Step 5: Verification
echo "Step 5: Verifying fixes..."
echo ""

ts_after=$(npm run check:types 2>&1 | grep -c "error TS" || echo "0")
echo "  TypeScript errors after fix: $ts_after"

if [ "$ts_after" -eq 0 ]; then
  echo "  ✅ No TypeScript errors!"
else
  echo "  ⚠️  Some TypeScript errors remain"
  npm run check:types 2>&1 | grep "error TS" | head -5
fi

echo ""
echo "✅ Process complete!"
echo ""
echo "📝 Error logs saved to:"
echo "  - /tmp/ts-errors.txt"
echo "  - /tmp/build-errors.txt"
echo "  - /tmp/lint-errors.txt"

