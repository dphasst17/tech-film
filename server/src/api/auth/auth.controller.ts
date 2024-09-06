import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequest, AuthResponse } from 'src/interfaces/auth.interface';
import { RequestCustom, Responses } from 'src/interfaces/request.interface';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() data: AuthRequest, @Res() res: Response): Promise<Response> {
        const auth = await this.authService.login(data.username, data.password)
        return res.status(auth.status).json(auth)
    }

    @Post('register')
    async register(@Body() data: AuthRequest, @Res() res: Response): Promise<Response> {
        const auth = await this.authService.register(data)
        return res.status(auth.status).json(auth)
    }
    @Get('/token')
    async getNewToken(@Req() req: RequestCustom, @Res() res: Response): Promise<Response> {
        const idUser = req.idUser
        const token = await this.authService.getNewToken(idUser)
        return res.status(token.status).json(token)
    }
    @Put('/password')
    async updateAuth(@Req() req: RequestCustom, @Body() data: { current: string, password: string }, @Res() res: Response): Promise<Response> {
        const idUser = req.idUser
        const auth = await this.authService.updateAuth(idUser, data)
        return res.status(auth.status).json(auth)
    }
}
