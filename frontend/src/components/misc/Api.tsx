import axios, { AxiosInstance, AxiosResponse } from "axios";
import { config } from "../../Constants";

interface User {
  username: string;
  password: string;
  authdata: string;
}

interface AuthenticateUser {
  username: string;
  password: string;
}

interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

interface ApiResponse {
  id: string;
  name: string;
}

export const Api = {
  authenticate,
  register,
  numberOfUsers,
  getUsers,
  deleteUser,
};

const instance: AxiosInstance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

function authenticate(user: AuthenticateUser): Promise<AxiosResponse<ApiResponse>> {
  return instance.post("/auth/authenticate", user, {
    headers: { "Content-Type": "application/json" },
  });
}

function register(user: RegisterUser): Promise<AxiosResponse<ApiResponse>> {
  return instance.post("/auth/register", user, {
    headers: { "Content-Type": "application/json" },
  });
}

function numberOfUsers(): Promise<AxiosResponse<ApiResponse>> {
  return instance.get("/public/numberOfUsers");
}

function getUsers(
  user: User,
  username?: string
): Promise<AxiosResponse<ApiResponse>> {
  const url = username ? `/api/users/${username}` : "/api/users";
  return instance.get(url, {
    headers: { Authorization: basicAuth(user) },
  });
}

function deleteUser(
  user: User,
  username: string
): Promise<AxiosResponse<ApiResponse>> {
  return instance.delete(`/api/users/${username}`, {
    headers: { Authorization: basicAuth(user) },
  });
}

// -- Helper functions

function basicAuth(user: User): string {
  return `Basic ${user.authdata}`;
}
