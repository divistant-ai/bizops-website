// Systematic fix for all unused imports
const { execSync } = require('node:child_process');
const fs = require('node:fs');

console.log('🔧 Fixing all unused imports systematically...\n');

// Get all unused import errors
let output = '';
try {
  output = execSync('npm run check:types 2>&1', { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
} catch (e) {
  output = e.stdout || e.stderr || '';
}

// Parse errors
const unusedImports = [];
const lines = output.split('\n');

lines.forEach((line, index) => {
  if (line.includes('is declared but its value is never read')) {
    // Extract file path
    const fileMatch = line.match(/\[96m(src\/[^[]+)\[0m/);
    if (!fileMatch) {
      return;
    }

    const file = fileMatch[1];

    // Extract variable name
    const nameMatch = line.match(/'([^']+)'/);
    if (!nameMatch) {
      return;
    }

    const name = nameMatch[1];

    // Get line number
    const lineMatch = line.match(/\[93m(\d+)\[0m/);
    const lineNum = lineMatch ? Number.parseInt(lineMatch[1]) : null;

    unusedImports.push({ file, name, lineNum });
  }
});

console.log(`Found ${unusedImports.length} unused imports\n`);

// Group by file
const byFile = {};
unusedImports.forEach((item) => {
  if (!byFile[item.file]) {
    byFile[item.file] = [];
  }
  byFile[item.file].push(item.name);
});

// Remove duplicates per file
Object.keys(byFile).forEach((file) => {
  byFile[file] = [...new Set(byFile[file])];
});

console.log(`Affected files: ${Object.keys(byFile).length}\n`);

// Fix each file
let fixedCount = 0;
Object.entries(byFile).forEach(([file, names]) => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    names.forEach((name) => {
      // Remove from destructured imports: { name, other } or { other, name }
      const destructuredPattern = new RegExp(`(import\\s+\\{[^}]*),?\\s*${name}\\s*,?([^}]*\\}\\s+from)`, 'g');
      if (destructuredPattern.test(content)) {
        content = content.replace(destructuredPattern, (match, before, after) => {
          // Clean up commas
          let newBefore = before.trim();
          let newAfter = after.trim();

          // Remove trailing comma from before if exists
          newBefore = newBefore.replace(/,\s*$/, '');
          // Remove leading comma from after if exists
          newAfter = newAfter.replace(/^\s*,/, '');

          // If before is empty, we need to handle differently
          if (!newBefore.trim()) {
            return `import ${newAfter}`;
          }

          return `import { ${newBefore}${newBefore && newAfter ? ', ' : ''}${newAfter}`;
        });
        modified = true;
      }

      // Remove standalone import: import { name } from '...'
      const standalonePattern = new RegExp(`import\\s+{\\s*${name}\\s*}\\s+from[^;]+;?\\n?`, 'g');
      if (standalonePattern.test(content)) {
        content = content.replace(standalonePattern, '');
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed ${file} (${names.length} imports)`);
    }
  } catch (e) {
    console.log(`❌ Error fixing ${file}: ${e.message}`);
  }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
console.log(`✅ Removed ${unusedImports.length} unused imports`);
