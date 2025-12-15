import { Locator, Page } from "@playwright/test";
import { LoginPage } from "../login/login_page.ts";

export class RegisterPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly emailInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.registerButton = page.locator('[data-testid="submit-button"]');
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    return this;
  }

  async clickRegister() {
    await this.registerButton.click();
    return new LoginPage(this.page);
  }

  async register(
    username: string,
    password: string,
    email: string
  ): Promise<LoginPage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.fillEmail(email);
    await this.clickRegister();
    return new LoginPage(this.page);
  }
}
