export interface DataAuthCreate {
    idUser: string
    username: string
    password: string
    role: number
}
export interface DataInfoCreate {
    idUser: string
    email: string
    name: string
    phone: string
    point: number
    action: string
    created_at: string
}