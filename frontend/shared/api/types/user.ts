export type UserRole = "admin" | "customer";

export interface User {
    id: number;
    email: string;
    role: UserRole;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    role: UserRole;
}

export interface AuthResponse {
    access_token: string;
    user: User;
}
