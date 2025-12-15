import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/login/login_page.ts";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";

test("E2E: Register and Login New User", async ({ page }) => {
  const username = faker.internet.username();
  const password = faker.internet.password({ length: 10 });
  const email = faker.internet.email({
    firstName: username,
    provider: "example.cz",
  });

  console.log(username);
  console.log(password);
  console.log(email);

  const loginPage = new LoginPage(page);
  await loginPage
    .open()
    .then((login) => login.clickRegisterNewUser())
    .then((registerNewUser) => registerNewUser.fillUsername(username))
    .then((registerNewUser) => registerNewUser.fillPassword(password))
    .then((registerNewUser) => registerNewUser.fillEmail(email))
    .then((registerNewUser) => registerNewUser.clickRegister())
    .then((login) =>
      login.assertRegistrationSuccessMessage(tegbTexts.register.successMessage)
    )
    .then((login) => login.login(username, password))
    .then((dashboard) => dashboard.dashboardAsserts(tegbTexts.dashboard.title));
});
