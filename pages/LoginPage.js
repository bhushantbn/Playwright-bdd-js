class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = "#username";
    this.passwordInput = "#password";
    this.submitButton = "#submit";
    this.successText = ".post-title"; // update selector if needed
    this.errorMessage = "#error";
    this.logoutButton = page.getByRole('link', { name: 'Log out' }) // Confirm selector in DevTools
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async getSuccessMessage() {
    return this.page.textContent(this.successText);
  }
  async getUserNameError() {
    return this.page.textContent(this.errorMessage);
  }
  async getPasswordError() {
    return this.page.textContent(this.errorMessage);
  }
  async blankScenarioMessage() {
    await this.page.waitForSelector(this.errorMessage, { state: "visible" });
    return this.page.textContent(this.errorMessage);
  }
  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { LoginPage };
