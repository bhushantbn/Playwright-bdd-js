const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { LoginPage } = require("../../pages/LoginPage");

let login;

Given("User navigates to the login page", async function () {
  await pageFixture.page.goto("https://shop.qaautomationlabs.com/");
  login = new LoginPage(pageFixture.page); // Initialize login page here
});

When(
  "User enters email {string} and password {string}",
  async function (email, password) {
    await login.login(email, password);
  }
);
When(
  "User clicks on the login button without input email or password",
  async function () {
    await login.loginClick();
  }
);

Then("User should see the secure area", async function () {
  const page = await login.successLogin();
  await expect(page).toHaveURL(/\/shop(\.php)?$/);
});

Then("User should see the Invalid email error message", async function () {
  const errorMessage = await login.getEmailError();
  expect(errorMessage).toContain("Invalid email or password!");
});

Then("User should see the Invalid password error message", async function () {
  const errorMessage = await login.getPasswordError();
  expect(errorMessage).toContain("Invalid email or password!");
});
Then(
  "User should see the Invalid email and password error messages",
  async function () {
    const errorMessage = await login.blankScenarioMessage();
    expect(errorMessage).toContain("Please enter your email.");
  }
);
When("User clicks on the logout button", async function () {
  await login.logout();
});
Then("User should be redirected to the login page", async function () {
  await expect(pageFixture.page).toHaveURL(/\/index(\.php)?$/);
});
