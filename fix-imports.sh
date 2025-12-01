#!/bin/bash
# Script to fix imports in migrated pages
# This will update imports to work with v3 structure

find src/app/\[locale\] -name "*.tsx" -o -name "*.ts" | while read file; do
  # Fix imports that use @/lib/utils/metadata to @/libs/utils/metadata
  sed -i '' 's|@/lib/utils/|@/libs/utils/|g' "$file" 2>/dev/null || sed -i 's|@/lib/utils/|@/libs/utils/|g' "$file"
  
  # Fix imports that use @/components to ensure correct paths
  # Already correct, but ensure consistency
  
  echo "Fixed: $file"
done

echo "✅ Import fixes applied"
