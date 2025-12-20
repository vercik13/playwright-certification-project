import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard_page.ts";

export class ProfileDetailsPage {
  readonly page: Page;
  readonly editProfileButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly ageInput: Locator;
  readonly saveChangesButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editProfileButton = page.locator(
      '[data-testid="toggle-edit-profile-button"]'
    );
    this.firstNameInput = page.locator('[data-testid="chage-name-input"]');
    this.lastNameInput = page.locator('[data-testid="chage-surname-input"]');
    this.emailInput = page.locator('[data-testid="chage-email-input"]');
    this.phoneInput = page.locator('[data-testid="chage-phone-input"]');
    this.ageInput = page.locator('[data-testid="chage-age-input"]');
    this.saveChangesButton = page.locator(
      '[data-testid="save-changes-button"]'
    );
  }

  async clickEditProfile() {
    await this.editProfileButton.click();
    return this;
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
    return this;
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
    return this;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    return this;
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
    return this;
  }

  async fillAge(age: string) {
    await this.ageInput.fill(age);
    return this;
  }

  async clickSaveChangesButton() {
    await this.saveChangesButton.click();
    return new DashboardPage(this.page);
  }
}
