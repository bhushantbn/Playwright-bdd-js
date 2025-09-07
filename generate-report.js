const fs = require('fs');
const report = require('multiple-cucumber-html-reporter');

const jsonPath = 'cucumber-report/report.json';
const raw = fs.readFileSync(jsonPath, 'utf-8');

if (raw.trim() === '' || raw.trim() === '{}') {
  console.warn('⚠️ No valid Cucumber JSON found, skipping report generation.');
  process.exit(0);
}

report.generate({
  jsonDir: 'cucumber-report',
  reportPath: 'html-report'
});
