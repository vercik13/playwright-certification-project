import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../login/login_page.ts";
import { ProfileDetailsPage } from "./profile_details_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;
  readonly logoutButton: Locator;
  readonly addAccountButton: Locator;
  readonly appNameHeader: Locator;
  readonly firstNameValue: Locator;
  readonly lastNameValue: Locator;
  readonly emailValue: Locator;
  readonly phoneValue: Locator;
  readonly ageValue: Locator;
  readonly accountBalanceValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    this.addAccountButton = page.locator('[data-testid="add-account-button"]');
    this.appNameHeader = page.locator('[data-testid="app-title"]');
    this.firstNameValue = page.locator('[data-testid="name"]');
    this.lastNameValue = page.locator('[data-testid="surname"]');
    this.emailValue = page.locator('[data-testid="email"]');
    this.phoneValue = page.locator('[data-testid="phone"]');
    this.ageValue = page.locator('[data-testid="age"]');
    this.accountBalanceValue = page.locator('[data-testid="acount-balance"]');
  }

  async clickEditProfile() {
    await this.editProfileButton.click();
    return new ProfileDetailsPage(this.page);
  }

  async clickAddAccount() {
    await this.addAccountButton.click();
    return this;
  }

  async clickLogout() {
    await this.logoutButton.click();
    return new LoginPage(this.page);
  }

  async dashboardAsserts(appName: string) {
    await expect
      .soft(this.logoutButton, "Logout Button is visible")
      .toBeVisible();
    await expect
      .soft(this.appNameHeader, "Application Header have Name")
      .toContainText(appName);
    await expect(
      this.editProfileButton,
      "Edit Profile button is visible"
    ).toBeVisible();
    return this;
  }
}
