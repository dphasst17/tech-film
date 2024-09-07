import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserResponse } from "src/interfaces/user.interface";
import { Auth } from "src/schemas/auth.schema";
import { User } from "src/schemas/user.schema";

export class UserRepository {
    constructor(
        @InjectModel('user') private readonly user: Model<User>,
        @InjectModel('auth') private readonly auth: Model<Auth>,
    ) { }
    async countData(key?: string): Promise<number> {
        return await this.auth.countDocuments({ role: 2 }).exec();
    }
    async findOne(id: string): Promise<UserResponse[]> {
        return await this.user.find({ idUser: id }).exec();
    }

    async finData(key: string, value: string): Promise<UserResponse[]> {
        return await this.user.find({ ['key']: value }).exec();
    }
    async findAll(page: string, limit: string): Promise<UserResponse[]> {
        //create statemnt to find user in auth collection with auth.role = 2 and get info from user collection
        const findData = await this.user.aggregate([
            {
                $lookup: {
                    from: "auth",
                    localField: "idUser",
                    foreignField: "idUser",
                    as: "auth"
                }
            },
            {
                $match: {
                    "auth.role": 2
                }
            },
            {
                $skip: (parseInt(page) - 1) * parseInt(limit)
            },
            {
                $limit: parseInt(limit)
            },
            {
                $project: {
                    _id: 1,
                    idUser: 1,
                    name: 1,
                    email: 1,
                    phone: 1,
                    point: 1,
                    action: 1,
                    created_at: 1
                }
            }

        ])
        return findData
    }

    async create(data: { [key: string]: string | number | boolean | any }): Promise<User> {
        return await this.user.create(data);
    }

    async update(id: string, data: { [key: string]: string | number | boolean | any }): Promise<User> {
        return await this.user.findOneAndUpdate({ idUser: id }, data).exec();
    }

    async delete(id: string): Promise<User> {
        return await this.user.findByIdAndDelete({ idUser: id }).exec();
    }
}