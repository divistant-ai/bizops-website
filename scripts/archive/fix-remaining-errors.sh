#!/bin/bash
# Fix remaining errors after initial fix

cd "$(dirname "$0")"

echo "🔧 Fixing remaining errors..."

# Get all build errors
SKIP_ENV_VALIDATION=true npm run build:next 2>&1 | grep -E "Type error|error TS" | while read line; do
  # Extract file and error type
  file=$(echo "$line" | grep -oE "src/[^:]+" | head -1)
  error=$(echo "$line" | grep -oE "'[^']+' is declared but its value is never read" | grep -oE "'[^']+'" | tr -d "'")
  
  if [ -n "$file" ] && [ -n "$error" ]; then
    echo "Removing unused: $error from $file"
    sed -i '' "s/, $error//g; s/$error, //g; s/^import { $error }/\/\/ removed: $error/g" "$file" 2>/dev/null || \
    sed -i "s/, $error//g; s/$error, //g; s/^import { $error }/\/\/ removed: $error/g" "$file"
  fi
done

echo "✅ Done!"

