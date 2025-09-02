const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { ContactPage } = require("../../pages/ContactPage");

let contactus;

Given("user on to the home page for contact page", async function () {
  await pageFixture.page.goto("https://qaautomationlabs.com/");
  contactus = new ContactPage(pageFixture.page);
});
When("User clicks on menu and click on Contact link", async function () {
  await contactus.openNavigationMenu();
  await contactus.clickContactLink();
});
When(
  "click on navigation menu link 2nd time for Contact link",
  async function () {
    await contactus.openNavigationMenu();
  }
);
When("User hover on Send Message button", async function () {
  await contactus.assertButtonHoverColor();
});
When("User should redirect to contact Page", async function () {
  await contactus.verifyURL();
});
When(
  "User fill the contact form and click on submit button",
  async function () {
    await contactus.fillContactForm();
  }
);
When("User click on submit button without fill form",async function(){
    await contactus.clickSubmitButton();
})
Then("Require field message should be visible",async function(){
    await contactus.verifyRequireFieldMessages();
})
Then("User should see the Contact page URL", async function () {
  await contactus.verifyURL();
});
Then("Contact Page title should be visible", async function () {
  await contactus.verifyTitle();
});
Then(
  "contacts link should be display with {string} menuitem",
  async function (expectedText) {
    await contactus.verifyMenu(expectedText);
  }
);
Then("User should see the contactus page cards", async function () {
  await contactus.verifyCards();
});
Then(
  "User should see the send message button hover in orange color",
  async function () {
    await contactus.verifyButtonHover();
  }
);
Then(
  "User should see the Read More Links {string} times",
  async function (expectedCount) {
    await contactus.verifyReadMoreLinks(parseInt(expectedCount));
  }
);
Then(
  "User should see the page heading as {string}",
  async function (expectedText) {
    await contactus.verifyHeadingText(expectedText);
  }
);
Then("User should see the page background image", async function () {
  await contactus.verifyPageBackground();
});
Then(
  "User should see the Additional page Title as {string}",
  async function (expectedText) {
    await contactus.verifyAdditionalPageTitle(expectedText);
  }
);
Then(
  "User should see the page heading font size as {string}",
  async function (expectedSize) {
    await contactus.verifyHeadingFontSize(expectedSize);
  }
);

Then(
  "User should see the page Additional heading font size as {string}",
  async function (expectedSize) {
    await contactus.verifyAdditionalPageTitleFontSize(expectedSize);
  }
);
Then("User should see the success message", async function () {
  await contactus.verifySuccessMessage();
});
Then("Underline should be display within Touch Text",async function () {
  await contactus.verifyUnderline();
})
Then("Contact page heading should be display",async function(){
  await contactus.verifyHeadingText();
})
Then("Contact page additional heading should be display",async function(){
  await contactus.verifyAdditionalPageTitle();
})
When("User fill form with invalid email",async function(){
  await contactus.fillinvalidForm();
})
Then("Invalid email validation message should be display",async function() {
  await contactus.verifyInvalidEmailMessage();
})
Then("Contact Details should be visible",async function(){
  await contactus.verifyContactDetails();
});
Then("Verify Background Image URL",async function(){
  await contactus.verifyBackgroundImageURL();
})