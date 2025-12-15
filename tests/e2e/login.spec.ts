import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login_page.ts";

test("Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.fillUsername("verca"))
    .then((login) => login.fillPassword("Playwright321!"))
    .then((login) => login.clickLogin())
    .then((dashboard) => dashboard.clickEditProfile());
});
