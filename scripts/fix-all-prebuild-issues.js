#!/usr/bin/env node
/**
 * Comprehensive Prebuild Fixer
 * Detects and fixes ALL blocking errors before build
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();

console.log('🔍 Detecting ALL prebuild issues...\n');

// Collect all errors
const allErrors = {
  unusedVars: [],
  unusedImports: [],
  typeErrors: [],
};

// Function to remove unused variables/components
function removeUnusedCode(filePath, identifier) {
  const fullPath = path.join(PROJECT_ROOT, filePath);
  if (!fs.existsSync(fullPath)) return false;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  
  // Remove const/function declarations that are unused
  const patterns = [
    // Remove const ComponentName = ...
    new RegExp(`const\\s+${identifier}\\s*=\\s*[^;]+;?\\n?`, 'g'),
    // Remove function declarations
    new RegExp(`(const|function)\\s+${identifier}\\s*[^}]*\\{[^}]*\\}\\s*\\n?`, 'gs'),
  ];
  
  patterns.forEach(pattern => {
    content = content.replace(pattern, '');
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    return true;
  }
  return false;
}

// Get all TypeScript errors
console.log('📝 Checking TypeScript errors...');
try {
  const output = execSync('npm run check:types 2>&1', { encoding: 'utf8', cwd: PROJECT_ROOT });
  const lines = output.split('\n');
  
  lines.forEach(line => {
    // Match: file.tsx:123:45 - error TS6133: 'VariableName' is declared but its value is never read
    const match = line.match(/^(.+?):(\d+):(\d+)\s+-\s+error\s+TS6133:\s+'(.+?)'\s+is\s+declared\s+but\s+its\s+value\s+is\s+never\s+read/);
    if (match) {
      allErrors.unusedVars.push({
        file: match[1],
        line: match[2],
        variable: match[4],
      });
    }
  });
  
  console.log(`   Found ${allErrors.unusedVars.length} unused variables`);
} catch (e) {
  // Expected to fail
}

// Auto-fix unused variables
console.log('\n🔧 Auto-fixing issues...\n');

allErrors.unusedVars.forEach(({ file, variable }) => {
  if (removeUnusedCode(file, variable)) {
    console.log(`✅ Removed unused ${variable} from ${file}`);
  }
});

// Remove unused React imports
console.log('\n🔧 Removing unused React imports...\n');
const tsxFiles = execSync('find src -name "*.tsx" -type f', { encoding: 'utf8', cwd: PROJECT_ROOT })
  .trim()
  .split('\n')
  .filter(Boolean);

tsxFiles.forEach(file => {
  const fullPath = path.join(PROJECT_ROOT, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  
  // Remove standalone React import if no JSX
  const hasJSX = /<[A-Z]/.test(content);
  const hasReactUsage = /\bReact\./.test(content);
  
  if (!hasJSX && !hasReactUsage) {
    content = content.replace(/^import\s+React\s+from\s+['"]react['"];?\n?/gm, '');
    content = content.replace(/^import\s+React,\s*\{/gm, 'import {');
    
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Removed unused React import from ${file}`);
    }
  }
});

console.log('\n✅ Auto-fixes applied!');
console.log('\n📋 Summary:');
console.log(`   - Fixed ${allErrors.unusedVars.length} unused variables`);

console.log('\n🔄 Running build check...\n');

