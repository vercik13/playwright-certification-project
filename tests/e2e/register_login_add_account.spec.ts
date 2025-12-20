import { expect, test } from "@playwright/test";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { LoginPage } from "../../src/pages/login/login_page.ts";
import { tegbTexts } from "../../assets/dictionaries/dictionary.ts";
import { LoginUserApi } from "../../src/api/tegb/login_user_api.ts";
import { CreateAccountApi } from "../../src/api/tegb/create_account_api.ts";

test("E2E: Register and login new user, create new bank account via API", async ({
  page,
  request,
}) => {
  const username = faker.internet.username();
  const password = faker.internet.password({ length: 10 });
  const email = faker.internet.email({
    firstName: username,
    provider: "example.cz",
  });
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const phone = faker.phone.number();
  const age = faker.number.int({ min: 18, max: 99 });
  let accessToken = "";
  let accountBalanceValue = "";
  const startBalance = 10000;

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

  await test.step("API: Create new bank account", async () => {
    const apiAccount = new CreateAccountApi(request);
    const createAccountResponse = await apiAccount.createAccount(
      accessToken,
      startBalance
    );
    expect(
      createAccountResponse.status(),
      "Create Account Response Status should be 201"
    ).toEqual(201);

    const createAccountResponseBody = await createAccountResponse.json();
    accountBalanceValue = `${createAccountResponseBody.balance.toFixed(2)} Kč`;
  });

  await test.step("Fill user profile details, verify profile and account details", async () => {
    const loginPage = new LoginPage(page);
    await loginPage
      .open()
      .then((login) => login.login(username, password))
      .then((dashboard) =>
        dashboard.dashboardAsserts(tegbTexts.dashboard.title)
      )
      .then((dashboard) => dashboard.clickEditProfile())
      .then((profileDetails) => profileDetails.fillFirstName(firstName))
      .then((profileDetails) => profileDetails.fillLastName(lastName))
      .then((profileDetails) => profileDetails.fillEmail(email))
      .then((profileDetails) => profileDetails.fillPhone(phone))
      .then((profileDetails) => profileDetails.fillAge(age.toString()))
      .then((profileDetails) => profileDetails.clickSaveChangesButton())
      .then((dashboard) =>
        dashboard.assertProfileDetails({
          firstName,
          lastName,
          email,
          phone,
          age,
        })
      )
      .then((dashboard) => dashboard.assertsAccount(accountBalanceValue))
      .then((dashboard) => dashboard.clickLogout());
  });
});
