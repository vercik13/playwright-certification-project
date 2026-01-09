import { APIRequestContext } from "@playwright/test";

export class CreateAccountApi {
  readonly request: APIRequestContext;
  readonly apiUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiUrl = process.env.TEGB_APIURL as string;
  }

  async createAccount(accessToken: string, startBalance: number) {
    const createAccountResponse = await this.request.post(
      `${this.apiUrl}/accounts/create`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          startBalance,
          type: "Test",
        },
      }
    );
    return createAccountResponse;
  }
}
