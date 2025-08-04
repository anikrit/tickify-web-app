import { API_BASE_URL } from "@/helpers/common.helper";
import { APIClient } from "./apiClient";

class AuthService extends APIClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getData() {
    return this.get(`/api/movies`).then((response) => response);
  }
}

export const authService = new AuthService();
