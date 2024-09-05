export interface StaffAuthCreate {
    idUser: string
    username: string
    password: string
    role: number
}
export interface StaffInfoCreate {
    idUser: string
    email: string
    name: string
    phone: string
    point: number
    action: string
    created_at: string

}