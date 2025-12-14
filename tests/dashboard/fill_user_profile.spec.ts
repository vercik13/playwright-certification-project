import { test } from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login_page.ts";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";

test("Fill User Profile", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.login("verca", "Playwright321!"))
    .then((dashboard) => dashboard.dashboardAsserts(tegbTexts.dashboard.title))
    .then((dashboard) => dashboard.clickEditProfile())
    .then((profileDetails) => profileDetails.fillFirstName("Veronika"))
    .then((profileDetails) => profileDetails.fillLastName("Vokounová"))
    .then((profileDetails) => profileDetails.fillEmail("ver@test.cz"))
    .then((profileDetails) => profileDetails.fillPhone("777111222"))
    .then((profileDetails) => profileDetails.fillAge("33"))
    .then((profileDetails) => profileDetails.clickSaveChangesButton());
});
