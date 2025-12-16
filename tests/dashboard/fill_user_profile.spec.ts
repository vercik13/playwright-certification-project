import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login_page.ts";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";

test("Fill User Profile", async ({ page }) => {
  const username = process.env.TEGB_USERNAME as string;
  const password = process.env.TEGB_PASSWORD as string;
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.login(username, password))
    .then((dashboard) => dashboard.dashboardAsserts(tegbTexts.dashboard.title))
    .then((dashboard) => dashboard.clickEditProfile());
});
