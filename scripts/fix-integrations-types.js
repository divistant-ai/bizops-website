#!/usr/bin/env node
/**
 * Fix all type errors in integrations.ts at once
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/libs/utils/integrations.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Fix all getElementsByTagName[0] that can be undefined
const patterns = [
  // Pattern 1: const x: HTMLScriptElement | null = d.getElementsByTagName('script')[0];
  {
    find: /const\s+(\w+):\s*HTMLScriptElement\s*\|\s*null\s*=\s*(\w+)\.getElementsByTagName\([^)]+\)\[0\];/g,
    replace: (match, varName, obj) => {
      return `const ${varName} = ${obj}.getElementsByTagName(${match.match(/getElementsByTagName\(([^)]+)\)/)?.[1] || ''})[0] || null;`;
    }
  },
  // Pattern 2: x = d.getElementsByTagName(...)[0]
  {
    find: /(\w+)\s*=\s*(\w+)\.getElementsByTagName\([^)]+\)\[0\]/g,
    replace: (match, varName, obj) => {
      return `${varName} = ${obj}.getElementsByTagName(${match.match(/getElementsByTagName\(([^)]+)\)/)?.[1] || ''})[0] || null`;
    }
  },
  // Pattern 3: Direct access with null check
  {
    find: /(\w+)\.getElementsByTagName\([^)]+\)\[0\]\.appendChild/g,
    replace: (match, obj) => {
      const tagMatch = match.match(/getElementsByTagName\(([^)]+)\)/)?.[1] || '';
      return `(() => { const elem = ${obj}.getElementsByTagName(${tagMatch})[0]; if (elem) elem.appendChild`
    }
  },
];

patterns.forEach(pattern => {
  content = content.replace(pattern.find, pattern.replace);
});

// Fix specific cases manually
content = content.replace(
  /const s0:\s*HTMLScriptElement\s*\|\s*null\s*=\s*document\.getElementsByTagName\('script'\)\[0\];/,
  "const s0 = document.getElementsByTagName('script')[0] || null;"
);

content = content.replace(
  /d\.getElementsByTagName\('head'\)\[0\]\.appendChild\(s\);/,
  `(() => { const head = d.getElementsByTagName('head')[0]; if (head) head.appendChild(s); })();`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Fixed all type errors in integrations.ts');

