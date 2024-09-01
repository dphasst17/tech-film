import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ticket } from "src/schemas/ticket.schema";

export class TicketRepository {
    constructor(
        @InjectModel('ticket') private readonly ticket: Model<Ticket>,
    ) { }
    async create(data: { [key: string]: string | number | boolean | any }): Promise<Ticket> {
        return await this.ticket.create(data);
    }
    async update(id: string, data: { [key: string]: string | number | boolean | any }): Promise<Ticket> {
        return await this.ticket.findByIdAndUpdate(id, data, { new: true });
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