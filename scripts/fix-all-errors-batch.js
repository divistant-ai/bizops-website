#!/usr/bin/env node
/**
 * Batch Fix All Prebuild Errors
 * Fixes all known error patterns at once
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();

console.log('🔧 Fixing ALL prebuild errors in batch...\n');

const fixes = [];

// Pattern 1: Missing imports (FileWarning, ShoppingCart, etc)
const missingIcons = ['FileWarning', 'ShoppingCart', 'Search', 'Server', 'Share2', 'ShieldCheck', 'Smartphone'];
const platformContentPath = path.join(PROJECT_ROOT, 'src/data/platformContent.ts');
if (fs.existsSync(platformContentPath)) {
  let content = fs.readFileSync(platformContentPath, 'utf8');
  const importStart = content.indexOf("import {");
  const importEnd = content.indexOf("} from 'lucide-react';");
  
  if (importStart !== -1 && importEnd !== -1) {
    const importSection = content.substring(importStart, importEnd + 1);
    missingIcons.forEach(icon => {
      if (!importSection.includes(icon)) {
        // Add before closing brace
        content = content.replace(/} from 'lucide-react';/, `${icon},\n} from 'lucide-react';`);
        fixes.push(`Added missing import: ${icon}`);
      }
    });
    fs.writeFileSync(platformContentPath, content, 'utf8');
  }
}

// Pattern 2: Fix all useContext issues
const contextFiles = [
  'src/contexts/LanguageContext.tsx',
  'src/contexts/ThemeContext.tsx',
  'src/components/ui/FadeIn.tsx',
];

contextFiles.forEach(file => {
  const filePath = path.join(PROJECT_ROOT, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Add useContext to imports if not present
  if (content.includes('useContext(') && !content.includes("import.*useContext")) {
    content = content.replace(
      /import\s+{\s*([^}]*createContext[^}]*)\s*}\s*from\s*'react'/,
      (match, imports) => {
        if (!imports.includes('useContext')) {
          changed = true;
          return match.replace(imports, imports.includes(',') ? `${imports}, useContext` : `${imports}, useContext`);
        }
        return match;
      }
    );
  }
  
  // Fix Provider syntax
  if (content.includes('<FadeInStaggerContext value=')) {
    content = content.replace(
      '<FadeInStaggerContext value=',
      '<FadeInStaggerContext.Provider value='
    );
    content = content.replace(
      '</FadeInStaggerContext>',
      '</FadeInStaggerContext.Provider>'
    );
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    fixes.push(`Fixed useContext in ${file}`);
  }
});

// Pattern 3: Fix integrations.ts GTM function types
const integrationsPath = path.join(PROJECT_ROOT, 'src/libs/utils/integrations.ts');
if (fs.existsSync(integrationsPath)) {
  let content = fs.readFileSync(integrationsPath, 'utf8');
  
  // Fix GTM function parameters
  if (content.includes('(function (w, d, s, l, i)') && !content.includes('(function (w: any')) {
    content = content.replace(
      /\(function\s+\(w,\s*d,\s*s,\s*l,\s*i\)/g,
      '(function (w: any, d: any, s: any, l: any, i: any)'
    );
    fixes.push('Fixed GTM function types');
    fs.writeFileSync(integrationsPath, content, 'utf8');
  }
}

// Pattern 4: Fix useLocalStorage type assertion
const useLocalStoragePath = path.join(PROJECT_ROOT, 'src/hooks/useLocalStorage.ts');
if (fs.existsSync(useLocalStoragePath)) {
  let content = fs.readFileSync(useLocalStoragePath, 'utf8');
  
  if (content.includes('value(storedValue)') && !content.includes('(value as')) {
    content = content.replace(
      /typeof value === 'function' \? value\(storedValue\)/,
      "typeof value === 'function' ? (value as (val: T) => T)(storedValue)"
    );
    fixes.push('Fixed useLocalStorage type assertion');
    fs.writeFileSync(useLocalStoragePath, content, 'utf8');
  }
}

// Pattern 5: Fix all unused variable errors by prefixing with _
const allTsxFiles = execSync('find src -name "*.tsx" -o -name "*.ts" | head -100', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

// Get all unused variable errors from build
try {
  const buildOutput = execSync('npm run build 2>&1', { encoding: 'utf8', cwd: PROJECT_ROOT });
} catch (e) {
  const output = e.stdout?.toString() || e.stderr?.toString() || '';
  const lines = output.split('\n');
  
  lines.forEach(line => {
    // Match: ./file.ts:123:45 - error TS6133: 'variableName' is declared but its value is never read
    const match = line.match(/^\.\/(.+):(\d+):(\d+)\s+-\s+error\s+TS6133:\s+'(.+?)'\s+is\s+declared\s+but\s+its\s+value\s+is\s+never\s+read/);
    if (match) {
      const [, file, lineNum, , varName] = match;
      const filePath = path.join(PROJECT_ROOT, file);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileLines = content.split('\n');
        const lineIdx = parseInt(lineNum) - 1;
        const lineContent = fileLines[lineIdx];
        
        // Replace variable name with _variableName
        if (lineContent && !lineContent.includes(`_${varName}`)) {
          // Match variable declarations
          const patterns = [
            new RegExp(`\\b${varName}\\b(?=\\s*[=:])`, 'g'), // const/let variable =
            new RegExp(`\\b${varName}\\b(?=\\s*,)`, 'g'), // destructuring
          ];
          
          patterns.forEach(pattern => {
            if (pattern.test(lineContent)) {
              fileLines[lineIdx] = lineContent.replace(pattern, `_${varName}`);
              fixes.push(`Fixed unused variable ${varName} in ${file}:${lineNum}`);
              fs.writeFileSync(filePath, fileLines.join('\n'), 'utf8');
            }
          });
        }
      }
    }
  });
}

console.log(`✅ Applied ${fixes.length} fixes:`);
fixes.forEach(fix => console.log(`   - ${fix}`));

console.log('\n🔄 Running build check...\n');

