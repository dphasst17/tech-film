import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserResponse } from "src/interfaces/user.interface";
import { User } from "src/schemas/user.schema";

export class UserRepository {
    constructor(
        @InjectModel('user') private readonly user: Model<User>,
    ) { }

    async findOne(id: string): Promise<UserResponse[]> {
        return await this.user.find({ idUser: id }).exec();
    }

    async finData(key: string, value: string): Promise<UserResponse[]> {
        return await this.user.find({ ['key']: value }).exec();
    }
    async findAll(): Promise<UserResponse[]> {
        return await this.user.find().exec();
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