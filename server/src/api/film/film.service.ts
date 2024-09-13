import { Injectable } from '@nestjs/common';
import { FilmCreate } from 'src/interfaces/film.interface';
import { Responses } from 'src/interfaces/request.interface';
import { Film } from 'src/schemas/film.schema';
import { FilmRepository } from './film.repositoy';
import { handleFindData } from 'src/utils/service';

@Injectable()
export class FilmService {

    constructor(
        private readonly filmRepository: FilmRepository
    ) { }
    async findAll(page: string, limit: string): Promise<Responses> {
        const countData = await this.filmRepository.countData()
        const data: Film[] = await this.filmRepository.findAll(page, limit)
        if (!data || data.length === 0) return { status: 404, message: 'No data available' }
        return {
            status: 200, data: {
                total: countData,
                totalPage: Math.ceil(countData / parseInt(limit)),
                limit: parseInt(limit),
                page: parseInt(page),
                detail: data
            }
        }
    }
    async findOne(id: string): Promise<Responses> {
        return handleFindData(this.filmRepository.findOne(id))
    }
    async findNew(): Promise<Responses> {
        return handleFindData(this.filmRepository.findNew())
    }
    async findShowing(): Promise<Responses> {
        return handleFindData(this.filmRepository.findShowing())
    }
    async search(key: string, page: string, limit: string): Promise<Responses> {
        const countData = await this.filmRepository.countData(key)
        const data = await this.filmRepository.search(key, page, limit)
        if (!data || data.length === 0) return { status: 404, message: 'No data available' }
        return {
            status: 200, data: {
                total: countData,
                totalPage: Math.ceil(countData / parseInt(limit)),
                limit: parseInt(limit),
                page: parseInt(page),
                detail: data
            }
        }
    }
    async create(data: FilmCreate): Promise<Responses> {
        const dataInsert = await this.filmRepository.create(data)
        if (!dataInsert) return { status: 404, message: 'Create film failed' }
        return { status: 200, message: 'Create film success', data: dataInsert }
    }
    async update(id: string, data: { [x: string]: string | number | boolean | number[] }): Promise<Responses> {
        const dataUpdate = await this.filmRepository.update(id, data)
        if (!dataUpdate) return { status: 404, message: 'Update film failed' }
        return { status: 200, message: 'Update film success' }
    }
    async delete(id: string) {
        const dataDelete = await this.filmRepository.delete(id)
        if (!dataDelete) return { status: 404, message: 'Delete film failed' }
        return { status: 200, message: 'Delete film success' }
    }
}
