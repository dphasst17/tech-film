import { Injectable } from '@nestjs/common';
import { StatisRepository } from './statis.repository';
import { Responses } from 'src/interfaces/request.interface';

@Injectable()
export class StatisService {
    constructor(private readonly statisRepository: StatisRepository) { }

    async getStatis(): Promise<Responses> {
        const data = await this.statisRepository.getStatisFilm()
        if (!data) return { status: 404, message: 'No data available' }
        return { status: 200, data: data }
    }

    async getStatisUser(): Promise<Responses> {
        const data = await this.statisRepository.getStatisUser()
        if (!data) return { status: 404, message: 'No data available' }
        return { status: 200, data: data }
    }
}
