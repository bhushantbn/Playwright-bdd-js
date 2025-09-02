class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = "#email";
    this.passwordInput = "#password";
    this.loginButton = "#loginBtn";
    this.errorMessage = "#errorMsg";
    this.logoutButton = "#logoutBtn";
    this.emailError="#emailerror"; // Confirm selector in DevTools
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async successLogin() {
    await this.page.waitForURL("**/shop.php");
    return this.page; // return page object so you can assert on it
  }

  async getEmailError() {
    return this.page.textContent(this.errorMessage);
  }
  async getPasswordError() {
    return this.page.textContent(this.errorMessage);
  }
  async blankScenarioMessage() {
    const errorLocator = this.page.locator(this.emailError);
    await errorLocator.waitFor({ state: "visible", timeout: 5000 });
    const text = await errorLocator.textContent();
    return text ? text.trim() : "";
  }

  async logout() {
    await this.page.waitForURL("**/shop.php");
    await this.page.locator(this.logoutButton).click();
  }
  async loginClick() {
    await this.page.click(this.loginButton);
  }
}

module.exports = { LoginPage };
