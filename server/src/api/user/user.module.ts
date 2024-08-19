import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { UserRepository } from './user.repository';

@Module({
    providers: [UserService, UserRepository],
    controllers: [UserController],
    imports: [
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }])
    ],
    exports: [UserService]
})
export class UserModule { }
