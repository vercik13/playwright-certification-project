import { test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/login/login_page.ts";

test("Register New User", async ({ page }) => {
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
    .then((registerNewUser) => registerNewUser.clickRegister());
});
