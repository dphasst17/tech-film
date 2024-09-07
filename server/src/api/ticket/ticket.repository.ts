import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Film } from "src/schemas/film.schema";
import { Ticket } from "src/schemas/ticket.schema";
import { User } from "src/schemas/user.schema";

export class TicketRepository {
    constructor(
        @InjectModel('ticket') private readonly ticket: Model<Ticket>,
        @InjectModel('film') private readonly film: Model<Film>,
        @InjectModel('user') private readonly user: Model<User>,
    ) { }
    async create(data: { [key: string]: string | number | boolean | any }): Promise<Film[]> {
        const create_data = await this.ticket.create(data);
        if (!create_data) throw new Error('Ticket create fail')
        const getFilm = await this.film.find({ id: data.idFilm })
        return getFilm
    }
    async update(id: string, data: { [key: string]: string | number | boolean | any }): Promise<boolean> {
        const updateTicket = await this.ticket.findOneAndUpdate({ idTicket: id }, data, { new: true, projection: { _id: 1, idUser: 1 } });
        if (!updateTicket) throw new Error('Update ticket fail')
        const updatePoint = await this.user.findOneAndUpdate({ idUser: updateTicket.idUser }, { $inc: { point: 1 } }, { new: true });
        return updatePoint ? true : false
    }
    async findOne(id: string): Promise<Ticket[]> {
        return await this.ticket.find({ _id: id });
    }
    async findAll(): Promise<Ticket[]> {
        return await this.ticket.find();
    }
    async findSeat(date: string, time: string): Promise<Ticket[]> {
        return await this.ticket.find({ date: date, timeFrame: time }).select({ _id: 0, seat: 1 }).exec()
    }
    async getCountByUser(id: string): Promise<number> {
        return await this.ticket.find({ idUser: id }).countDocuments()
    }
    async getByUser(id: string, page: string, limit: string): Promise<Ticket[]> {
        return await this.ticket.aggregate([
            { $match: { idUser: id } },
            { $lookup: { from: 'film', localField: 'idFilm', foreignField: 'id', as: 'film' } },
            {
                $project: {
                    _id: 1,
                    idTicket: 1,
                    timeFrame: 1,
                    date: 1,
                    idFilm: 1,
                    price: 1,
                    dateBuy: 1,
                    title: { $arrayElemAt: ["$film.title", 0] },
                    thumbnails: { $arrayElemAt: ["$film.thumbnails", 0] },
                    background: { $arrayElemAt: ["$film.background", 0] },
                }
            }
        ])
            .sort({ created_at: -1 })
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .exec()
    }
    async delete(id: string): Promise<Ticket> {
        return await this.ticket.findByIdAndDelete(id);
    }
}