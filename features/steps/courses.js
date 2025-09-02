const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { CoursesPage } = require("../../pages/CoursesPage");

let courses;

Given("user on to the home page for courses", async function () {
  await pageFixture.page.goto("https://qaautomationlabs.com/");
  courses = new CoursesPage(pageFixture.page);
});
When("User clicks on menu and click on courses link", async function () {
  await courses.openNavigationMenu();
  await courses.clickCourses();
});
When(
  "click on navigation menu link 2nd time for courses link",
  async function () {
    await courses.openNavigationMenu();
  }
);
Then("User should see the Courses page URL", async function () {
  await courses.verifyURL();
});
Then("User should see the Courses page title", async function () {
  await courses.verifyTitle();
});
Then(
  "courses link should be display with {string} menuitem",
  async function (expectedText) {
    await courses.verifyMenu(expectedText);
  }
);
Then("User should see the Courses page cards", async function () {
  await courses.verifyCards();
});
Then(
  "User should hover on the Send Message button hover in orange color",
  async function () {
    await courses.verifyButtonHover();
  }
);
Then(
  "User should see the Read More Links {string} times",
  async function (expectedCount) {
    await courses.verifyReadMoreLinks(parseInt(expectedCount));
  }
);
Then(
  "User should see the page heading as {string}",
  async function (expectedText) {
    await courses.verifyHeadingText(expectedText);
  }
);
Then("User should see the page background image", async function () {
  await courses.verifyPageBackground();
});
Then(
  "User should see the Additional page Title as {string}",
  async function (expectedText) {
    await courses.verifyAdditionalPageTitle(expectedText);
  }
);
Then(
  "User should see the page heading font size as {string}",
  async function (expectedSize) {
    await courses.verifyHeadingFontSize(expectedSize);
  }
);

Then(
  "User should see the page Additional heading font size as {string}",
  async function (expectedSize) {
    await courses.verifyAdditionalPageTitleFontSize(expectedSize);
  }
 
);
 Then("User should see the Course button hover in orange color",async function(){
    await courses.verifyButtonHover();
  })
