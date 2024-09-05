import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { StatisFilm, StatisUser } from "src/interfaces/statis.interface";
import { Auth } from "src/schemas/auth.schema";
import { Film } from "src/schemas/film.schema";
import { User } from "src/schemas/user.schema";

export class StatisRepository {
    constructor(
        @InjectModel('film') private readonly film: Model<Film>,
        @InjectModel('user') private readonly user: Model<User>,
        @InjectModel('auth') private readonly auth: Model<Auth>,
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
        const newUser = await this.auth.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "idUser",
                    foreignField: "idUser",
                    as: "userData"
                }
            },
            {
                $unwind: "$userData"
            },
            {
                $addFields: {
                    "userData.created_at": {
                        $dateFromString: { dateString: "$userData.created_at" }
                    }
                }
            },
            {
                $match: {
                    "role": 2,
                    "userData.created_at": {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // Ngày đầu tiên của tháng hiện tại
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) // Ngày đầu tiên của tháng tiếp theo
                    }
                }
            },
            {
                $count: "total"
            }
        ]);
        return {
            total: total,
            new: newUser[0].total
        }
    }
}