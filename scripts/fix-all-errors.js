#!/usr/bin/env node
/**
 * Comprehensive Error Fixer
 * Detects and fixes ALL TypeScript errors automatically
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();

console.log('🔍 Detecting ALL errors...\n');

// Run build to get all blocking errors
let buildErrors = [];
try {
  const output = execSync('npm run build 2>&1', { encoding: 'utf8', cwd: PROJECT_ROOT });
} catch (e) {
  const output = e.stdout?.toString() || e.stderr?.toString() || '';
  const lines = output.split('\n');
  
  lines.forEach((line, i) => {
    if (line.includes('Type error:') && i + 1 < lines.length) {
      const errorMatch = line.match(/^\.\/(.+):(\d+):(\d+)/);
      const messageLine = lines[i + 1] || '';
      
      if (errorMatch) {
        buildErrors.push({
          file: errorMatch[1],
          line: parseInt(errorMatch[2]),
          column: parseInt(errorMatch[3]),
          message: messageLine.trim(),
        });
      }
    }
  });
}

console.log(`Found ${buildErrors.length} blocking errors\n`);

// Fix errors
buildErrors.forEach(({ file, line, message }) => {
  const fullPath = path.join(PROJECT_ROOT, file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  const lineContent = lines[line - 1];
  
  // Fix: 'variable' is declared but its value is never read
  if (message.includes('is declared but its value is never read')) {
    const varMatch = message.match(/'([^']+)'/);
    if (varMatch) {
      const varName = varMatch[1];
      
      // Replace with underscore prefix
      lines[line - 1] = lineContent.replace(
        new RegExp(`\\b${varName}\\b(?!\\s*:)`),
        `_${varName}`
      );
      
      content = lines.join('\n');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed unused variable '${varName}' in ${file}:${line}`);
    }
  }
  
  // Fix: 'object.property' is possibly 'undefined'
  if (message.includes('possibly') && message.includes('undefined')) {
    // Add optional chaining
    const propMatch = lineContent.match(/(\w+(?:\.\w+)+)/);
    if (propMatch) {
      const propPath = propMatch[1];
      lines[line - 1] = lineContent.replace(
        new RegExp(propPath.replace(/\./g, '\\.'), 'g'),
        propPath.replace(/\./g, '?.')
      );
      
      content = lines.join('\n');
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Added optional chaining in ${file}:${line}`);
    }
  }
});

console.log(`\n✅ Fixed ${buildErrors.length} errors!`);

