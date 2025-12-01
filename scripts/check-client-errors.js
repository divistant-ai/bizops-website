#!/usr/bin/env node
/**
 * Check for common client-side errors
 * Run this to identify potential hydration/runtime issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = process.cwd();

console.log('🔍 Checking for client-side errors...\n');

const issues = [];

// Check 1: Missing 'use client' in components using hooks
const clientHooks = ['useState', 'useEffect', 'useContext', 'usePathname', 'useRouter'];
const componentFiles = execSync('find src -name "*.tsx" -type f', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

componentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const usesClientHooks = clientHooks.some(hook => content.includes(hook));
  const hasUseClient = content.includes("'use client'") || content.includes('"use client"');
  const isPage = file.includes('/app/') && file.includes('/page.tsx');
  const isLayout = file.includes('/layout.tsx');
  
  if (usesClientHooks && !hasUseClient && !isPage && !isLayout) {
    issues.push({
      file,
      type: 'missing-use-client',
      message: `Uses client hooks but missing 'use client' directive`,
    });
  }
});

// Check 2: Direct window/document access in server components
const serverComponentFiles = componentFiles.filter(file => {
  const content = fs.readFileSync(file, 'utf8');
  return !content.includes("'use client'") && !file.includes('/app/') && !file.includes('/layout.tsx');
});

serverComponentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('window.') || content.includes('document.')) {
    issues.push({
      file,
      type: 'window-access-in-server',
      message: `Direct window/document access in server component`,
    });
  }
});

// Check 3: Missing suppressHydrationWarning where needed
componentFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('localStorage') || content.includes('Date.now()') || content.includes('Math.random()')) {
    if (!content.includes('suppressHydrationWarning')) {
      issues.push({
        file,
        type: 'potential-hydration-issue',
        message: `Uses dynamic values but no suppressHydrationWarning`,
      });
    }
  }
});

console.log(`Found ${issues.length} potential client-side issues:\n`);

issues.forEach((issue, i) => {
  console.log(`${i + 1}. [${issue.type}] ${issue.file}`);
  console.log(`   ${issue.message}\n`);
});

if (issues.length === 0) {
  console.log('✅ No client-side issues found!');
}

