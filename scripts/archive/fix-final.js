#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

console.log('🔧 Final fix for all unused variables...\n');

// Fix PricingCalculator - add underscore prefix to unused variables
const pricingPath = path.join(__dirname, 'src/components/PricingCalculator.tsx');
let pricing = fs.readFileSync(pricingPath, 'utf8');
pricing = pricing.replace(/const \[discountError,/g, 'const [_discountError,');
fs.writeFileSync(pricingPath, pricing);
console.log('✓ Fixed PricingCalculator.tsx - prefixed unused variable with _');

console.log('\n✅ All fixes applied! Running build...\n');
