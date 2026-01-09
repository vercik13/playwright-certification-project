import { APIRequestContext } from "@playwright/test";

export class LoginUserApi {
  readonly request: APIRequestContext;
  readonly apiUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiUrl = process.env.TEGB_APIURL as string;
  }

  async login(username: string, password: string) {
    const loginResponse = await this.request.post(`${this.apiUrl}/login`, {
      data: {
        password,
        username,
      },
    });
    return loginResponse;
  }
}
