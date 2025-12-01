#!/bin/bash
# Helper script to start Next.js with Turbopack in debug mode (optimized for client-side debugging)

echo "🚀 Starting Next.js with Turbopack in debug mode..."
echo "⚡ Turbopack enabled for faster client-side debugging"
echo "📡 Debugger will be available on port 9229"
echo "🌐 Server will start on http://localhost:3000"
echo ""
echo "💡 For client-side debugging:"
echo "  1. Open Debug panel (Cmd+Shift+D / Ctrl+Shift+D)"
echo "  2. Select 'Next.js: debug Turbopack (Chrome - Fast)'"
echo "  3. Press F5"
echo ""
echo "💡 For full-stack debugging:"
echo "  1. Select 'Next.js: debug full stack (Turbopack)'"
echo "  2. Press F5"
echo ""

# Start with Turbopack for faster builds and better source maps
NODE_OPTIONS='--inspect=9229' \
SKIP_ENV_VALIDATION=true \
NEXT_TELEMETRY_DISABLED=1 \
npm run dev:next -- --turbo
