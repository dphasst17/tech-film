import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from 'src/schemas/auth.schema';
import { UserService } from '../user/user.service';
import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';

@Module({
    providers: [AuthService, UserService, AuthRepository, UserRepository],
    controllers: [AuthController],
    imports: [
        MongooseModule.forFeature([{ name: 'auth', schema: AuthSchema }]),
        MongooseModule.forFeature([{ name: 'user', schema: AuthSchema }])
    ],
    exports: [AuthService]
})
export class AuthModule { }
