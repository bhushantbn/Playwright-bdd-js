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

When("User click on submit button",async function() {
  await contactus.clickSubmitButton();
})
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
  "User should see the Additional page Title as {string} in contact page",
  async function (expectedText) {
    await contactus.verifyAdditionalPageTitle(expectedText);
  }
);
Then(
  "User should see the page heading font size as {string} in contact page",
  async function (expectedSize) {
    await contactus.verifyHeadingFontSize(expectedSize);
  }
);

Then(
  "User should see the page additional heading font size as {string} in contact page",
  async function (expectedSize) {
    await contactus.verifyAdditionalPageTitleFontSize(expectedSize);
  }
);

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
Then("success message should be visible",async function(){
  await contactus.verifySuccessMessage();
})