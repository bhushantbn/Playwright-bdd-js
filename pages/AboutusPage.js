const { expect } = require("@playwright/test");

class AboutusPage {
  constructor(page) {
    this.page = page;
    this.openMenu = '//span[@class="hamburger"]';
    this.aboutUsLink = "//a[text()='About']";
  }
  async navigateToHomePage() {
    await this.page.goto("https://qaautomationlabs.com/");
  }
  async openNavigationMenu() {
    await this.page.locator(this.openMenu).click();
    await this.page.locator(this.aboutUsLink).first().click();
  }
  async navigateToAboutUsPage() {
    //await this.page.waitForURL("**/about");
    await expect(this.page).toHaveTitle(/About/);
  }
  async verifyAboutUsHeading() {
    const heading = this.page.locator("h2.technum-heading", {
      hasText: "Kailash Pathak",
    });
    await expect(heading).toBeVisible();
  }
  async verifyAboutUsHeadingUnderline() {
    // Locate the outer heading <h2>
    const heading = this.page.locator("h2.technum-heading").first();
    await expect(heading).toBeVisible();

    // Locate the inner span containing 'Kailash Pathak', scoped to the heading
    const underlineSpan = heading.locator("span >> text=Kailash Pathak");
    await expect(underlineSpan).toBeVisible();
  }
  async verifyAboutUsPageTitleUnderline() {
    // Get the heading
    const expectedText = "QAAutomationLabs";
    const heading = this.page.locator("h2.technum-heading").nth(1);
    await heading.scrollIntoViewIfNeeded();
    console.log(await heading.textContent());
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(expectedText);
  }
  async clickOnAboutUsLink() {
    await this.page.locator(this.openMenu).click();
  }
  async verifyMenu(expectedText) {
    const aboutLink = this.page.locator("li#menu-item-6574 a");

    // check the visible text
    await expect(aboutLink).toHaveText("About");

    // check the ::before pseudo-element content
    const beforeContent = await aboutLink.evaluate((el) => {
      return window
        .getComputedStyle(el, "::before")
        .getPropertyValue("content");
    });

    // Playwright returns '" /"' (quoted string), so strip quotes
    const normalized = beforeContent.replace(/['"]/g, "");
    if (normalized.trim() !== "/") {
      throw new Error(
        `Expected pseudo-element content '/', but got: ${normalized}`
      );
    }
  }
  async aboutusLinks() {
    // wait for links to be available
    await this.page.locator(".elementor-inner a").first().waitFor();

    const totalLinks = this.page.locator(".elementor-inner a");
    const count = await totalLinks.count();

    console.log(`...........Total links found: ${count}`);

    for (let i = 0; i < count; i++) {
      const text = (await totalLinks.nth(i).innerText()).trim();
      const href = await totalLinks.nth(i).getAttribute("href");

      console.log(`Link ${i + 1}: Text="${text}" | Href="${href}"`);
    }

    return count;
  }
}

module.exports = { AboutusPage };
