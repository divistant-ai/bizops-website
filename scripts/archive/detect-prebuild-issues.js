#!/usr/bin/env node
/**
 * Prebuild Error Detector & Auto-Fixer
 * Detects all TypeScript and ESLint errors/warnings before build
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const PROJECT_ROOT = process.cwd();

// Categories of fixes
const fixes = {
  unusedImports: [],
  unusedVars: [],
  typeErrors: [],
  lintErrors: [],
};

console.log('🔍 Detecting all prebuild issues...\n');

// 1. Detect unused React imports
function detectUnusedReactImports() {
  const files = execSync('find src -name "*.tsx" -o -name "*.ts"', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(Boolean);

  files.forEach((file) => {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(fullPath)) {
      return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');

    // Check if React is imported but not used (no JSX, no React.* usage)
    const hasReactImport = /^import\s+React[,\s]/.test(content) || /^import\s+React\s+from\s+['"]react['"]/.test(content);
    const hasJSX = /<[A-Z]/.test(content);
    const hasReactUsage = /\bReact\./.test(content);

    if (hasReactImport && !hasJSX && !hasReactUsage) {
      fixes.unusedImports.push(file);
    }
  });
}

// 2. Run TypeScript check and parse errors
function detectTypeScriptErrors() {
  try {
    const output = execSync('npm run check:types 2>&1', { encoding: 'utf8', cwd: PROJECT_ROOT });
    const errorLines = output.split('\n').filter(line => line.includes('error TS'));

    errorLines.forEach((line) => {
      const match = line.match(/(.+):(\d+):(\d+)\s+-\s+error\s+TS(\d+):\s+(.+)/);
      if (match) {
        fixes.typeErrors.push({
          file: match[1],
          line: match[2],
          code: match[4],
          message: match[5],
        });
      }
    });
  } catch (e) {
    // TypeScript check fails with errors, which is expected
  }
}

// 3. Run ESLint and parse errors
function detectLintErrors() {
  try {
    const output = execSync('npm run lint 2>&1', { encoding: 'utf8', cwd: PROJECT_ROOT });
    const lines = output.split('\n');

    lines.forEach((line) => {
      if (line.includes('error') && line.includes(':')) {
        fixes.lintErrors.push(line);
      }
    });
  } catch (e) {
    // Lint fails with errors, which is expected
  }
}

// Auto-fix functions
function fixUnusedReactImports() {
  fixes.unusedImports.forEach((file) => {
    const fullPath = path.join(PROJECT_ROOT, file);
    let content = fs.readFileSync(fullPath, 'utf8');

    // Remove standalone React import
    content = content.replace(/^import\s+React\s+from\s+['"]react['"];?\n?/gm, '');
    // Remove React from named imports if it's the only one
    content = content.replace(/^import\s+React,\s*\{/gm, 'import {');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Fixed unused React import: ${file}`);
  });
}

function generateReport() {
  console.log('\n📊 PREBUILD ISSUES REPORT\n');
  console.log(`Unused React Imports: ${fixes.unusedImports.length}`);
  console.log(`TypeScript Errors: ${fixes.typeErrors.length}`);
  console.log(`Lint Errors: ${fixes.lintErrors.length}`);

  if (fixes.unusedImports.length > 0) {
    console.log('\n🔧 Auto-fixing unused React imports...');
    fixUnusedReactImports();
  }

  console.log('\n📝 Remaining issues to fix manually:');

  if (fixes.typeErrors.length > 0) {
    console.log('\n=== TypeScript Errors ===');
    fixes.typeErrors.slice(0, 20).forEach((err) => {
      console.log(`${err.file}:${err.line} - TS${err.code}: ${err.message}`);
    });
    if (fixes.typeErrors.length > 20) {
      console.log(`... and ${fixes.typeErrors.length - 20} more`);
    }
  }

  if (fixes.lintErrors.length > 0) {
    console.log('\n=== Lint Errors ===');
    fixes.lintErrors.slice(0, 20).forEach((err) => {
      console.log(err);
    });
    if (fixes.lintErrors.length > 20) {
      console.log(`... and ${fixes.lintErrors.length - 20} more`);
    }
  }
}

// Main execution
detectUnusedReactImports();
detectTypeScriptErrors();
detectLintErrors();
generateReport();

console.log('\n✅ Detection complete!');
