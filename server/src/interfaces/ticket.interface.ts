export interface Ticket {
    _id: string
    id: string
    idUser: string
    name: string
    phone: string
    email: string
    created_at: string
    count: number
    price: number
    idFilm: string
    release: string
    timeFrame: number
    seat: string
    orderId: string
    confirm: boolean
}

export interface TicketCreate extends Ticket { }
