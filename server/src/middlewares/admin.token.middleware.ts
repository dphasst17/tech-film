import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { AuthRepository } from 'src/api/auth/auth.repository';
import { RequestCustom } from 'src/interfaces/request.interface';
@Injectable()
export class JwtAdminAuthMiddleware implements NestMiddleware {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository
    ) { }

    async use(req: RequestCustom, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException('Authorization header not found');
        }
        const token = authHeader.split(' ')[1];

        try {
            const decoded = this.jwtService.verify(token);
            if (!decoded) {
                throw new UnauthorizedException('Token has expired')
            };
            const isAdmin = await this.authRepository.isAdmin(decoded.idUser)
            if (!isAdmin) {
                throw new UnauthorizedException('Not an admin')
            }
            req.idUser = decoded.idUser;
            next();
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}