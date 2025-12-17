import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login_page.ts";
import { DashboardPage } from "../../src/pages/dashboard/dashboard_page.ts";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";
//import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";

test.describe("Atomic tests: Test Dashboard Page", () => {
  const username = process.env.TEGB_USERNAME as string;
  const password = process.env.TEGB_PASSWORD as string;
  let newDashboardView: DashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    newDashboardView = await loginPage
      .open()
      .then((login) => login.login(username, password));
  });

  test("Dashboard Structure", async () => {
    await test.step("Header", async () => {
      await expect.soft(newDashboardView.appNameHeader).toBeVisible();
      await expect
        .soft(newDashboardView.appNameHeader)
        .toHaveText(tegbTexts.dashboard.title);
      await expect.soft(newDashboardView.logoImg).toBeVisible();
      await expect.soft(newDashboardView.logoutButton).toBeVisible();
      await expect
        .soft(newDashboardView.logoutButton)
        .toHaveText(tegbTexts.dashboard.logoutButton);
    });
    await test.step("Sidebar Menu", async () => {
      await expect.soft(newDashboardView.sidebarMenu).toBeVisible();
      await expect.soft(newDashboardView.homeMenuItem).toBeVisible();
      await expect.soft(newDashboardView.homeMenuItem).toHaveText("Domů");
      await expect.soft(newDashboardView.accountsMenuItem).toBeVisible();
      await expect.soft(newDashboardView.accountsMenuItem).toHaveText("Účty");
      await expect.soft(newDashboardView.transactionMenuItem).toBeVisible();
      await expect
        .soft(newDashboardView.transactionMenuItem)
        .toHaveText("Transakce");
      await expect.soft(newDashboardView.supportMenuItem).toBeVisible();
      await expect
        .soft(newDashboardView.transactionMenuItem)
        .toHaveText("Transakce");
    });

    await test.step("Profile Details", async () => {
      await expect.soft(newDashboardView.profileDetailsTab).toBeVisible();
      await expect.soft(newDashboardView.profileDetailsTitle).toBeVisible();
      await expect
        .soft(newDashboardView.profileDetailsTitle)
        .toHaveText(tegbTexts.dashboard.profileDetailsTitle);
      await expect.soft(newDashboardView.firstNameValue).toBeVisible();
      await expect
        .soft(newDashboardView.firstNameValue)
        .toContainText(tegbTexts.dashboard.profileFirstNameLabel);
      await expect.soft(newDashboardView.lastNameValue).toBeVisible();
      await expect
        .soft(newDashboardView.lastNameValue)
        .toContainText(tegbTexts.dashboard.profileLastNameLabel);
      await expect.soft(newDashboardView.emailValue).toBeVisible();
      await expect
        .soft(newDashboardView.emailValue)
        .toContainText(tegbTexts.dashboard.profileEmailLabel);
      await expect.soft(newDashboardView.phoneValue).toBeVisible();
      await expect
        .soft(newDashboardView.phoneValue)
        .toContainText(tegbTexts.dashboard.profilePhoneLabel);
      await expect.soft(newDashboardView.ageValue).toBeVisible();
      await expect
        .soft(newDashboardView.ageValue)
        .toContainText(tegbTexts.dashboard.profileAgeLabel);
      await expect.soft(newDashboardView.editProfileButton).toBeVisible();
      await expect
        .soft(newDashboardView.editProfileButton)
        .toHaveText(tegbTexts.dashboard.editProfileButton);
    });

    await test.step("Account Details", async () => {
      await expect.soft(newDashboardView.accountTab).toBeVisible();
      await expect.soft(newDashboardView.accountTitle).toBeVisible();
      await expect
        .soft(newDashboardView.accountTitle)
        .toHaveText(tegbTexts.dashboard.accountTitle);
      await expect.soft(newDashboardView.accountNumberTitle).toBeVisible();
      await expect
        .soft(newDashboardView.accountNumberTitle)
        .toHaveText(tegbTexts.dashboard.accountNumberTitle);
      await expect.soft(newDashboardView.accountBalanceTitle).toBeVisible();
      await expect
        .soft(newDashboardView.accountBalanceTitle)
        .toHaveText(tegbTexts.dashboard.accountBalanceTitle);
      await expect.soft(newDashboardView.accountTypeTitle).toBeVisible();
      await expect
        .soft(newDashboardView.accountTypeTitle)
        .toHaveText(tegbTexts.dashboard.accountTypeTitle);
      await expect.soft(newDashboardView.addAccountButton).toBeVisible();
      await expect
        .soft(newDashboardView.addAccountButton)
        .toHaveText(tegbTexts.dashboard.addAccountButton);
    });

    await test.step("Footer", async () => {
      await expect.soft(newDashboardView.footerText).toBeVisible();
      await expect
        .soft(newDashboardView.footerText)
        .toHaveText(tegbTexts.dashboard.footerText);
    });
  });
});

//  .then((dashboard) => dashboard.dashboardAsserts(tegbTexts.dashboard.title))
// .then((dashboard) => dashboard.clickEditProfile());
