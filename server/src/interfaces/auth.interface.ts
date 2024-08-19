export interface AuthRequest {
    username?: string,
    password?: string,
    [key: string]: string | number
}
export interface AuthCreate extends AuthRequest {
    email: string
    name?: string
}

export interface AuthResponse {
    access: string
    refresh?: string
    expired_access: number
    expired_refresh?: number
}