// Auto-detect and fix missing imports
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

console.log('🔍 Detecting missing imports...');

// Get build errors
let buildOutput = '';
try {
  buildOutput = execSync('SKIP_ENV_VALIDATION=true npm run build:next 2>&1', {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
  });
} catch (e) {
  buildOutput = e.stdout || e.stderr || '';
}

// Extract "Cannot find name" errors
const missingNames = new Set();
const fileMap = new Map();

buildOutput.split('\n').forEach((line, index, lines) => {
  // Find file path
  const fileMatch = line.match(/\.\/(src\/[^:]+):\d+:\d+/);
  if (fileMatch) {
    const file = fileMatch[1];

    // Find "Cannot find name" in next few lines
    for (let i = index; i < Math.min(index + 10, lines.length); i++) {
      const nameMatch = lines[i].match(/Cannot find name '([^']+)'/);
      if (nameMatch) {
        const name = nameMatch[1];
        missingNames.add(name);
        if (!fileMap.has(name)) {
          fileMap.set(name, []);
        }
        fileMap.get(name).push(file);
      }
    }
  }
});

console.log(`Found ${missingNames.size} missing names:`);
Array.from(missingNames).forEach((name) => {
  console.log(`  - ${name} in ${fileMap.get(name).join(', ')}`);
});

// Try to fix common cases (lucide-react icons)
const lucideIcons = Array.from(missingNames).filter(name =>
  /^[A-Z][a-zA-Z]*$/.test(name) && name.length > 2,
);

if (lucideIcons.length > 0) {
  console.log('\n🔧 Fixing missing lucide-react imports...');

  lucideIcons.forEach((icon) => {
    const files = fileMap.get(icon);
    files.forEach((filePath) => {
      try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if lucide-react is already imported
        const lucideImportMatch = content.match(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/);

        if (lucideImportMatch) {
          // Add to existing import
          const existing = lucideImportMatch[1];
          if (!existing.includes(icon)) {
            const newImport = existing.trim().endsWith(',')
              ? `${existing} ${icon}`
              : `${existing}, ${icon}`;
            content = content.replace(
              lucideImportMatch[0],
              `import { ${newImport} } from 'lucide-react'`,
            );
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`  ✅ Added ${icon} to ${filePath}`);
          }
        } else {
          // Add new import
          const importLine = `import { ${icon} } from 'lucide-react';\n`;
          const lines = content.split('\n');
          let insertIndex = 0;
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^import\s+/)) {
              insertIndex = i + 1;
            } else if (insertIndex > 0) {
              break;
            }
          }
          lines.splice(insertIndex, 0, importLine);
          fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
          console.log(`  ✅ Added import for ${icon} in ${filePath}`);
        }
      } catch (e) {
        console.log(`  ⚠️  Could not fix ${icon} in ${filePath}: ${e.message}`);
      }
    });
  });
}

console.log('\n✅ Missing import fix complete!');
