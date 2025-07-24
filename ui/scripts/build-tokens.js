const fs = require('fs');
const path = require('path');

// Read the tokens.json file
const tokensPath = path.join(__dirname, '../tokens.json');
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// Generate CSS custom properties
const generateCSS = (obj, prefix = '') => {
  let css = '';
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      css += generateCSS(value, `${prefix}${key}-`);
    } else {
      const cssVar = `--${prefix}${key}`;
      let cssValue = value;
      
      // Handle fontSize arrays [size, { lineHeight }]
      if (Array.isArray(value) && value.length === 2) {
        cssValue = value[0];
      }
      
      css += `  ${cssVar}: ${cssValue};\n`;
    }
  }
  
  return css;
};

// Generate the CSS file
const cssContent = `/* Becker Platform Design Tokens - Generated from tokens.json */\n\n:root {\n${generateCSS(tokens)}}`;

// Write the CSS file
const cssPath = path.join(__dirname, '../tokens.css');
fs.writeFileSync(cssPath, cssContent);

console.log('✅ Design tokens CSS generated successfully');
console.log(`📁 Output: ${cssPath}`);
console.log(`📊 Generated ${Object.keys(tokens).length} token categories`);