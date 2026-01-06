import { apiClient } from "./axios.config";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "teacher" | "student";
  createdAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  role: "teacher" | "student";
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Login
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/login",
    payload
  );
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Register
export const register = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/api/auth/register",
    payload
  );
  if (response.data.token && typeof window !== "undefined") {
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

// Logout
export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("authToken");
};

// Get profile
export const getProfile = async (): Promise<User> => {
  const response = await apiClient.get<User>("/api/auth/profile");
  return response.data;
};

// Update profile
export const updateProfile = async (payload: Partial<User>): Promise<User> => {
  const response = await apiClient.put<User>("/api/auth/profile", payload);
  return response.data;
};
