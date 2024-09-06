import { Body, Controller, Get, Param, Post, Put, Query, Request, Res } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketCreate } from 'src/interfaces/ticket.interface';
import { RequestCustom } from 'src/interfaces/request.interface';
import { Response } from 'express';
@Controller('api/ticket')
export class TicketController {
    constructor(
        private readonly ticketService: TicketService,
    ) { }
    @Get('/user')
    async getByUser(@Request() req: RequestCustom, @Res() res: Response, @Query('page') page: string = '1', @Query('limit') limit: string = '3'): Promise<Response> {
        const id = req.idUser
        const data = await this.ticketService.getByUser(id, page, limit)
        return res.status(data.status).json(data);
    }
    @Post('seat')
    async seat_selected(@Body() data: { date: string; time: string }, @Res() res: Response): Promise<Response> {
        const result = await this.ticketService.findSeatDetail(data.date, data.time)
        return res.status(result.status).json(result);
    }
    @Post()
    async create(@Request() req: RequestCustom, @Body() data: TicketCreate, @Res() res: Response): Promise<Response> {
        const idUser = req.idUser
        const result = await this.ticketService.create(idUser, data)
        return res.status(result.status).json(result);
    }
    @Get('detail/:id')
    async detail(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        const data = await this.ticketService.findOne(id)
        return res.status(data.status).json(data);
    }
    @Put()
    async update(@Body('id') id: string, @Body() data: { [x: string]: string | number | boolean | number[] }, @Res() res: Response): Promise<Response> {
        const updated = await this.ticketService.update(id, data)
        return res.status(updated.status).json(updated);
    }
}
