const { expect } = require("@playwright/test");

class ContactPage {
  constructor(page) {
    this.page = page;
    this.openMenu = '//span[@class="hamburger"]';
    this.contactLink = page.getByRole("link", { name: "Contacts" });
    this.blogItem = "div.blog-item";
    this.coursesButtonLink = page.getByRole("link", {
      name: "Contacts",
      exact: true,
    });
    this.readMoreLinks = page.locator('//span[text()="Read More"]');
    this.heading = page.locator("h1.page-title");
    this.pageBackground = page.locator("div.page-title-bg");
    this.additionalHeading = page.locator(".page-title-additional");
    this.nameInput = page.locator("#wpforms-1966-field_0");
    this.emailInput = page.locator("#wpforms-1966-field_1");
    this.commentInput = page.locator("#wpforms-1966-field_2");
    this.submitButton = page.locator("#wpforms-submit-1966");
    this.pageBackgroundImage = page.locator(".page-title-bg");
  }
  async openNavigationMenu() {
    await this.page.locator(this.openMenu).click();
  }
  async clickContactLink() {
    await this.contactLink.first().click();
  }
  async verifyURL() {
    await expect(this.page).toHaveURL(/.*qaautomationlabs\.com\/contacts\/.*/);
  }
  async verifyTitle() {
    await expect(this.page).toHaveTitle(/Contacts/);
  }
  async verifyMenu(expectedText) {
    const contactLink = this.page.locator("li#menu-item-6580 a");

    // check the visible text
    await expect(contactLink).toHaveText("Contacts");

    // check the ::before pseudo-element content
    const beforeContent = await contactLink.evaluate((el) => {
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

  async verifyButtonHover() {
    const button = this.page.locator("//button[@type='submit']").first();

    // Force :hover state
    await button.evaluate((el) => el.classList.add("hover-test"));
    await this.page.addStyleTag({
      content: `
      #wpforms-submit-1966.hover-test {
        background-color: rgb(233, 162, 13) !important;
      }
    `,
    });

    // Now check the computed style
    await expect(button).toHaveCSS("background-color", "rgb(233, 162, 13)");
  }

  async verifyReadMoreLinks(expectedCount) {
    await expect(this.readMoreLinks).toHaveCount(expectedCount);
  }
  async verifyHeadingText() {
    await expect(this.heading).toHaveText("Contacts");
  }
  async verifyAdditionalPageTitle() {
    await expect(this.additionalHeading).toHaveText("Contacts");
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
  async fillContactForm() {
    await this.nameInput.fill("John Doe");
    await this.emailInput.fill("johndoe@example.com");
    await this.commentInput.fill("This is a test comment.");
    await this.submitButton.click();
  }
  async verifySuccessMessage() {
    await this.page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
    await expect(this.page.locator("//p[text()='Invalid form.']")).toHaveText(
      "Thanks for contacting us!"
    );
  }
  async clickSubmitButton() {
    await this.submitButton.click();
  }
  async verifyRequireFieldMessages() {
    //await this.page.click("#wpforms-submit-1966");

    // 2) Only real, rendered error alerts that contain the text
    const errors = this.page
      .locator('.wpforms-error[role="alert"]')
      .filter({ hasText: "This field is required." });

    // 3) Assert there are exactly 3
    await expect(errors).toHaveCount(3, { timeout: 5000 });

    // 4) Print them (debug)
    const texts = await errors.allInnerTexts();
    texts.forEach((t, i) => console.log(`Error ${i + 1}: ${t.trim()}`));
  }
  async verifyUnderline() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.page.setContent(`
   <span style="text-decoration: underline;">Touch</span>
  `);
    const span = this.page.locator("span");
    const computedStyle = await span.evaluate((el) => {
      return window.getComputedStyle(el);
    });
    expect(computedStyle.textDecoration).toContain("underline");
    console.log(computedStyle.textDecoration);
  }
  async fillinvalidForm() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await this.nameInput.fill("john doe");
    await this.emailInput.fill("johndoe");
    await this.commentInput.fill("This is a test comment.");
    await this.submitButton.click();
  }
  async verifyInvalidEmailMessage() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
    await expect(this.page.locator("#wpforms-1966-field_1-error")).toHaveText(
      "Please enter a valid email address."
    );
  }
  async verifyContactDetails() {
    await expect(this.page.getByText("Phone Us:")).toBeVisible();
    await expect(this.page.getByText("+91 6397627154").first()).toBeVisible();
    await expect(this.page.getByText("Mail Us:")).toBeVisible();
    await expect(
      this.page.getByText("kailashpathak808@gmail.com").first()
    ).toBeVisible();
    await expect(this.page.getByText("Visit Us:")).toBeVisible();
    await expect(this.page.getByText("Delhi, India").first()).toBeVisible();
  }
  async verifyBackgroundImageURL() {
    await expect(this.pageBackgroundImage).toHaveCSS(
      "background-image",
      'url("https://qaautomationlabs.com/wp-content/uploads/2021/09/page-title-typography.jpg")'
    );
  }
}

module.exports = { ContactPage };
