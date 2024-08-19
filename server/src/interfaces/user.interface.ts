export interface UserResponse {
    name: string,
    email: string,
    phone: string,
    point: number,
    action: string,
    created_at: string
}

export interface UserCreate {
    name: string,
    email: string,
}

export interface UserUpdate {
    [key: string]: string | number
}