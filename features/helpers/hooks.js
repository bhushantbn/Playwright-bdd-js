const { BeforeAll, Before, AfterAll, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { pageFixture } = require('./pageFixture');

let browser;

// Increase timeout globally for all steps and hooks (60 seconds)
setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false }); // change to true in CI
});

Before(async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

After(async () => {
  await pageFixture.page.close();
});

AfterAll(async () => {
  await browser.close();
});
