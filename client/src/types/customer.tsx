export interface CustomerDetail {
    _id: string
    idUser: string
    name: string,
    email: string,
    phone: string
    point: number,
    created_at: string
    action: string
}
export interface CustomerResponse {
    total: number
    totalPage: number
    limit: number
    page: number
    detail: CustomerDetail[]
}