#!/usr/bin/env node

/**
 * Script to restore dark mode classes to common patterns
 * This helps restore dark mode support that was previously removed
 */

const fs = require('node:fs');
const path = require('node:path');

const SRC_DIR = path.join(__dirname, '../src');

// Common patterns to restore dark mode classes
// More specific patterns first to avoid conflicts
const patterns = [
  // Background colors - more specific first
  { pattern: /bg-white(?![^\s"']*dark:)/g, replacement: 'bg-white dark:bg-slate-900' },
  { pattern: /bg-slate-50(?![^\s"']*dark:)/g, replacement: 'bg-slate-50 dark:bg-slate-950' },
  { pattern: /bg-slate-100(?![^\s"']*dark:)/g, replacement: 'bg-slate-100 dark:bg-slate-800' },
  { pattern: /bg-slate-200(?![^\s"']*dark:)/g, replacement: 'bg-slate-200 dark:bg-slate-800' },

  // Text colors
  { pattern: /text-slate-900(?![^\s"']*dark:)/g, replacement: 'text-slate-900 dark:text-white' },
  { pattern: /text-slate-800(?![^\s"']*dark:)/g, replacement: 'text-slate-800 dark:text-slate-200' },
  { pattern: /text-slate-700(?![^\s"']*dark:)/g, replacement: 'text-slate-700 dark:text-slate-300' },
  { pattern: /text-slate-600(?![^\s"']*dark:)/g, replacement: 'text-slate-600 dark:text-slate-400' },
  { pattern: /text-slate-500(?![^\s"']*dark:)/g, replacement: 'text-slate-500 dark:text-slate-400' },
  { pattern: /text-slate-400(?![^\s"']*dark:)/g, replacement: 'text-slate-400 dark:text-slate-500' },
  { pattern: /text-slate-300(?![^\s"']*dark:)/g, replacement: 'text-slate-300 dark:text-slate-600' },

  // Border colors
  { pattern: /border-slate-200(?![^\s"']*dark:)/g, replacement: 'border-slate-200 dark:border-slate-800' },
  { pattern: /border-slate-300(?![^\s"']*dark:)/g, replacement: 'border-slate-300 dark:border-slate-700' },
  { pattern: /border-slate-400(?![^\s"']*dark:)/g, replacement: 'border-slate-400 dark:border-slate-600' },

  // Neutral colors (used in some components)
  { pattern: /bg-neutral-50(?![^\s"']*dark:)/g, replacement: 'bg-neutral-50 dark:bg-slate-950' },
  { pattern: /bg-neutral-100(?![^\s"']*dark:)/g, replacement: 'bg-neutral-100 dark:bg-slate-800' },
  { pattern: /text-neutral-900(?![^\s"']*dark:)/g, replacement: 'text-neutral-900 dark:text-white' },
  { pattern: /text-neutral-600(?![^\s"']*dark:)/g, replacement: 'text-neutral-600 dark:text-slate-400' },
  { pattern: /border-neutral-200(?![^\s"']*dark:)/g, replacement: 'border-neutral-200 dark:border-slate-800' },
];

function findFiles(dir, extensions = ['.tsx', '.ts'], fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next') && !filePath.includes('.git')) {
      findFiles(filePath, extensions, fileList);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function restoreDarkMode(content) {
  let modified = content;
  let changes = 0;

  patterns.forEach(({ pattern, replacement }) => {
    const matches = modified.match(pattern);
    if (matches) {
      modified = modified.replace(pattern, replacement);
      changes += matches.length;
    }
  });

  return { modified, changes };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Skip if already has dark mode classes (basic check)
    if (content.includes('dark:bg-') || content.includes('dark:text-') || content.includes('dark:border-')) {
      // Still process to add missing ones
    }

    const { modified, changes } = restoreDarkMode(content);

    if (modified !== content && changes > 0) {
      fs.writeFileSync(filePath, modified, 'utf8');
      return { processed: true, file: filePath, changes };
    }

    return { processed: false, file: filePath, changes: 0 };
  } catch (error) {
    return { processed: false, file: filePath, error: error.message };
  }
}

// Main
console.log('🔍 Scanning for files to restore dark mode classes...\n');

const files = findFiles(SRC_DIR);
console.log(`📁 Found ${files.length} files to check\n`);

const results = files.map(processFile);

const processed = results.filter(r => r.processed);
const errors = results.filter(r => r.error);
const totalChanges = processed.reduce((sum, r) => sum + (r.changes || 0), 0);

console.log(`✅ Processed: ${processed.length} files`);
console.log(`📝 Total changes: ${totalChanges} patterns`);
console.log(`❌ Errors: ${errors.length} files\n`);

if (processed.length > 0) {
  console.log('Files modified:');
  processed.slice(0, 20).forEach(r => console.log(`  - ${r.file.replace(SRC_DIR, 'src')} (${r.changes} changes)`));
  if (processed.length > 20) {
    console.log(`  ... and ${processed.length - 20} more files`);
  }
}

if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(r => console.log(`  - ${r.file}: ${r.error}`));
}

console.log('\n✨ Done!');
