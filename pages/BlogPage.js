const { expect } = require("@playwright/test");

class BlogPage {
  constructor(page) {
    this.page = page;
    this.openMenu = '//span[@class="hamburger"]';
    this.blogLink = "//a[text()='Blog']";
    this.readMoreLinks = page.locator('//span[text()="Read More"]');
    this.heading = page.locator("h1.page-title");
    this.headingAdditionalTitle = page.locator(".page-title-additional");
  }
  async navigateToHomePage() {
    await this.page.goto("https://qaautomationlabs.com/");
  }
  async verifyReadMoreLinks(expectedCount) {
    await expect(this.readMoreLinks).toHaveCount(expectedCount);
  }
  async openNavigationMenu() {
    await this.page.locator(this.openMenu).click();
    //await this.openMenu.scrollIntoViewIfNeeded();
    await this.page.locator(this.blogLink).first().click();
  }
  async navigateToblogPage() {
    await expect(this.page).toHaveTitle(/Blog/);
  }
  async verifyPageHeading(expectedText) {
    await expect(this.heading).toHaveText(expectedText);
  }
  async clickOnblogLink() {
    await this.page.locator(this.openMenu).click();
  }
  async verifyMenu(expectedText) {
    const blogLink = this.page.locator("li#menu-item-6905 a");

    // check the visible text
    await expect(blogLink).toHaveText("Blog");

    // check the ::before pseudo-element content
    const beforeContent = await blogLink.evaluate((el) => {
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
  async verifyBlogPageCards() {
    const blogCards = this.page.locator(".blog-item");
    await expect(blogCards).toHaveCount(12); // or the expected number
  }
  async verifyBlogURL() {
    await expect(this.page).toHaveURL(/blog/);
  }
  async blogLinks(count) {
    // wait for links to be available
    await this.page.locator(".content-inner a").first().waitFor();

    const totalLinks = this.page.locator(".elementor-inner a");
    count = await totalLinks.count();

    console.log(`...........Total links found: ${count}`);

    for (let i = 0; i < count; i++) {
      const text = (await totalLinks.nth(i).innerText()).trim();
      const href = await totalLinks.nth(i).getAttribute("href");

      console.log(`Link ${i + 1}: Text="${text}" | Href="${href}"`);
    }

    return count;
  }
  async verifyblogPageBGColor() {
    const blogPage = this.page.locator(".page-title-container");
    await expect(blogPage).toHaveCSS("background-color", "rgb(168, 59, 91)");
  }
  async verifyAdditionalPageTitle(expectedText) {
    await expect(this.page.locator("h1.page-title")).toHaveText(expectedText);
  }
  async verifyHeadingFontSize(expectedFontSize) {
    await expect(this.heading).toHaveCSS("font-size", `${expectedFontSize}`);
  }
  async verifyAdditionalPageTitleFontSize(expectedFontSize) {
    await expect(this.page.locator(".page-title-additional")).toHaveCSS(
      "font-size",
      `${expectedFontSize}`
    );
  }
  async verifyButtonHover() {
    // Get all blogs buttons
    const buttons = this.page
      .locator("//a[@class='post-category-item']")
      .nth(0);
    await buttons.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(3000); // allow hover CSS to apply
    await buttons.hover();
    await expect(buttons).toHaveCSS("background-color", "rgb(233, 162, 13)");
  }
}

module.exports = { BlogPage };
