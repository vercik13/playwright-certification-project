import { expect, test } from "@playwright/test";
import accountBalancesData from "../../assets/ddt/account_balance_data.json";
import { faker } from "@faker-js/faker";
import { LoginUserApi } from "../../src/api/tegb/login_user_api.ts";
import { LoginPage } from "../../src/pages/login/login_page.ts";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";
import { CreateAccountApi } from "../../src/api/tegb/create_account_api.ts";
import { DashboardPage } from "../../src/pages/dashboard/dashboard_page.ts";

test.describe("DDT: Account balances test", () => {
  accountBalancesData.forEach((data, index) => {
    test(`${index + 1} DDT`, async ({ page, request }) => {
      const username = faker.internet.username();
      const password = faker.internet.password({ length: 10 });
      const email = faker.internet.email({
        firstName: username,
        provider: "example.cz",
      });
      let accessToken = "";
      let newDashboardView: DashboardPage;

      await test.step("Register new user", async () => {
        const loginPage = new LoginPage(page);
        await loginPage
          .open()
          .then((login) => login.clickRegisterNewUser())
          .then((registerNewUser) => registerNewUser.fillUsername(username))
          .then((registerNewUser) => registerNewUser.fillPassword(password))
          .then((registerNewUser) => registerNewUser.fillEmail(email))
          .then((registerNewUser) => registerNewUser.clickRegister())
          .then((login) =>
            login.assertRegistrationSuccessMessage(
              tegbTexts.register.successMessage
            )
          );
      });

      await test.step("API: Login to get access token", async () => {
        const apiLogin = new LoginUserApi(request);
        const loginResponse = await apiLogin.login(username, password);
        expect(
          loginResponse.status(),
          "Login Response Status should be 201"
        ).toEqual(201);

        const loginResponseBody = await loginResponse.json();
        accessToken = loginResponseBody.access_token;
        expect(accessToken, "Access Token should be defined").toBeDefined();
      });

      await test.step("API: Create new bank accounts for new users", async () => {
        const apiAccount = new CreateAccountApi(request);
        const createAccountResponse = await apiAccount.createAccount(
          accessToken,
          data.balance
        );
        expect(
          createAccountResponse.status(),
          "Create Account Response Status should be 201"
        ).toEqual(201);
      });

      await test.step("Verify balance account FE", async () => {
        const loginPage = new LoginPage(page);
        newDashboardView = await loginPage
          .open()
          .then((login) => login.login(username, password));
        await expect(newDashboardView.accountTableRow).toBeVisible();
        await expect(newDashboardView.accountBalanceValue).toContainText(
          data.balance.toString()
        );
      });
    });
  });
});
