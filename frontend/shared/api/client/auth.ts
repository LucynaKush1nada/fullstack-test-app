import { useRuntimeConfig } from "#app";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types/user";

export const login = async (requestData: LoginRequest): Promise<AuthResponse> => {
  const url = `${useRuntimeConfig().public.apiBase}/auth/login`;
  const payload = {
    email: requestData.email,
    password: requestData.password,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      throw new Error(errorData.message || 'Ошибка при входе');
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const register = async (requestData: RegisterRequest): Promise<AuthResponse> => {
  const url = `${useRuntimeConfig().public.apiBase}/auth/register`;
  const payload = {
    email: requestData.email,
    password: requestData.password,
    role: requestData.role,
  };

  try {
    const result = await $fetch<AuthResponse>(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });

    return result;
  } catch (error: any) {
    if (error.data) {
      throw new Error(error.data.message || 'Ошибка при регистрации');
    }

    throw new Error(error.message || 'Ошибка при регистрации');
  }
};
