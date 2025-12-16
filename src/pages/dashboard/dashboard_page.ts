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
  readonly accountTableRow: Locator;
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
    this.accountBalanceValue = page.locator('[data-testid="account-balance"]');
    this.accountTableRow = page.locator('[data-testid="account-row-0"]');
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
      "Edit Profile Button is visible"
    ).toBeVisible();
    return this;
  }

  async assertProfileDetails(expected: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
  }) {
    await expect(
      this.firstNameValue,
      `Firstname should contain ${expected.firstName}`
    ).toContainText(expected.firstName);
    await expect(
      this.lastNameValue,
      `Lastname should contain ${expected.lastName}`
    ).toContainText(expected.lastName);
    await expect(
      this.emailValue,
      `Email should contain ${expected.email}`
    ).toContainText(expected.email);
    await expect(
      this.phoneValue,
      `Phone should contain ${expected.phone}`
    ).toContainText(expected.phone);
    await expect(
      this.ageValue,
      `Age should contain ${expected.age}`
    ).toContainText(expected.age.toString());
    return this;
  }

  async assertsAccount(expectedBalance: string) {
    await expect(
      this.accountTableRow,
      "New bank account is visible"
    ).toBeVisible();
    await expect(
      this.accountBalanceValue,
      `Bank account amount should be ${expectedBalance}`
    ).toHaveText(expectedBalance);
    return this;
  }
}
