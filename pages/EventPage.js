const { expect } = require("@playwright/test");

class EventPage {
  constructor(page) {
    this.page = page;
    this.openMenu = '//span[@class="hamburger"]';
    this.eventLink = page.getByRole("link", { name: "Events" });
    this.blogItem = "div.blog-item";
    this.eventsButtonLink = page.getByRole("link", {
      name: "Event",
      exact: true,
    });
    this.readMoreLinks = page.locator('//span[text()="Read More"]');
    this.heading = page.locator("h1.page-title");
    this.pageBackground = page.locator("div.page-title-bg");
    this.additionalHeading=page.locator(".page-title-additional")
  }
  async openNavigationMenu() {
    await this.page.locator(this.openMenu).click();
  }
  async clickEvents() {
    await this.eventLink.first().click();
  }
  async verifyURL() {
    await expect(this.page).toHaveURL(/.*qaautomationlabs\.com\/events\/.*/);
  }
  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Events/);
  }
  async verifyMenu(expectedText) {
    const eventLink = this.page.locator("li#menu-item-6732 a");

    // check the visible text
    await expect(eventLink).toHaveText("Events");

    // check the ::before pseudo-element content
    const beforeContent = await eventLink.evaluate((el) => {
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
  async verifyCards(expectedCount) {
    const cards = this.page.locator(this.blogItem);
    await expect(cards).toHaveCount(expectedCount);
  }
  async verifyButtonHover() {
    // Get all Course buttons
    const buttons = this.page
      .locator("//a[@class='post-category-item']")
      .nth(0);
    await buttons.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000); // allow hover CSS to apply
    await buttons.hover();
    await expect(buttons).toHaveCSS("background-color", "rgb(233, 162, 13)");
  }
  async verifyReadMoreLinks(expectedCount) {
    await expect(this.readMoreLinks).toHaveCount(expectedCount);
  }
  async verifyHeadingText(expectedText) {
    await expect(this.heading).toHaveText(expectedText);
  }
  async verifyPageBackground() {
    await expect(this.pageBackground).toHaveCSS(
      "background-image",
      'url("https://mayag.in/qaautomationlabs/wp-content/uploads/2023/08/page-title-inner.jpg")'
    );
  }
  async verifyAdditionalPageTitle(expectedText){
    await expect(this.additionalHeading).toHaveText(expectedText);
  }
  async verifyHeadingFontSize(expectedFontSize) {
    await expect(this.heading).toHaveCSS("font-size", `${expectedFontSize}`);
  }
  async verifyAdditionalPageTitleFontSize(expectedFontSize) {
    await expect(this.additionalHeading).toHaveCSS(
      "font-size",
      `${expectedFontSize}`
    );
  }
}

module.exports = { EventPage };
