import { Injectable } from '@nestjs/common';
import { TicketCreate } from 'src/interfaces/ticket.interface';
import { TicketRepository } from './ticket.repository';
import { SocketClass } from 'src/sockets/socket';
import { handleSendMail } from 'src/utils/mails';
import { Responses } from 'src/interfaces/request.interface';
import * as crypto from 'crypto';
@Injectable()
export class TicketService {

    constructor(
        private readonly ticketRepository: TicketRepository,
        private readonly socketService: SocketClass
    ) { }
    private randomString = (length: number) => {
        return crypto.randomBytes(length).toString("hex");
    };
    async getByUser(id: string, page: string, limit: string): Promise<Responses> {
        const getCount = await this.ticketRepository.getCountByUser(id)
        const userTicket = await this.ticketRepository.getByUser(id, page, limit)
        return userTicket ? {
            status: 200, data: {
                total: getCount,
                totalPage: Math.ceil(getCount / parseInt(limit)),
                limit: parseInt(limit),
                page: parseInt(page),
                data: userTicket
            }
        } : { status: 404, message: 'Ticket does not available' }
    }

    async findAll(): Promise<Responses> {
        const data = await this.ticketRepository.findAll()
        return data ? { status: 200, data: data } : { status: 404, message: 'Ticket does not available' }
    }
    async findOne(id: string): Promise<Responses> {
        const detail = await this.ticketRepository.findOne(id)
        return detail ? { status: 200, data: detail } : { status: 404, message: 'Ticket does not available' }
    }
    async findSeatDetail(date: string, time: string): Promise<Responses> {
        const seat = await this.ticketRepository.findSeat(date, time)
        const convertSeat = seat.flatMap((s: { seat: string }) => s.seat)
        return seat ? { status: 200, data: convertSeat } : { status: 404, message: 'Seat does not available' }
    }
    async create(idUser: string, data: TicketCreate) {
        const id = this.randomString(4);
        data.id = id
        data.idUser = idUser
        const insertData = await this.ticketRepository.create(data)
        const infoTicket = {
            toMail: data.email,
            subject: "FILM TICKET",
            title: insertData[0].title,
            name: data.name,
            frame: data.timeFrame,
            date: data.created_at,
            count: data.count,
            id: `${data.idFilm}-${id}`,
            background: insertData[0].background,
        };
        const seatData = {
            date: data.created_at,
            time: data.timeFrame,
            seat: data.seat,
            status: 'select'
        }
        this.socketService.server.emit('seat', seatData);
        const sendMail = handleSendMail(infoTicket, "qr")
        return sendMail
    }
    async update(id: string, data: { [x: string]: string | number | boolean | number[] }): Promise<Responses> {
        const update = await this.ticketRepository.update(id, data)
        return update ? { status: 200, data: update } : { status: 404, message: 'Update ticket fail' }
    }

    async delete(id: string): Promise<Responses> {
        const deleteTicket = await this.ticketRepository.delete(id)
        return deleteTicket ? { status: 200, data: deleteTicket } : { status: 404, message: 'Delete ticket fail' }
    }
}
