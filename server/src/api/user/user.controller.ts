import { Body, Controller, Delete, Get, Put, Request, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestCustom } from 'src/interfaces/request.interface';
import { Response } from 'express';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get('all')
    async index(@Res() res: Response): Promise<Response> {
        const data = await this.userService.findAll()
        return res.status(data.status).json(data);
    }
    @Get()
    async detail(@Request() req: RequestCustom, @Res() res: Response): Promise<Response> {
        const idUser = req.idUser
        const data = await this.userService.findOne(idUser)
        return res.status(data.status).json(data);
    }
    @Put()
    async update(@Request() req: RequestCustom, @Body() data: { [key: string]: string | number | boolean | any }, @Res() res: Response): Promise<Response> {
        const idUser = req.idUser
        const update = await this.userService.update(idUser, data)
        return res.status(update.status).json(update);
    }
    /* @Delete()
    async delete(@Request() req: RequestCustom, @Res() res: Response): Promise<Response> {
        const idUser = req.idUser
        const deleteData = await this.userService.delete(idUser)
        return res.status(deleteData.status).json(deleteData);
    } */
}
