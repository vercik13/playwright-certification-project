import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../login/login_page.ts";
import { ProfileDetailsPage } from "./profile_details_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly editProfileButton: Locator;
  readonly logoutButton: Locator;
  readonly addAccountButton: Locator;
  readonly appNameHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    this.addAccountButton = page.locator('[data-testid="add-account-button"]');
    this.appNameHeader = page.locator('[data-testid="app-title"]');
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
    await expect(this.logoutButton, "Logout Button is visible").toBeVisible();
    await expect(
      this.appNameHeader,
      "Application Header have Name"
    ).toContainText(appName);
    return this;
  }
}
