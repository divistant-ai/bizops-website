// Comprehensive error analysis and reporting
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║     📊 COMPREHENSIVE ERROR ANALYSIS 📊                ║');
console.log('╚════════════════════════════════════════════════════════╝');
console.log('');

// Collect errors
console.log('Collecting errors...');

let tsErrors = '';
let buildErrors = '';
let lintErrors = '';

try {
  tsErrors = execSync('npm run check:types 2>&1', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (e) {
  tsErrors = e.stdout || e.stderr || '';
}

try {
  buildErrors = execSync('SKIP_ENV_VALIDATION=true npm run build:next 2>&1', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (e) {
  buildErrors = e.stdout || e.stderr || '';
}

try {
  lintErrors = execSync('npm run lint 2>&1', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (e) {
  lintErrors = e.stdout || e.stderr || '';
}

// Save to files
fs.writeFileSync('/tmp/all-ts-errors.txt', tsErrors);
fs.writeFileSync('/tmp/all-build-errors.txt', buildErrors);
fs.writeFileSync('/tmp/all-lint-errors.txt', lintErrors);

// Analyze
const errors = {
  typescript: {
    total: (tsErrors.match(/error TS/g) || []).length,
    files: new Set(),
    types: new Map(),
    unused: new Set(),
  },
  build: {
    total: (buildErrors.match(/Type error|Cannot find|Module not found/g) || []).length,
    missingModules: new Set(),
    typeErrors: [],
  },
  lint: {
    total: (lintErrors.match(/error|warning/g) || []).length,
    files: new Set(),
  },
};

// Parse TypeScript errors
tsErrors.split('\n').forEach((line) => {
  const fileMatch = line.match(/\[96m([^[]+)\[0m/);
  if (fileMatch) {
    errors.typescript.files.add(fileMatch[1]);
  }

  const typeMatch = line.match(/error TS(\d+)/);
  if (typeMatch) {
    const count = errors.typescript.types.get(typeMatch[1]) || 0;
    errors.typescript.types.set(typeMatch[1], count + 1);
  }

  const unusedMatch = line.match(/'([^']+)' is declared but its value is never read/);
  if (unusedMatch) {
    errors.typescript.unused.add(unusedMatch[1]);
  }
});

// Parse build errors
buildErrors.split('\n').forEach((line) => {
  const moduleMatch = line.match(/Cannot find module '([^']+)'/);
  if (moduleMatch) {
    errors.build.missingModules.add(moduleMatch[1]);
  }

  if (line.includes('Type error:')) {
    errors.build.typeErrors.push(line.trim());
  }
});

// Parse lint errors
lintErrors.split('\n').forEach((line) => {
  const fileMatch = line.match(/^([^:]+):\d+:\d+/);
  if (fileMatch) {
    errors.lint.files.add(fileMatch[1]);
  }
});

// Report
console.log('📊 ERROR SUMMARY');
console.log('');
console.log(`TypeScript Errors: ${errors.typescript.total}`);
console.log(`  - Files affected: ${errors.typescript.files.size}`);
console.log(`  - Unused imports: ${errors.typescript.unused.size}`);
console.log('  - Error types:');
Array.from(errors.typescript.types.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .forEach(([type, count]) => {
    console.log(`    TS${type}: ${count}`);
  });

console.log('');
console.log(`Build Errors: ${errors.build.total}`);
console.log(`  - Missing modules: ${errors.build.missingModules.size}`);
if (errors.build.missingModules.size > 0) {
  Array.from(errors.build.missingModules).slice(0, 10).forEach((mod) => {
    console.log(`    - ${mod}`);
  });
}

console.log('');
console.log(`Lint Errors: ${errors.lint.total}`);
console.log(`  - Files affected: ${errors.lint.files.size}`);

// Generate fix script
console.log('');
console.log('🔧 Generating fix script...');

const fixScript = `#!/bin/bash
# Auto-generated fix script

cd "$(dirname "$0")"

# Fix missing modules
${Array.from(errors.build.missingModules).map((mod) => {
  if (mod.includes('@/libs/utils/')) {
    const newPath = mod.replace('@/libs/utils/', '@/utils/');
    return `find src -type f \\( -name "*.tsx" -o -name "*.ts" \\) -exec sed -i '' "s|${mod}|${newPath}|g" {} + 2>/dev/null || find src -type f \\( -name "*.tsx" -o -name "*.ts" \\) -exec sed -i "s|${mod}|${newPath}|g" {} +`;
  }
  return '';
}).filter(Boolean).join('\n')}

# Remove unused imports
${Array.from(errors.typescript.unused).slice(0, 20).map((item) => {
  return `find src -type f \\( -name "*.tsx" -o -name "*.ts" \\) -exec sed -i '' "s/, ${item}//g; s/${item}, //g" {} + 2>/dev/null || find src -type f \\( -name "*.tsx" -o -name "*.ts" \\) -exec sed -i "s/, ${item}//g; s/${item}, //g" {} +`;
}).join('\n')}

echo "✅ Fixes applied"
`;

fs.writeFileSync('auto-fix-from-analysis.sh', fixScript);
fs.chmodSync('auto-fix-from-analysis.sh', '755');

console.log('✅ Fix script generated: auto-fix-from-analysis.sh');
console.log('');
console.log('📝 Error logs saved to:');
console.log('  - /tmp/all-ts-errors.txt');
console.log('  - /tmp/all-build-errors.txt');
console.log('  - /tmp/all-lint-errors.txt');
console.log('');
console.log('🚀 Next steps:');
console.log('  1. Review error summary above');
console.log('  2. Run: ./auto-fix-from-analysis.sh');
console.log('  3. Verify: npm run check:types && npm run build:next');
