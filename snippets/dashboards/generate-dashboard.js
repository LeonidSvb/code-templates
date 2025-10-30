#!/usr/bin/env node

/**
 * Dashboard Generator
 *
 * Generates client analysis dashboard from template + data JSON
 *
 * Usage:
 *   node generate-dashboard.js data.json output.html
 *   node generate-dashboard.js example-data.json my-client-dashboard.html
 */

const fs = require('fs');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: node generate-dashboard.js <data.json> <output.html>');
    console.error('Example: node generate-dashboard.js example-data.json client-dashboard.html');
    process.exit(1);
}

const dataFile = args[0];
const outputFile = args[1];

// Read template
const templatePath = path.join(__dirname, 'client-analysis-dashboard-template.html');
if (!fs.existsSync(templatePath)) {
    console.error('Error: Template file not found:', templatePath);
    process.exit(1);
}

// Read data
if (!fs.existsSync(dataFile)) {
    console.error('Error: Data file not found:', dataFile);
    process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

console.log('Generating dashboard...');
console.log('Template:', templatePath);
console.log('Data:', dataFile);
console.log('Output:', outputFile);

// Simple replacements (can be enhanced with more complex logic)
const replacements = {
    'BookingBrain': data.client?.name || 'Client Name',
    'Database Analysis': data.client?.projectType || 'System Analysis',
    'October 30, 2025': data.client?.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    'Leonid Shvorob': data.client?.analyst || 'Analyst Name',
};

// Apply replacements
for (const [search, replace] of Object.entries(replacements)) {
    template = template.split(search).join(replace);
}

// Write output
fs.writeFileSync(outputFile, template);

console.log('\n✓ Dashboard generated successfully!');
console.log('Open in browser:', path.resolve(outputFile));
console.log('\nNext steps:');
console.log('1. Update chart data in <script> section');
console.log('2. Modify stats grid numbers');
console.log('3. Customize findings and recommendations');
console.log('4. Adjust colors if needed');
