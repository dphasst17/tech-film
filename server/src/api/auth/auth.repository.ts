import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "src/schemas/auth.schema";

export class AuthRepository {
    constructor(
        @InjectModel('auth') private readonly auth: Model<Auth>,
    ) { }
    private async changeAccount(idUser: string) {
        return await this.auth.findByIdAndDelete({ idUser: idUser }).exec()
    }
    async isAdmin(idUser: string) {
        return await this.auth.findOne({ idUser: idUser, role: { $in: [0, 1] } }).exec()
    }
    async login(username: string) {
        return await this.auth.find({ username: username }).exec()
    }

    async register(data: { [key: string]: string | number }) {
        return await this.auth.create(data)
    }

    async updateAuth(idUser: string, data: { [key: string]: string | number | boolean | any }) {
        return await this.auth.findByIdAndUpdate({ idUser: idUser }, data)
    }
    async changeAccountAuth(idUser: string) {
        return await this.auth.findByIdAndDelete(idUser)
    }
}