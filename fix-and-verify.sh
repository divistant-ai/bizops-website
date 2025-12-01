#!/bin/bash
# Comprehensive fix and verify script

cd "$(dirname "$0")"

set -e

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🔧 FIXING ALL ERRORS & VERIFYING 🔧               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Run all fixes
echo "Step 1: Running comprehensive fixes..."
./fix-all-errors.sh 2>&1 | grep -E "✅|Fixing" || true

# Step 2: Install all dependencies
echo ""
echo "Step 2: Installing dependencies..."
npm install framer-motion lucide-react clsx tailwind-merge 2>&1 | tail -3

# Step 3: Fix unused imports (multiple iterations)
echo ""
echo "Step 3: Removing unused imports..."
for i in {1..3}; do
  echo "  Iteration $i..."
  output=$(node fix-unused-imports.js 2>&1)
  if echo "$output" | grep -q "Found 0"; then
    echo "  ✅ No more unused imports"
    break
  fi
  echo "$output" | grep -E "Found|Removing" || true
done

# Step 4: Fix specific known issues
echo ""
echo "Step 4: Fixing specific issues..."

# Fix BaseTemplate React import
if [ -f "src/templates/BaseTemplate.tsx" ]; then
  sed -i '' '1i\
import React from '\''react'\'';
' src/templates/BaseTemplate.tsx 2>/dev/null || \
  sed -i '1i import React from '\''react'\'';' src/templates/BaseTemplate.tsx
  echo "  ✅ Fixed BaseTemplate"
fi

# Step 5: TypeScript check
echo ""
echo "Step 5: TypeScript check..."
ts_errors=$(npm run check:types 2>&1 | grep -c "error TS" || echo "0")
echo "  TypeScript errors: $ts_errors"

if [ "$ts_errors" -gt 0 ]; then
  echo "  ⚠️  Some TypeScript errors remain"
  npm run check:types 2>&1 | grep "error TS" | head -5
else
  echo "  ✅ No TypeScript errors!"
fi

# Step 6: Build test
echo ""
echo "Step 6: Testing build..."
if SKIP_ENV_VALIDATION=true npm run build:next 2>&1 | grep -q "Compiled successfully"; then
  echo "  ✅ Build successful!"
  exit 0
else
  echo "  ⚠️  Build has errors, checking..."
  SKIP_ENV_VALIDATION=true npm run build:next 2>&1 | grep -E "Type error|error TS|Cannot find" | head -10
  exit 1
fi

