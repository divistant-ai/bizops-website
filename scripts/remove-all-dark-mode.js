#!/usr/bin/env node

/**
 * Script to remove all dark mode classes from TSX/TS files
 * Removes dark: prefixed classes to ensure consistent design system
 */

const fs = require('node:fs');
const path = require('node:path');

const SRC_DIR = path.join(__dirname, '../src');

function findFiles(dir, extensions = ['.tsx', '.ts'], fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.next')) {
      findFiles(filePath, extensions, fileList);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function removeDarkModeClasses(content) {
  let modified = content;

  // Remove dark: classes from className strings (including template literals)
  // Pattern: className="... dark:class-name ..." -> remove dark:class-name
  modified = modified.replace(/className=["'`]([^"'`]*)["'`]/g, (match, classes) => {
    const cleaned = classes
      .split(/\s+/)
      .filter(cls => !cls.startsWith('dark:'))
      .join(' ')
      .trim();
    return cleaned ? `className="${cleaned}"` : 'className=""';
  });

  // Remove dark: from template literals in className
  modified = modified.replace(/className=\{`([^`]*)`\}/g, (match, classes) => {
    const cleaned = classes
      .split(/\s+/)
      .filter(cls => !cls.startsWith('dark:'))
      .join(' ')
      .trim();
    return cleaned ? `className={\`${cleaned}\`}` : 'className={`}`';
  });

  // Remove dark: from color definitions in data objects
  modified = modified.replace(/color:\s*["']([^"']*)["']/g, (match, classes) => {
    const cleaned = classes
      .split(/\s+/)
      .filter(cls => !cls.startsWith('dark:'))
      .join(' ')
      .trim();
    return cleaned ? `color: "${cleaned}"` : 'color: ""';
  });

  // Remove dark: from other className-like patterns
  modified = modified.replace(/\s+dark:[^\s"'`]+/g, ' ');

  // Clean up multiple spaces and empty className
  modified = modified.replace(/\s{2,}/g, ' ');
  modified = modified.replace(/className="\s*"/g, 'className=""');
  modified = modified.replace(/className="\s+/g, 'className="');
  modified = modified.replace(/\s+"/g, '"');

  return modified;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    if (!content.includes('dark:')) {
      return { processed: false, file: filePath };
    }

    const modified = removeDarkModeClasses(content);

    if (modified !== content) {
      fs.writeFileSync(filePath, modified, 'utf8');
      return { processed: true, file: filePath };
    }

    return { processed: false, file: filePath };
  } catch (error) {
    return { processed: false, file: filePath, error: error.message };
  }
}

// Main
console.log('🔍 Scanning for files with dark mode classes...\n');

const files = findFiles(SRC_DIR);
console.log(`Found ${files.length} files to check\n`);

const results = files.map(processFile);

const processed = results.filter(r => r.processed);
const errors = results.filter(r => r.error);

console.log(`✅ Processed: ${processed.length} files`);
console.log(`❌ Errors: ${errors.length} files\n`);

if (processed.length > 0) {
  console.log('Files modified:');
  processed.slice(0, 20).forEach(r => console.log(`  - ${r.file.replace(SRC_DIR, 'src')}`));
  if (processed.length > 20) {
    console.log(`  ... and ${processed.length - 20} more files`);
  }
}

if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(r => console.log(`  - ${r.file}: ${r.error}`));
}

console.log('\n✨ Done!');
