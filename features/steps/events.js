const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { EventPage } = require("../../pages/EventPage");

let events;

Given("user on to the home page for events", async function () {
  await pageFixture.page.goto("https://qaautomationlabs.com/");
  events = new EventPage(pageFixture.page);
});
When("User clicks on menu and click on events link", async function () {
  await events.openNavigationMenu();
  await events.clickEvents();
});
When(
  "click on navigation menu link 2nd time for events link",
  async function () {
    await events.openNavigationMenu();
  }
);
Then("User should see the events page URL", async function () {
  await events.verifyURL();
});
Then("User should see the events page title", async function () {
  await events.verifyTitle();
});
Then(
  "events link should be display with {string} menuitem",
  async function (expectedText) {
    await events.verifyMenu(expectedText);
  }
);
Then("User should see the {string} events page cards", async function (expectedCount) {
  await events.verifyCards(parseInt(expectedCount));
});
Then(
  "User should see the Events button hover in orange color",
  async function () {
    await events.verifyButtonHover();
  }
);
Then(
  "User should see the Read More Links {string} times in events page",
  async function (expectedCount) {
    await events.verifyReadMoreLinks(parseInt(expectedCount));
  }
);
Then(
  "User should see the page heading as {string} in events page",
  async function (expectedText) {
    await events.verifyHeadingText(expectedText);
  }
);
Then("User should see the page background image in events page", async function () {
  await events.verifyPageBackground();
});
Then(
  "User should see the Additional page Title as {string} in events page",
  async function (expectedText) {
    await events.verifyAdditionalPageTitle(expectedText);
  }
);
Then(
  "User should see the page heading font size as {string}",
  async function (expectedSize) {
    await events.verifyHeadingFontSize(expectedSize);
  }
);

Then(
  "User should see the page Additional heading font size as {string}",
  async function (expectedSize) {
    await events.verifyAdditionalHeadingFontSize(expectedSize);
  }
);
