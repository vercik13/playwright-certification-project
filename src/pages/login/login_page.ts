import { expect, Locator, Page } from "@playwright/test";
import { DashboardPage } from "../dashboard/dashboard_page.ts";
import { RegisterPage } from "../register/register_page.ts";

export class LoginPage {
  readonly page: Page;
  readonly url = "https://tegb-frontend-88542200c6db.herokuapp.com/";
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="submit-button"]');
    this.registerButton = page.locator('[data-testid="register-button"]');
    this.successMessage = page.locator('[data-testid="success-message"]');
  }

  async open() {
    await this.page.goto(this.url);
    return this;
  }

  async clickRegisterNewUser() {
    await this.registerButton.click();
    return new RegisterPage(this.page);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
    return this;
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    return this;
  }

  async clickLogin() {
    await this.loginButton.click();
    return new DashboardPage(this.page);
  }

  async login(username: string, password: string): Promise<DashboardPage> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
    return new DashboardPage(this.page);
  }

  async assertRegistrationSuccessMessage(expectedMessage: string) {
    await expect(this.successMessage, "Registration success").toContainText(
      expectedMessage
    );
    return this;
  }
}
