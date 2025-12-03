#!/usr/bin/env tsx
/**
 * i18n Verification Script
 * Checks for missing translation keys across all locale files
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const localesDir = join(process.cwd(), 'src/locales');
const locales = ['en', 'id'];

type TranslationKeys = {
  [key: string]: string | TranslationKeys;
};

function flattenKeys(obj: TranslationKeys, prefix = ''): string[] {
  const keys: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      keys.push(...flattenKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

function loadLocale(locale: string): TranslationKeys {
  const filePath = join(localesDir, `${locale}.json`);
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content);
}

function main() {
  console.log('🔍 Verifying i18n translations...\n');

  const localeData: Record<string, TranslationKeys> = {};
  const allKeys: Set<string> = new Set();

  // Load all locales
  for (const locale of locales) {
    const data = loadLocale(locale);
    localeData[locale] = data;
    const keys = flattenKeys(data);
    keys.forEach(key => allKeys.add(key));
  }

  // Check for missing keys
  const missing: Record<string, string[]> = {};
  let hasErrors = false;

  for (const locale of locales) {
    const data = localeData[locale];
    if (!data) {
      continue;
    }
    const keys = flattenKeys(data);
    const missingKeys: string[] = [];

    for (const key of allKeys) {
      if (!keys.includes(key)) {
        missingKeys.push(key);
        hasErrors = true;
      }
    }

    if (missingKeys.length > 0) {
      missing[locale] = missingKeys;
    }
  }

  // Report results
  if (hasErrors) {
    console.error('❌ Missing translation keys found:\n');
    for (const [locale, keys] of Object.entries(missing)) {
      console.error(`  ${locale.toUpperCase()}:`);
      keys.forEach(key => console.error(`    - ${key}`));
      console.error('');
    }
    process.exit(1);
  } else {
    console.log('✅ All translation keys are present in all locales!\n');
    console.log(`   Total keys: ${allKeys.size}`);
    console.log(`   Locales: ${locales.join(', ')}\n`);
  }
}

main();
