import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatisFilm, StatisUser } from "src/interfaces/statis.interface";
import { Film } from "src/schemas/film.schema";
import { User } from "src/schemas/user.schema";

export class StatisRepository {
    constructor(
        @InjectModel('film') private readonly film: Model<Film>,
        @InjectModel('user') private readonly user: Model<User>,
    ) { }

    async getStatisFilm(): Promise<StatisFilm> {
        const total = await this.film.find({}).countDocuments();
        const top = await this.film.find({}).sort({ release: -1 }).limit(6).exec();
        return {
            top: top,
            total: total,
            new: top.length
        }
    }

    async getStatisUser(): Promise<StatisUser> {
        const total = await this.user.find({}).countDocuments();
        const newUser = await this.user.find({ role: 2 }).countDocuments();
        return {
            total: total,
            new: newUser
        }
    }
}