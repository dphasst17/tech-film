import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmCreate } from 'src/interfaces/film.interface';
import { Response } from 'express';

@Controller('api/film')
export class FilmController {
    constructor(private readonly filmService: FilmService) { }
    @Get()
    async index(@Query('page') page: string = '1', @Query('limit') limit: string = '10', @Res() res: Response): Promise<Response> {
        const data = await this.filmService.findAll(page, limit)
        return res.status(data.status).json(data)
    }

    @Get('detail/:id')
    async detail(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        const data = await this.filmService.findOne(id)
        return res.status(data.status).json(data)
    }
    @Get('new')
    async new(@Res() res: Response): Promise<Response> {
        const result = await this.filmService.findNew()
        return res.status(result.status).json(result)
    }
    @Get('showing')
    async showing(@Res() res: Response): Promise<Response> {
        const result = await this.filmService.findShowing()
        return res.status(result.status).json(result)
    }
    @Get('search/:key')
    async search(@Query('page') page: string = '1', @Query('limit') limit: string = '10', @Param('key') key: string, @Res() res: Response): Promise<Response> {
        const data = await this.filmService.search(key, page, limit)
        return res.status(data.status).json(data)
    }
    @Post()
    async create(@Body() data: FilmCreate, @Res() res: Response): Promise<Response> {
        const created = await this.filmService.create(data)
        return res.status(created.status).json(created)
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: { [x: string]: string | number | boolean | number[] }, @Res() res: Response): Promise<Response> {
        const updated = await this.filmService.update(id, data)
        return res.status(updated.status).json(updated)
    }
}
