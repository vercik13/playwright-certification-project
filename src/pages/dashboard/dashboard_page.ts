import { expect, Locator, Page } from "@playwright/test";
import { LoginPage } from "../login/login_page.ts";
import { ProfileDetailsPage } from "./profile_details_page.ts";

export class DashboardPage {
  readonly page: Page;
  readonly logoImg: Locator;
  readonly appNameHeader: Locator;
  readonly logoutButton: Locator;
  readonly sidebarMenu: Locator;
  readonly homeMenuItem: Locator;
  readonly accountsMenuItem: Locator;
  readonly transactionMenuItem: Locator;
  readonly supportMenuItem: Locator;
  readonly profileDetailsTab: Locator;
  readonly profileDetailsTitle: Locator;
  readonly editProfileButton: Locator;
  readonly firstNameLabel: Locator;
  readonly firstNameValue: Locator;
  readonly lastNameLabel: Locator;
  readonly lastNameValue: Locator;
  readonly emailLabel: Locator;
  readonly emailValue: Locator;
  readonly phoneLabel: Locator;
  readonly phoneValue: Locator;
  readonly ageLabel: Locator;
  readonly ageValue: Locator;
  readonly accountTab: Locator;
  readonly accountTitle: Locator;
  readonly accountNumberTitle: Locator;
  readonly accountBalanceTitle: Locator;
  readonly accountTypeTitle: Locator;
  readonly addAccountButton: Locator;
  readonly accountTableRow: Locator;
  readonly accountBalanceValue: Locator;
  readonly footerText: Locator;
  readonly profileDetailsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoImg = page.locator('[data-testid="logo-img"]');
    this.appNameHeader = page.locator('[data-testid="app-title"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    this.sidebarMenu = page.locator(".dashboard-sidebar");
    this.homeMenuItem = page.locator(".dashboard-sidebar li").nth(0);
    this.accountsMenuItem = page.locator(".dashboard-sidebar li").nth(1);
    this.transactionMenuItem = page.locator(".dashboard-sidebar li").nth(2);
    this.supportMenuItem = page.locator(".dashboard-sidebar li").nth(3);
    this.profileDetailsTab = page.locator('[data-testid="account-summary"]');
    this.profileDetailsTitle = page.locator(
      '[data-testid="profile-details-title"]'
    );
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
    this.firstNameLabel = page.locator('[data-testid="name"] strong');
    this.lastNameLabel = page.locator('[data-testid="surname"] strong');
    this.emailLabel = page.locator('[data-testid="email"] strong');
    this.phoneLabel = page.locator('[data-testid="phone"] strong');
    this.ageLabel = page.locator('[data-testid="age"] strong');
    this.firstNameValue = page.locator('[data-testid="name"]');
    this.lastNameValue = page.locator('[data-testid="surname"]');
    this.emailValue = page.locator('[data-testid="email"]');
    this.phoneValue = page.locator('[data-testid="phone"]');
    this.ageValue = page.locator('[data-testid="age"]');
    this.accountTab = page.locator(".accounts");
    this.accountTitle = page.locator('[data-testid="accounts-title"]');
    this.accountNumberTitle = page.locator(
      '[data-testid="account-number-heading"]'
    );
    this.accountBalanceTitle = page.locator(
      '[data-testid="account-balance-heading"]'
    );
    this.accountTypeTitle = page.locator(
      '[data-testid="account-type-heading"]'
    );

    //
    this.addAccountButton = page.locator('[data-testid="add-account-button"]');
    this.accountBalanceValue = page.locator('[data-testid="account-balance"]');
    this.accountTableRow = page.locator('[data-testid="account-row-0"]');
    this.footerText = page.locator(".dashboard-footer");
    this.profileDetailsSection = page.locator(
      '[data-testid="account-summary"]'
    );
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

  async assertProfileDetailsValues(expected: {
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

  async assertProfileDetailsLabels(expected: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
  }) {
    await expect(
      this.firstNameLabel,
      `Firstname should contain ${expected.firstName}`
    ).toHaveText(expected.firstName);
    await expect(
      this.lastNameLabel,
      `Lastname should contain ${expected.lastName}`
    ).toHaveText(expected.lastName);
    await expect(
      this.emailLabel,
      `Email should contain ${expected.email}`
    ).toHaveText(expected.email);
    await expect(
      this.phoneLabel,
      `Phone should contain ${expected.phone}`
    ).toHaveText(expected.phone);
    await expect(
      this.ageLabel,
      `Age should contain ${expected.age}`
    ).toHaveText(expected.age.toString());
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

  async profileDetailsVisualCheck() {
    await expect(this.profileDetailsSection).toHaveScreenshot(
      "profile_details_check.png"
    );
    return this;
  }
}
