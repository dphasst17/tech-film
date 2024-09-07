import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserResponse } from "src/interfaces/user.interface";
import { Auth } from "src/schemas/auth.schema";
import { User } from "src/schemas/user.schema";

export class StaffRepository {
    constructor(
        @InjectModel('user') private readonly user: Model<User>,
        @InjectModel('auth') private readonly auth: Model<Auth>,
    ) { }
    async countData(): Promise<number> {
        return await this.auth.countDocuments({ role: 1 }).exec();
    }

    async findAll(page: string, limit: string): Promise<UserResponse[]> {
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
                    "auth.role": 1
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
    async getStaff(): Promise<UserResponse[]> {
        return await this.auth.aggregate([
            {
                $lookup: {
                    from: "user",
                    localField: "idUser",
                    foreignField: "id",
                    as: "user"
                }
            }
        ]).exec()
    }

    async getStaffById(id: string): Promise<UserResponse[]> {
        return await this.auth.aggregate([
            {
                $match: { idUser: id }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "idUser",
                    foreignField: "id",
                    as: "user"
                }
            }
        ]).exec()
    }

    async create(dataAuth: { [key: string]: string | number | boolean | any }, dataStaff: { [key: string]: string | number | boolean | any }): Promise<Auth | { message: string }> {
        const createAuth = await this.auth.create(dataAuth)
        const createInfo = await this.user.create(dataStaff)
        if (!createAuth) {
            return { message: 'Create auth failed! Please try again' }
        }
        if (!createInfo) {
            await this.auth.findByIdAndDelete({ _id: createAuth._id })
            return { message: 'Create user failed! Please try again' }
        }
        return createAuth
    }

}