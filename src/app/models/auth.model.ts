export interface RegisterRequest {
    username: string | null;
    email: string | null;
    password: string | null;
}

export interface LoginUserRequest {
    email: string | null;
    password: string | null;
}