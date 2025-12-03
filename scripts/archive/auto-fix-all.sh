#!/bin/bash
# Complete auto-fix workflow - runs all fixes in sequence

cd "$(dirname "$0")"

echo "╔════════════════════════════════════════════════════════╗"
echo "║     🤖 AUTO-FIX ALL ERRORS WORKFLOW 🤖                ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Step 1: Run comprehensive fixes
echo "Step 1: Running comprehensive fixes..."
./fix-all-errors.sh

# Step 2: Install missing dependencies
echo ""
echo "Step 2: Checking dependencies..."
npm install framer-motion lucide-react clsx tailwind-merge 2>&1 | tail -3

# Step 3: Fix unused imports iteratively
echo ""
echo "Step 3: Removing unused imports (iterative)..."
for i in {1..5}; do
  echo "  Iteration $i..."
  node fix-unused-imports.js 2>&1 | grep -E "Found|Removing|Done" || break
done

# Step 4: Final verification
echo ""
echo "Step 4: Final verification..."
echo "TypeScript errors: $(npm run check:types 2>&1 | grep -c 'error TS' || echo '0')"

echo ""
echo "✅ Auto-fix complete!"
echo ""
echo "Run 'npm run build:next' to verify build"
