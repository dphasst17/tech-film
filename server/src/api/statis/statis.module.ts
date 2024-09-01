import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from 'src/schemas/film.schema';
import { TicketSchema } from 'src/schemas/ticket.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { StatisController } from './statis.controller';
import { StatisRepository } from './statis.repository';
import { StatisService } from './statis.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }]),
        MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
        MongooseModule.forFeature([{ name: 'ticket', schema: TicketSchema }]),
    ],
    controllers: [
        StatisController
    ],
    providers: [StatisRepository, StatisService],
    exports: [StatisService],
})
export class StatisModule { }
