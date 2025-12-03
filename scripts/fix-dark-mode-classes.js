#!/usr/bin/env node

/**
 * Script to remove all dark mode classes from TSX files
 * This ensures consistent design system without dark mode
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const SRC_DIR = path.join(__dirname, '../src');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      findTsxFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function removeDarkModeClasses(content) {
  let modified = content;

  // Remove dark: classes from className strings
  // Pattern: className="... dark:class-name ..." -> remove dark:class-name
  modified = modified.replace(/className="([^"]*)"/g, (match, classes) => {
    // Remove all dark: prefixed classes
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

  // Remove dark: from other string contexts (like color definitions in data)
  modified = modified.replace(/color:\s*"([^"]*)"/g, (match, classes) => {
    const cleaned = classes
      .split(/\s+/)
      .filter(cls => !cls.startsWith('dark:'))
      .join(' ')
      .trim();
    return cleaned ? `color: "${cleaned}"` : 'color: ""';
  });

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

    // Only process if file contains dark: classes
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
    console.error(`Error processing ${filePath}:`, error.message);
    return { processed: false, file: filePath, error: error.message };
  }
}

// Main execution
console.log('🔍 Scanning for files with dark mode classes...\n');

const files = findTsxFiles(SRC_DIR);
const results = files.map(processFile);

const processed = results.filter(r => r.processed);
const errors = results.filter(r => r.error);

console.log(`✅ Processed: ${processed.length} files`);
console.log(`❌ Errors: ${errors.length} files\n`);

if (processed.length > 0) {
  console.log('Files modified:');
  processed.forEach(r => console.log(`  - ${r.file.replace(SRC_DIR, 'src')}`));
}

if (errors.length > 0) {
  console.log('\nErrors:');
  errors.forEach(r => console.log(`  - ${r.file}: ${r.error}`));
}

console.log('\n✨ Done!');
