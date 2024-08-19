import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilmCreate } from "src/interfaces/film.interface";
import { Film } from "src/schemas/film.schema";

export class FilmRepository {
    constructor(
        @InjectModel('film') private readonly film: Model<Film>,
    ) { }
    async countData(key?: string): Promise<number> {
        const data = await (key ? this.film.countDocuments({ title: new RegExp(key, 'i') }) : this.film.countDocuments()).exec()
        return data
    }
    async findAll(page: string, limit: string): Promise<Film[]> {
        return await this.film.find().sort({ release: -1 }).limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit)).exec()
    }

    async findOne(id: string): Promise<Film[]> {
        return await this.film.find({ _id: id }).exec()
    }
    async findNew(): Promise<Film[]> {
        return await this.film.find().sort({ release: -1 }).limit(10).exec()
    }

    async search(key: string, page: string, limit: string): Promise<Film[]> {
        return await this.film.find({ title: new RegExp(key, 'i') }).sort({ release: -1 }).limit(parseInt(limit)).skip((parseInt(page) - 1) * parseInt(limit)).exec()
    }
    async create(data: FilmCreate): Promise<Film> {
        return await this.film.create(data)
    }

    async update(id: string, data: { [x: string]: string | number | boolean | number[] }): Promise<Film> {
        return await this.film.findByIdAndUpdate(id, data)
    }

    async delete(id: string): Promise<Film> {
        return await this.film.findByIdAndDelete(id)
    }

}