const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../helpers/pageFixture");
const { LoginPage } = require("../../pages/LoginPage");

let login;

Given("User navigates to the login page", async function () {
  await pageFixture.page.goto(
    "https://practicetestautomation.com/practice-test-login/"
  );
  login = new LoginPage(pageFixture.page); // Initialize login page here
});

When(
  "User enters username {string} and password {string}",
  async function (username, password) {
    await login.login(username, password);
  }
);

Then("User should see the secure area", async function () {
  const successMessage = await login.getSuccessMessage();
  expect(successMessage).toContain("Logged In Successfully");
});

Then("User should see the Invalid username error message", async function () {
  const errorMessage = await login.getUserNameError();
  expect(errorMessage).toContain("Your username is invalid!");
});

Then("User should see the Invalid password error message", async function () {
  const errorMessage = await login.getPasswordError();
  expect(errorMessage).toContain("Your password is invalid!");
});
Then(
  "User should see the Invalid username and password error messages",
  async function () {
    const errorMessage = await login.blankScenarioMessage();
    expect(errorMessage).toContain("Your username is invalid!");
  }
);
When("User clicks on the logout button", async function () {
  await login.logout();
});
Then("User should be redirected to the login page", async function () {
  await expect(pageFixture.page).toHaveURL(/\/practice-test-login\/$/);

});
