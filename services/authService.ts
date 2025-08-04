import { API_BASE_URL } from "@/helpers/common.helper";
import { LoginPayload, MeResponse, RegisterPayload } from "@/types/auth.types";
import { APIClient } from "./apiClient";

class AuthService extends APIClient {
  constructor() {
    super(API_BASE_URL);
  }

  async register(payload: RegisterPayload) {
    return this.post<RegisterPayload>(`/api/auth/register`, payload).then(
      (response) => response,
    );
  }

  async login(payload: LoginPayload) {
    return this.post<LoginPayload>(`/api/auth/login`, payload).then(
      (response) => response,
    );
  }

  async logout() {
    return this.post(`/api/auth/logout`).then((response) => response);
  }

  async getMe() {
    return this.get<MeResponse>(`/api/auth/me`).then(
      (response) => response.data,
    );
  }
}

export const authService = new AuthService();
