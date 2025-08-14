const {
  BeforeAll,
  Before,
  AfterAll,
  After,
  setDefaultTimeout,
  Status,
} = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const { pageFixture } = require("./pageFixture");
const fs = require("fs");
const path = require("path");

let browser;

// Increase timeout globally for all steps and hooks (60 seconds)
setDefaultTimeout(60 * 1000);

BeforeAll(async () => {
  const isCI = process.env.CI === "true"; // GitHub Actions sets CI=true
  browser = await chromium.launch({
    headless: isCI, // ✅ headless in CI, headed locally
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
});

Before(async () => {
  const context = await browser.newContext({
    recordVideo: { dir: "reports/videos/" }, // store videos in reports/videos
  });
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
