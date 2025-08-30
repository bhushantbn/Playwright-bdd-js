const { expect } = require("@playwright/test");

class BlogPage {
  constructor(page) {
    this.page = page;
    this.openMenu = '//span[@class="hamburger"]';
    this.blogLink = "//a[text()='Blog']";
    this.readMoreLinks = page.locator('//span[text()="Read More"]');
    this.heading = page.locator("h1.page-title");
    this.headingAdditionalTitle=page.locator(".page-title-additional");
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
  async verifyblogHeading() {
    const heading = this.page.locator("h2.technum-heading", {
      hasText: "Kailash Pathak",
    });
    await expect(heading).toBeVisible();
  }
  async verifyPageHeading(expectedText) {
  
    await expect(this.heading).toHaveText(expectedText);
  }

  async verifyblogHeadingUnderline() {
    // Locate the outer heading <h2>
    const heading = this.page.locator("h2.technum-heading").first();
    await expect(heading).toBeVisible();

    // Locate the inner span containing 'Kailash Pathak', scoped to the heading
    const underlineSpan = heading.locator("span >> text=Kailash Pathak");
    await expect(underlineSpan).toBeVisible();
  }
  async verifyblogPageTitleUnderline() {
    // Get the heading
    const expectedText = "QAAutomationLabs";
    const heading = this.page.locator("h2.technum-heading").nth(1);
    await heading.scrollIntoViewIfNeeded();
    console.log(await heading.textContent());
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(expectedText);
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
  async verifyBlogPageCards(){
    const blogCards  = this.page.locator(".blog-item");
    await expect(blogCards).toHaveCount(12); // or the expected number
  }
  async verifyBlogURL(){
    await expect(this.page).toHaveURL(/blog/);
  }
  async blogLinks() {
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
  async verifyblogPageBGColor(){
    const blogPage = this.page.locator(".page-title-container");
    await expect(blogPage).toHaveCSS("background-color","rgb(168, 59, 91)");
  }
  async verifyAdditionalPageTitle(expectedText){
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
}

module.exports = { BlogPage };
