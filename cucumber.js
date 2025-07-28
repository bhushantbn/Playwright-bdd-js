module.exports = {
  default: {
    require: ['tests/step-definitions/*.js'],
    format: [
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    paths: ['tests/features/*.feature'],
    publishQuiet: true
  }
};
