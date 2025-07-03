import type { LoginRequest, User } from "~/shared/api";
import { login } from "~/shared/api/client/auth";
import { useAuthToken } from "~/shared/lib/auth";
import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
    const { token, setToken, clearToken, isAuthenticated } = useAuthToken();
    const user = ref<User | null>(null);

    const loginRequest = async (credentials: LoginRequest) => {
        try {
            const response = await login(credentials);
            setToken(response.access_token);
            user.value = response.user;
        } catch (error) {
            throw error;
        }
    };

    return {
        token,
        user,
        login: loginRequest,
        logout: clearToken,
        isAuthenticated,
    };
});
