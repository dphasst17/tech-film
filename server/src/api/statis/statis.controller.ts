import { Controller, Get, Res } from '@nestjs/common';
import { StatisService } from './statis.service';
import { Response } from 'express';

@Controller('api/statis')
export class StatisController {
    constructor(
        private readonly statisService: StatisService
    ) { }

    @Get('/film')
    async getStatis(@Res() res: Response): Promise<Response> {
        const data = await this.statisService.getStatis()
        return res.status(data.status).json(data)
    }

    @Get('/user')
    async getStatisUser(@Res() res: Response): Promise<Response> {
        const data = await this.statisService.getStatisUser()
        return res.status(data.status).json(data)
    }
}
