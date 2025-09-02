const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { BlogPage } = require("../../pages/BlogPage");

let blog;
Given("user on to the home page for blog", async function () {
  await pageFixture.page.goto("https://qaautomationlabs.com/");
  blog = new BlogPage(pageFixture.page);
});
When("User clicks on menu and click on blog link", async function () {
  await blog.openNavigationMenu();
});
When("click on navigation menu link 2nd time for blog link", async function () {
  await blog.clickOnblogLink();
});
Then(
  "blog link should be display with {string} menuitem",
  async function (expectedText) {
    await blog.verifyMenu(expectedText);
  }
);
Then("User should see the blog page title", async function () {
  await blog.navigateToblogPage();
});
Then("User should see the blog page URL", async function () {
  await blog.verifyBlogURL();
});
Then("User should see the blog page cards", async function () {
  await blog.verifyBlogPageCards();
});
Then(
  "User should see the Read More Links {string} times for blog page",
  async function (expectedCount) {
    await blog.verifyReadMoreLinks(parseInt(expectedCount));
  }
);

Then(
  "blog link should be display with {string} menuitem",
  async function (expectedText) {
    await blog.verifyMenu(expectedText);
  }
);
Then(
  "User should see the page heading as {string} in blog page",
  async function (expectedText) {
    await blog.verifyPageHeading(expectedText);
  }
);
Then("User should see the page background color", async function () {
  await blog.verifyblogPageBGColor();
});
Then(
  "User should see the Additional page Title as {string} in blog page",
  async function (expectedText) {
    await blog.verifyAdditionalPageTitle(expectedText);
  }
);
Then(
  "User should see the page heading font size as {string} in blog page",
  async function (expectedSize) {
    await blog.verifyHeadingFontSize(expectedSize);
  }
);
Then(
  "User should see the page Additional heading font size as {string} in blog page",
  async function (expectedSize) {
    await blog.verifyAdditionalPageTitleFontSize(expectedSize);
  }
);
Then("User should see all the links of blog page", async function () {
  await blog.blogLinks();
});
Then(
  "User should see the button hover in orange color in blog page",
  async function () {
    await blog.verifyButtonHover();
  }
);
