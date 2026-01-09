import { expect, test } from "@playwright/test";

test("API Login test", async ({ request }) => {
  const response = await request.post(
    "https://tegb-backend-877a0b063d29.herokuapp.com/tegb/login",
    {
      data: {
        username: process.env.TEGB_USERNAME,
        password: process.env.TEGB_PASSWORD,
      },
    }
  );
  const loginResponseBody = await response.json();
  expect(response.status(), "Response Status should be 201").toEqual(201);
  expect(loginResponseBody, "Login Response has access_token").toHaveProperty(
    "access_token"
  );
});
