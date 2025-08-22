const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { AboutusPage } = require("../../pages/AboutusPage");

let aboutus;
Given("user on to the home page", async function () {
  await pageFixture.page.goto("https://qaautomationlabs.com/");
  aboutus = new AboutusPage(pageFixture.page);
});
When(
  "user opens the navigation menu and navigates to Aboutus page",
  async function () {
    await aboutus.openNavigationMenu();
  }
);
When("click on navigation menu link 2nd time", async function () {
  await aboutus.clickOnAboutUsLink();
});
Then("about use page title should be displayed", async function () {
  await aboutus.navigateToAboutUsPage();
});
Then(
  "about use page heading should be displayed as 'Kailash Pathak'",
  async function () {
    await aboutus.verifyAboutUsHeading();
  }
);
Then(
  "about use page heading underline should be displayed in  'Kailash Pathak'",
  async function () {
    await aboutus.verifyAboutUsHeadingUnderline();
  }
);
Then(
  "about use page Title underline should be displayed in 'QAAutomationLabs'",
  async function () {
    await aboutus.verifyAboutUsPageTitleUnderline();
  }
);
Then(
  "about us link should be display with {string} menuitem",
  async function (expectedText) {
    await aboutus.verifyMenu(expectedText);
  }
);
Then(
  "there are {string} link should be displayed.",
  async function (expectedCount) {
    const actualCount = await aboutus.aboutusLinks();
    expect(actualCount).toBe(Number(expectedCount)); // convert string → number
  }
);
