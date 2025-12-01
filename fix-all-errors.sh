#!/bin/bash

echo "=== Fixing All Errors ==="

# 1. Fix Link imports from next/navigation to next/link
echo "1. Fixing Link imports..."
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/from '\''next\/navigation'\''/from '\''next\/link'\''/g' 2>/dev/null || true
find src -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/import { Link }/import Link/g' 2>/dev/null || true

# 2. Fix Button imports
echo "2. Fixing Button imports..."
find src -name "*.tsx" | xargs sed -i '' "s/from '..\/Button'/from '..\/ui\/Button'/g" 2>/dev/null || true
find src -name "*.tsx" | xargs sed -i '' "s/from '.\/Button'/from '.\/ui\/Button'/g" 2>/dev/null || true

# 3. Fix React imports
echo "3. Fixing React imports..."
find src -name "*.tsx" | xargs grep -l "React\." | xargs grep -L "import React" | while read file; do
  if grep -q "React\." "$file"; then
    sed -i '' '1s/^/import React from '\''react'\'';\n/' "$file" 2>/dev/null || true
  fi
done

echo "✅ Basic fixes applied"
