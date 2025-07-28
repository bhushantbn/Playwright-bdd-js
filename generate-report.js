const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'test-results',
  reportPath: './reports',
  metadata: {
    browser: {
      name: 'chrome',
      version: '117'
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '11'
    }
  }
});
