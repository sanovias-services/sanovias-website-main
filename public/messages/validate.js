#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const LANGUAGES = ['en', 'de'];
const BASE_LANGUAGE = 'en';
const MESSAGES_DIR = path.join(__dirname);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function log(message, color = 'reset') {
  console.log(colorize(message, color));
}

// Load and parse JSON files
function loadTranslationFile(language) {
  const filePath = path.join(MESSAGES_DIR, `${language}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${language}.json does not exist`);
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Error loading ${language}.json: ${error.message}`);
  }
}

// Get all nested keys from an object
function getNestedKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getNestedKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

// Get value by nested key path
function getValueByPath(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

// Validation functions
function validateJsonSyntax() {
  log('\n🔍 Step 1: Validating JSON Syntax...', 'cyan');
  
  const results = {};
  let allValid = true;
  
  for (const lang of LANGUAGES) {
    try {
      loadTranslationFile(lang);
      log(`  ✅ ${lang}.json - Valid JSON syntax`, 'green');
      results[lang] = { valid: true };
    } catch (error) {
      log(`  ❌ ${lang}.json - ${error.message}`, 'red');
      results[lang] = { valid: false, error: error.message };
      allValid = false;
    }
  }
  
  return { allValid, results };
}

function validateKeyStructure(translations) {
  log('\n🔍 Step 2: Validating Key Structure Consistency...', 'cyan');
  
  const baseKeys = getNestedKeys(translations[BASE_LANGUAGE]);
  const missingKeys = {};
  const extraKeys = {};
  let allConsistent = true;
  
  log(`  📊 Base language (${BASE_LANGUAGE}) has ${baseKeys.length} keys`, 'blue');
  
  for (const lang of LANGUAGES) {
    if (lang === BASE_LANGUAGE) continue;
    
    const langKeys = getNestedKeys(translations[lang]);
    const missing = baseKeys.filter(key => !langKeys.includes(key));
    const extra = langKeys.filter(key => !baseKeys.includes(key));
    
    if (missing.length > 0) {
      missingKeys[lang] = missing;
      allConsistent = false;
      log(`  ❌ ${lang}.json - Missing ${missing.length} keys`, 'red');
    }
    
    if (extra.length > 0) {
      extraKeys[lang] = extra;
      allConsistent = false;
      log(`  ⚠️  ${lang}.json - ${extra.length} extra keys`, 'yellow');
    }
    
    if (missing.length === 0 && extra.length === 0) {
      log(`  ✅ ${lang}.json - Key structure matches base`, 'green');
    }
  }
  
  return { allConsistent, missingKeys, extraKeys, totalKeys: baseKeys.length };
}

function validateTranslationCompleteness(translations) {
  log('\n🔍 Step 3: Validating Translation Completeness...', 'cyan');
  
  const baseKeys = getNestedKeys(translations[BASE_LANGUAGE]);
  const emptyTranslations = {};
  let allComplete = true;
  
  for (const lang of LANGUAGES) {
    if (lang === BASE_LANGUAGE) continue;
    
    const empty = [];
    
    for (const key of baseKeys) {
      const value = getValueByPath(translations[lang], key);
      
      if (value === undefined || value === null || value === '') {
        empty.push(key);
      }
    }
    
    if (empty.length > 0) {
      emptyTranslations[lang] = empty;
      allComplete = false;
      log(`  ❌ ${lang}.json - ${empty.length} empty/missing translations`, 'red');
    } else {
      log(`  ✅ ${lang}.json - All translations present`, 'green');
    }
  }
  
  return { allComplete, emptyTranslations };
}

function validateContentFormat(translations) {
  log('\n🔍 Step 4: Validating Content Format...', 'cyan');
  
  const formatIssues = {};
  let allFormatted = true;
  
  const baseKeys = getNestedKeys(translations[BASE_LANGUAGE]);
  
  for (const lang of LANGUAGES) {
    const issues = [];
    
    for (const key of baseKeys) {
      const value = getValueByPath(translations[lang], key);
      
      if (typeof value === 'string') {
        // Check for unescaped quotes (basic check)
        if (value.includes('"') && !value.includes('\\"')) {
          // More sophisticated check for unescaped quotes
          const unescapedQuotes = value.match(/(?<!\\)"/g);
          if (unescapedQuotes && unescapedQuotes.length > 0) {
            issues.push(`${key}: Potentially unescaped quotes`);
          }
        }
        
        // Check for consistent pipe-separated format where expected
        if (key.includes('features') || key.includes('options') || key.includes('items')) {
          if (value.includes('|')) {
            // Validate pipe format
            const parts = value.split('|');
            if (parts.some(part => part.trim() === '')) {
              issues.push(`${key}: Empty parts in pipe-separated list`);
            }
          }
        }
      }
    }
    
    if (issues.length > 0) {
      formatIssues[lang] = issues;
      allFormatted = false;
      log(`  ⚠️  ${lang}.json - ${issues.length} format issues found`, 'yellow');
    } else {
      log(`  ✅ ${lang}.json - Content format looks good`, 'green');
    }
  }
  
  return { allFormatted, formatIssues };
}

function generateReport(validationResults) {
  log('\n📋 VALIDATION REPORT', 'magenta');
  log('==================', 'magenta');
  
  const { syntax, structure, completeness, format } = validationResults;
  
  // Overall status
  const overallPass = syntax.allValid && structure.allConsistent && completeness.allComplete && format.allFormatted;
  
  log(`\nOverall Status: ${overallPass ? '✅ PASS' : '❌ FAIL'}`, overallPass ? 'green' : 'red');
  
  // Detailed results
  log(`\n📊 Summary:`, 'blue');
  log(`  - JSON Syntax: ${syntax.allValid ? '✅ Valid' : '❌ Invalid'}`, syntax.allValid ? 'green' : 'red');
  log(`  - Key Structure: ${structure.allConsistent ? '✅ Consistent' : '❌ Inconsistent'}`, structure.allConsistent ? 'green' : 'red');
  log(`  - Translation Completeness: ${completeness.allComplete ? '✅ Complete' : '❌ Incomplete'}`, completeness.allComplete ? 'green' : 'red');
  log(`  - Content Format: ${format.allFormatted ? '✅ Good' : '⚠️ Issues Found'}`, format.allFormatted ? 'green' : 'yellow');
  
  if (structure.totalKeys) {
    log(`  - Total Translation Keys: ${structure.totalKeys}`, 'blue');
  }
  
  // Detailed issues
  if (!syntax.allValid) {
    log(`\n❌ JSON Syntax Errors:`, 'red');
    for (const [lang, result] of Object.entries(syntax.results)) {
      if (!result.valid) {
        log(`  - ${lang}.json: ${result.error}`, 'red');
      }
    }
  }
  
  if (!structure.allConsistent) {
    log(`\n❌ Key Structure Issues:`, 'red');
    for (const [lang, keys] of Object.entries(structure.missingKeys)) {
      log(`  - ${lang}.json missing keys (${keys.length}):`, 'red');
      keys.slice(0, 5).forEach(key => log(`    * ${key}`, 'red'));
      if (keys.length > 5) log(`    ... and ${keys.length - 5} more`, 'red');
    }
    for (const [lang, keys] of Object.entries(structure.extraKeys)) {
      log(`  - ${lang}.json extra keys (${keys.length}):`, 'yellow');
      keys.slice(0, 5).forEach(key => log(`    * ${key}`, 'yellow'));
      if (keys.length > 5) log(`    ... and ${keys.length - 5} more`, 'yellow');
    }
  }
  
  if (!completeness.allComplete) {
    log(`\n❌ Missing Translations:`, 'red');
    for (const [lang, keys] of Object.entries(completeness.emptyTranslations)) {
      log(`  - ${lang}.json empty translations (${keys.length}):`, 'red');
      keys.slice(0, 5).forEach(key => log(`    * ${key}`, 'red'));
      if (keys.length > 5) log(`    ... and ${keys.length - 5} more`, 'red');
    }
  }
  
  if (!format.allFormatted) {
    log(`\n⚠️ Content Format Issues:`, 'yellow');
    for (const [lang, issues] of Object.entries(format.formatIssues)) {
      log(`  - ${lang}.json:`, 'yellow');
      issues.forEach(issue => log(`    * ${issue}`, 'yellow'));
    }
  }
  
  // Recommendations
  log(`\n💡 Recommendations:`, 'cyan');
  if (!overallPass) {
    log(`  - Fix all validation errors before deploying`, 'cyan');
    log(`  - Run validation again after fixes: npm run validate-translations`, 'cyan');
  } else {
    log(`  - All validations pass! Translations are ready for deployment`, 'green');
  }
  log(`  - Consider having native speakers review translations for accuracy`, 'cyan');
  log(`  - Test translations in the actual application UI`, 'cyan');
  
  return overallPass;
}

// Main validation function
async function main() {
  log('🌍 Translation Files Validation', 'magenta');
  log('================================', 'magenta');
  
  try {
    // Step 1: Validate JSON syntax
    const syntaxResult = validateJsonSyntax();
    
    if (!syntaxResult.allValid) {
      log('\n❌ JSON syntax errors found. Please fix before continuing.', 'red');
      process.exit(1);
    }
    
    // Load all translation files
    const translations = {};
    for (const lang of LANGUAGES) {
      translations[lang] = loadTranslationFile(lang);
    }
    
    // Step 2: Validate key structure
    const structureResult = validateKeyStructure(translations);
    
    // Step 3: Validate translation completeness
    const completenessResult = validateTranslationCompleteness(translations);
    
    // Step 4: Validate content format
    const formatResult = validateContentFormat(translations);
    
    // Generate report
    const overallPass = generateReport({
      syntax: syntaxResult,
      structure: structureResult,
      completeness: completenessResult,
      format: formatResult
    });
    
    // Exit with appropriate code
    process.exit(overallPass ? 0 : 1);
    
  } catch (error) {
    log(`\n💥 Validation failed with error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  validateJsonSyntax,
  validateKeyStructure,
  validateTranslationCompleteness,
  validateContentFormat,
  loadTranslationFile,
  getNestedKeys,
  getValueByPath
};