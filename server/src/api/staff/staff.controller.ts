import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Response } from 'express';
import { StaffAuthCreate, StaffInfoCreate } from 'src/interfaces/staff.interface';

@Controller('api/staff')
export class StaffController {
    constructor(
        private readonly staffService: StaffService
    ) { }

    @Get('all')
    async getAll(@Res() res: Response, @Query('page') page: string = '1', @Query('limit') limit: string = '10'): Promise<Response> {
        const data = await this.staffService.getAll(page, limit)
        return res.status(data.status).json(data)
    }
    @Get()
    async getStaff(@Res() res: Response): Promise<Response> {
        const data = await this.staffService.getStaff()
        return res.status(data.status).json(data)
    }

    @Get('detail/:id')
    async getDetailStaff(@Res() res: Response, @Param('id') id: string): Promise<Response> {
        const data = await this.staffService.getDetailStaff(id)
        return res.status(data.status).json(data)
    }

    @Post()
    async create(@Res() res: Response, @Body() data: { dataAuth: StaffAuthCreate[], dataStaff: StaffInfoCreate[] }): Promise<Response> {
        const dataAuth = data.dataAuth
        const dataStaff = data.dataStaff
        const created = await this.staffService.create(dataAuth, dataStaff)
        return res.status(created.status).json(created)
    }
}
