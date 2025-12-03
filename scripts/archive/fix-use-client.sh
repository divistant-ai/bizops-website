#!/bin/bash

echo "=== Fixing all 'use client' directives ==="

# List of files that need fixing
files=(
  "src/contexts/ThemeContext.tsx"
  "src/contexts/LanguageContext.tsx"
  "src/components/ui/Tabs.tsx"
  "src/components/ui/Card.tsx"
  "src/components/ui/Accordion.tsx"
  "src/components/ui/Dropdown.tsx"
  "src/components/ui/Badge.tsx"
  "src/components/ui/Loading.tsx"
  "src/components/ui/Modal.tsx"
  "src/components/ui/EmptyState.tsx"
  "src/components/ui/Skeleton.tsx"
  "src/components/layout/Navbar.tsx"
  "src/components/providers.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    # Check if file has 'use client' but not at first line
    if grep -q "'use client'" "$file" && [ "$(head -1 "$file")" != "'use client'" ]; then
      echo "Fixing $file..."
      # Remove 'use client' line
      sed -i '' "/^'use client';$/d" "$file"
      # Add 'use client' at the top
      sed -i '' "1s/^/'use client';\n/" "$file"
    fi
  fi
done

echo "✅ Done fixing 'use client' directives"

