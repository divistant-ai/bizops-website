// Comprehensive Source Code Analysis
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║     🔍 COMPREHENSIVE SOURCE CODE ANALYSIS 🔍          ║');
console.log('╚════════════════════════════════════════════════════════╝');
console.log('');

// Step 1: Collect all errors
console.log('Step 1: Collecting all errors...');
let tsErrors = '';
try {
  tsErrors = execSync('npm run check:types 2>&1', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (e) {
  tsErrors = e.stdout || e.stderr || '';
}

fs.writeFileSync('/tmp/comprehensive-ts-errors.txt', tsErrors);

// Step 2: Parse and categorize
const errors = {
  unusedImports: [],
  typeErrors: [],
  moduleNotFound: [],
  other: [],
  byFile: {},
};

tsErrors.split('\n').forEach((line) => {
  if (line.includes('error TS')) {
    const fileMatch = line.match(/\[96m(src\/[^[]+)\[0m/);
    const file = fileMatch ? fileMatch[1] : 'unknown';

    if (!errors.byFile[file]) {
      errors.byFile[file] = [];
    }
    errors.byFile[file].push(line);

    if (line.includes('is declared but its value is never read')) {
      const nameMatch = line.match(/'([^']+)'/);
      if (nameMatch) {
        errors.unusedImports.push({
          file,
          name: nameMatch[1],
          line,
        });
      }
    } else if (line.includes('Type error:')) {
      errors.typeErrors.push({ file, line });
    } else if (line.includes('Cannot find module')) {
      errors.moduleNotFound.push({ file, line });
    } else {
      errors.other.push({ file, line });
    }
  }
});

// Step 3: Analyze patterns
console.log('Step 2: Analyzing error patterns...');
console.log('');

console.log(`Total Errors: ${errors.unusedImports.length + errors.typeErrors.length + errors.moduleNotFound.length + errors.other.length}`);
console.log(`  - Unused Imports: ${errors.unusedImports.length}`);
console.log(`  - Type Errors: ${errors.typeErrors.length}`);
console.log(`  - Module Not Found: ${errors.moduleNotFound.length}`);
console.log(`  - Other: ${errors.other.length}`);
console.log('');

// Most common unused imports
const unusedCounts = {};
errors.unusedImports.forEach((e) => {
  unusedCounts[e.name] = (unusedCounts[e.name] || 0) + 1;
});

console.log('Top 10 Unused Imports:');
Object.entries(unusedCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10)
  .forEach(([name, count]) => {
    console.log(`  ${name}: ${count} occurrences`);
  });
console.log('');

// Files with most errors
console.log('Files with Most Errors:');
Object.entries(errors.byFile)
  .sort((a, b) => b[1].length - a[1].length)
  .slice(0, 10)
  .forEach(([file, fileErrors]) => {
    console.log(`  ${file}: ${fileErrors.length} errors`);
  });
console.log('');

// Step 4: Generate fix strategy
console.log('Step 3: Generating fix strategy...');
console.log('');

const fixStrategy = {
  unusedImports: {
    files: [...new Set(errors.unusedImports.map(e => e.file))],
    total: errors.unusedImports.length,
    action: 'Remove unused imports',
  },
  typeErrors: {
    files: [...new Set(errors.typeErrors.map(e => e.file))],
    total: errors.typeErrors.length,
    action: 'Fix type definitions',
  },
  moduleNotFound: {
    files: [...new Set(errors.moduleNotFound.map(e => e.file))],
    total: errors.moduleNotFound.length,
    action: 'Fix import paths',
  },
};

console.log('Fix Strategy:');
Object.entries(fixStrategy).forEach(([category, data]) => {
  if (data.total > 0) {
    console.log(`  ${category}:`);
    console.log(`    - Files affected: ${data.files.length}`);
    console.log(`    - Total errors: ${data.total}`);
    console.log(`    - Action: ${data.action}`);
    console.log('');
  }
});

// Step 5: Generate fix script
console.log('Step 4: Generating comprehensive fix script...');

const fixScript = `#!/bin/bash
# Comprehensive fix based on analysis
cd "$(dirname "$0")"

echo "Fixing unused imports..."

# Remove unused imports from all files
${errors.unusedImports.map((e) => {
  const name = e.name;
  return `# Fix ${name} in ${e.file}
sed -i '' 's/, ${name}//g; s/${name}, //g; s/^import { ${name} }/\\/\\/ removed: ${name}/g' ${e.file} 2>/dev/null || sed -i 's/, ${name}//g; s/${name}, //g; s/^import { ${name} }/\\/\\/ removed: ${name}/g' ${e.file}`;
}).slice(0, 50).join('\n')}

echo "✅ Fixes applied"
`;

fs.writeFileSync('comprehensive-fix.sh', fixScript);
fs.chmodSync('comprehensive-fix.sh', '755');

console.log('✅ Analysis complete!');
console.log('');
console.log('📝 Generated:');
console.log('  - /tmp/comprehensive-ts-errors.txt (all errors)');
console.log('  - comprehensive-fix.sh (fix script)');
console.log('');
console.log('🚀 Next: Review analysis and run comprehensive-fix.sh');
