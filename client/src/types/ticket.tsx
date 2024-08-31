export interface TicketUser {
    _id: string,
    idTicket: string,
    timeFrame: string,
    date: string,
    idFilm: string,
    price: number,
    dateBuy: string,
    title: string
    thumbnails: string
    background: string
}
export interface TicketDetail { }
export interface InfoTicket {
    name: string,
    email: string,
    phone: string
}
export interface TicketRequest extends InfoTicket {
    idFilm: string,
    idUser: string,
    timeFrame: string,
    date: string,
    price: number,
    seat: string,
    orderId: string,
    confirm: boolean,
    dateBuy: string,
    count: number
}
export interface TicketResponse {
    total: number
    totalPage: number
    limit: number
    page: number
    data: TicketByUser[]
}
export interface TicketByUser {
    _id: string
    idTicket: string
    timeFrame: number
    date: string
    idFilm: string
    dateBuy: string
    price: number
    title: string
    thumbnails: string
    background: string
}