import { InfoTicket } from "./ticket";

export interface User extends InfoTicket {
    point: number
    created_at: string
    action: string
    [key: string]: any
}