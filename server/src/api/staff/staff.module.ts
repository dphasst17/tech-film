import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { AuthSchema } from 'src/schemas/auth.schema';
import { StaffController } from './staff.controller';
import { StaffRepository } from './staff.repository';

@Module({
  providers: [StaffService, StaffRepository],
  exports: [StaffService],
  controllers: [StaffController],
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'auth', schema: AuthSchema }]),
  ],
})
export class StaffModule { }
