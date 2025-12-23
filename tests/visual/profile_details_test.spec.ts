import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login_page.ts";

test("Profile Details Visual Test", async ({ page }) => {
  const username = process.env.TEGB_USERNAME as string;
  const password = process.env.TEGB_PASSWORD as string;
  const loginPage = new LoginPage(page);
  await loginPage.open().then((login) => login.login(username, password));

  await expect(
    page.locator('[data-testid="account-summary"]')
  ).toHaveScreenshot("profile_details_check.png");
});
