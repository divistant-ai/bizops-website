#!/bin/bash
cd "$(dirname "$0")"

echo "Fixing all remaining errors..."

# Get all build errors
SKIP_ENV_VALIDATION=true npm run build:next 2>&1 | grep -E "Type error|Cannot find|Module not found" | while read line; do
  # Extract unused imports
  if echo "$line" | grep -q "is declared but its value is never read"; then
    item=$(echo "$line" | grep -oE "'[^']+'" | head -1 | tr -d "'")
    if [ -n "$item" ]; then
      echo "Removing unused: $item"
      find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
        -e "s/, $item//g" \
        -e "s/$item, //g" \
        -e "s/^import { $item }/\/\/ removed: $item/g" \
        {} + 2>/dev/null || find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
        -e "s/, $item//g" \
        -e "s/$item, //g" \
        -e "s/^import { $item }/\/\/ removed: $item/g" \
        {} +
    fi
  fi
  
  # Extract missing modules
  if echo "$line" | grep -q "Cannot find module"; then
    module=$(echo "$line" | grep -oE "'[^']+'" | head -1 | tr -d "'")
    if [ -n "$module" ]; then
      echo "Fixing module: $module"
      # Fix common patterns
      if echo "$module" | grep -q "@/libs/utils/"; then
        new_module=$(echo "$module" | sed 's|@/libs/utils/|@/utils/|g')
        find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' "s|$module|$new_module|g" {} + 2>/dev/null || \
        find src -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i "s|$module|$new_module|g" {} +
      fi
    fi
  fi
done

echo "✅ Done!"
