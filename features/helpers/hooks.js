const {
  BeforeAll,
  Before,
  AfterAll,
  After,
  setDefaultTimeout,
  Status,
} = require("@cucumber/cucumber");
const { chromium, firefox, webkit } = require("playwright");
const { pageFixture } = require("./pageFixture");
const fs = require("fs");
const path = require("path");

let browser;

// Increase timeout globally for all steps and hooks (60 seconds)
setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  // 🔑 Pick browser from environment variable, default is chromium
  const browserType = process.env.BROWSER || "chromium";
  let browserInstance =
    browserType === "firefox" ? firefox :
    browserType === "webkit" ? webkit :
    chromium;

  // Headless logic
  const args = process.argv.join(" ");
  const forceHeadless = args.includes("--headless");
  const isCI = process.env.CI === "true";
  const isHeadless = forceHeadless || process.env.HEADLESS === "true" || isCI;

  browser = await browserInstance.launch({
    headless: isHeadless,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
});

Before(async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;
});

After(async function (scenario) {
  const page = pageFixture.page;
  const context = page.context();

  // Take screenshot on failure
  if (scenario.result.status === Status.FAILED) {
    const screenshotPath = path.join(
      "reports/screenshots",
      `${scenario.pickle.name}.png`
    );
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
  }

  await context.close();
});

AfterAll(async () => {
  await browser.close();
});
