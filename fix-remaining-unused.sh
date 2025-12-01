#!/bin/bash
# Fix remaining unused imports

cd "$(dirname "$0")"

echo "Fixing remaining unused imports..."

# Fix telemetry.ts
sed -i '' 's/BatchSpanProcessor, //g; s/, BatchSpanProcessor//g' src/libs/utils/telemetry.ts 2>/dev/null || \
sed -i 's/BatchSpanProcessor, //g; s/, BatchSpanProcessor//g' src/libs/utils/telemetry.ts
sed -i '' 's/Resource, //g; s/, Resource//g' src/libs/utils/telemetry.ts 2>/dev/null || \
sed -i 's/Resource, //g; s/, Resource//g' src/libs/utils/telemetry.ts
sed -i '' 's/context, //g; s/, context//g' src/libs/utils/telemetry.ts 2>/dev/null || \
sed -i 's/context, //g; s/, context//g' src/libs/utils/telemetry.ts

# Fix analytics.ts
sed -i '' 's/metricName, //g; s/, metricName//g' src/libs/utils/analytics.ts 2>/dev/null || \
sed -i 's/metricName, //g; s/, metricName//g' src/libs/utils/analytics.ts

# Fix integrations.ts - remove unused appId parameter
sed -i '' 's/appId, //g; s/, appId//g' src/libs/utils/integrations.ts 2>/dev/null || \
sed -i 's/appId, //g; s/, appId//g' src/libs/utils/integrations.ts

# Fix useLocalStorage.ts
sed -i '' 's/setValue, //g; s/, setValue//g' src/hooks/useLocalStorage.ts 2>/dev/null || \
sed -i 's/setValue, //g; s/, setValue//g' src/hooks/useLocalStorage.ts

# Fix useReducedMotion.ts
sed -i '' 's/prefersReducedMotion, //g; s/, prefersReducedMotion//g' src/hooks/useReducedMotion.ts 2>/dev/null || \
sed -i 's/prefersReducedMotion, //g; s/, prefersReducedMotion//g' src/hooks/useReducedMotion.ts

echo "✅ Fixed remaining unused imports"

