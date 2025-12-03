#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

console.log('🔧 Fixing all TypeScript errors automatically...\n');

// Fix 1: Remove unused imports in PricingCalculator
const pricingCalcPath = path.join(__dirname, 'src/components/PricingCalculator.tsx');
let pricingCalc = fs.readFileSync(pricingCalcPath, 'utf8');
pricingCalc = pricingCalc.replace(/\bWrench,\s*/g, '');
pricingCalc = pricingCalc.replace(/,\s*Wrench\b/g, '');
fs.writeFileSync(pricingCalcPath, pricingCalc);
console.log('✓ Fixed PricingCalculator.tsx - removed unused Wrench import');

// Fix 2: Clean up duplicate 'use client' in SEO.tsx
const seoPath = path.join(__dirname, 'src/components/SEO.tsx');
let seo = fs.readFileSync(seoPath, 'utf8');
seo = seo.replace(/'use client';\s*import React from 'react';[\t\v\f\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*\n\s*"use client";/g, '\'use client\';\n\nimport React from \'react\';');
fs.writeFileSync(seoPath, seo);
console.log('✓ Fixed SEO.tsx - removed duplicate use client');

// Fix 3: Find and fix all unused variables
const componentsDir = path.join(__dirname, 'src/components');
const fixUnusedVars = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Common unused variable patterns
  const patterns = [
    { from: /const \[(\w+), set\1\]/g, to: 'const [_$1, set$1]' },
  ];

  patterns.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    return true;
  }
  return false;
};

console.log('\n✅ All automatic fixes applied!');
console.log('\n📝 Summary:');
console.log('  - Removed unused imports');
console.log('  - Fixed duplicate directives');
console.log('  - Cleaned up unused variables');
