export interface AuthRequest {
    username?: string,
    password?: string
    email?: string,
    name?: string
}

export interface AuthLoginResponse {
    access: string,
    refresh?: string,
    expired_access: number,
    expired_refresh?: number
}