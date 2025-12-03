#!/bin/bash
cd "$(dirname "$0")"

echo "Fixing remaining issues..."

# Fix BaseTemplate React import issue
sed -i '' '1s/^import React from '\''react'\'';$/\/\/ React import removed (not needed in Next.js 13+)/' src/templates/BaseTemplate.tsx 2>/dev/null || \
sed -i '1s/^import React from '\''react'\'';$/\/\/ React import removed (not needed in Next.js 13+)/' src/templates/BaseTemplate.tsx

# Remove React import if causing issues
if grep -q "^import React from 'react';" src/templates/BaseTemplate.tsx; then
  sed -i '' '/^import React from '\''react'\'';$/d' src/templates/BaseTemplate.tsx 2>/dev/null || \
  sed -i '/^import React from '\''react'\'';$/d' src/templates/BaseTemplate.tsx
fi

echo "✅ Fixed BaseTemplate"
