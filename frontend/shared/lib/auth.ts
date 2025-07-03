import { useCookie } from '#app'
import { readonly, computed } from 'vue'

export const useAuthToken = () => {
    const token = useCookie<string | null>("access_token", {
        default: () => null,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
    });

    return {
        token: readonly(token),
        setToken: (value: string | null) => { token.value = value },
        clearToken: () => { token.value = null },
        isAuthenticated: computed(() => !!token.value),
    };
};
