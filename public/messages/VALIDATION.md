# Translation Files Validation Guide

## Overview
This document outlines the validation steps and automated mechanisms for ensuring the integrity of translation files in the Sanovias website project.

## File Structure
```
public/messages/
├── en.json          # English translations (source)
├── de.json          # German translations
├── VALIDATION.md    # This file
└── validate.js      # Automated validation script
```

## Validation Requirements

### 1. JSON Syntax Validation
- **Requirement**: All JSON files must be valid JSON
- **Check**: No syntax errors, proper comma placement, matching brackets
- **Command**: `node -e "JSON.parse(require('fs').readFileSync('./public/messages/[lang].json', 'utf8'))"`

### 2. Key Structure Consistency
- **Requirement**: All language files must have identical key structures
- **Check**: Same nested object structure across all languages
- **Example**: If `en.json` has `home.hero.title`, `de.json` must also have `home.hero.title`

### 3. Translation Completeness
- **Requirement**: No missing translations in any language file
- **Check**: Every key in English must have a corresponding translation in German
- **Action**: Flag missing keys for translation

### 4. Special Character Handling
- **Requirement**: Proper handling of special characters and encoding
- **Check**: UTF-8 encoding, proper escaping of quotes and special characters
- **Common Issues**: Unescaped quotes, improper Unicode characters

### 5. Content Format Consistency
- **Requirement**: Similar content structure for features lists, arrays, etc.
- **Check**: Pipe-separated values (`|`) for arrays, consistent formatting
- **Example**: `"features": "Feature 1|Feature 2|Feature 3"`

## Manual Validation Steps

### Step 1: Syntax Check
```bash
# Check English JSON
node -e "try { JSON.parse(require('fs').readFileSync('./public/messages/en.json', 'utf8')); console.log('✅ English JSON is valid'); } catch(e) { console.log('❌ English JSON error:', e.message); }"

# Check German JSON  
node -e "try { JSON.parse(require('fs').readFileSync('./public/messages/de.json', 'utf8')); console.log('✅ German JSON is valid'); } catch(e) { console.log('❌ German JSON error:', e.message); }"
```

### Step 2: Structure Comparison
```bash
# Run automated validation script
node public/messages/validate.js
```

### Step 3: Content Review
1. **Language Appropriateness**: Ensure German translations are natural and professional
2. **Brand Voice Consistency**: Maintain professional warmth and medical expertise tone
3. **Cultural Adaptation**: Consider cultural differences in medical terminology
4. **SEO Optimization**: Ensure key terms are properly translated for German SEO

## Common Issues and Solutions

### Issue 1: Extra Commas or Brackets
**Problem**: `{"key": "value",}` or `{"key": "value"}}}`
**Solution**: Remove trailing commas, match brackets properly

### Issue 2: Unescaped Quotes
**Problem**: `"description": "We're the "best" clinic"`
**Solution**: `"description": "We're the \"best\" clinic"`

### Issue 3: Missing Keys
**Problem**: Key exists in English but not in German
**Solution**: Add missing key with appropriate German translation

### Issue 4: Inconsistent Array Format
**Problem**: Different formats for feature lists
**Solution**: Use consistent pipe-separated format: `"item1|item2|item3"`

## Key Structure Reference

### Home Page (`home`)
- `hero.title`, `hero.subtitle`, `hero.cta`
- `services.title`, `services.subtitle`
- `services.items.[index].title`, `services.items.[index].description`
- `testimonials.title`
- `testimonials.items.[index].content`, `testimonials.items.[index].author`

### About Page (`about`)
- `hero.title`, `hero.description`
- `services.title`, `services.items.[index].title`
- `team.title`, `team.members.[index].name`, `team.members.[index].role`
- `commitment.title`, `commitment.values.[index].title`

### Services Page (`services`)
- `hero.title`, `hero.subtitle`
- `categories.[index].title`, `categories.[index].description`
- `doctors.[index].name`, `doctors.[index].specialty`

### How Page (`how`)
- `hero.title1`, `hero.title2`, `hero.subtitle`
- `process.steps.[index].title`, `process.steps.[index].description.main`
- `trust.title`, `trust.indicators.[index].title`
- `faq.title`, `faq.questions.[index].question`

### Contact Page (`contact`)
- `hero.title`, `hero.subtitle`
- `offices.tunisia.title`, `offices.europe.title`
- `form.title`, `form.fields.[field].label`
- `faq.title`, `faq.questions.[index].question`

## Automated Validation

The automated validation script (`validate.js`) performs:
1. **Syntax validation** for all JSON files
2. **Key structure comparison** between English and German
3. **Missing translation detection**
4. **Format consistency checks**
5. **Generation of validation report**

### Running Validation
```bash
# Full validation
npm run validate-translations

# Quick syntax check only
npm run check-json-syntax
```

## Integration with Development Workflow

### Pre-commit Validation
The validation script should be run before committing translation changes:
```bash
# Add to package.json scripts
"validate-translations": "node public/messages/validate.js",
"check-json-syntax": "node -e \"['en', 'de'].forEach(lang => { try { JSON.parse(require('fs').readFileSync('./public/messages/' + lang + '.json', 'utf8')); console.log('✅ ' + lang + '.json valid'); } catch(e) { console.log('❌ ' + lang + '.json error:', e.message); process.exit(1); } })\""
```

### CI/CD Integration
Include validation in your CI/CD pipeline to prevent invalid translations from being deployed.

## Maintenance Guidelines

### Adding New Languages
1. Copy `en.json` structure to new language file
2. Translate all values while maintaining key structure
3. Run validation to ensure consistency
4. Update validation script to include new language

### Adding New Translation Keys
1. Add key to `en.json` first
2. Add corresponding key to all other language files
3. Run validation to confirm structure consistency
4. Test in application to ensure proper rendering

### Quality Assurance
1. **Technical Review**: Automated validation passes
2. **Language Review**: Native speaker review for accuracy
3. **Context Review**: Translations work properly in UI context
4. **Brand Review**: Maintains consistent brand voice

## Troubleshooting

### Common Validation Errors
- **JSON Syntax Error**: Check for trailing commas, mismatched brackets
- **Missing Key**: Add missing translation key to appropriate language file
- **Structure Mismatch**: Ensure nested object structure matches exactly
- **Encoding Issue**: Verify UTF-8 encoding and proper character escaping

### Getting Help
1. Run automated validation first: `npm run validate-translations`
2. Check this documentation for common issues
3. Review JSON syntax and structure carefully
4. Ensure all text editors use UTF-8 encoding