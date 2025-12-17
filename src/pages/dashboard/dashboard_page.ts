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
  readonly firstNameValue: Locator;
  readonly lastNameValue: Locator;
  readonly emailValue: Locator;
  readonly phoneValue: Locator;
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

  constructor(page: Page) {
    this.page = page;
    this.logoImg = page.locator('[data-testid="logo-img"]');
    this.appNameHeader = page.locator('[data-testid="app-title"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    this.sidebarMenu = page.locator(".dashboard-sidebar");
    this.homeMenuItem = page.locator('//li[contains(text(),"Domů")]');
    this.accountsMenuItem = page.locator('//li[contains(text(),"Účty")]');
    this.transactionMenuItem = page.locator(
      '//li[contains(text(),"Transakce")]'
    );
    this.supportMenuItem = page.locator('//li[contains(text(),"Podpora")]');
    this.profileDetailsTab = page.locator('[data-testid="account-summary"]');
    this.profileDetailsTitle = page.locator(
      '[data-testid="profile-details-title"]'
    );
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
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
