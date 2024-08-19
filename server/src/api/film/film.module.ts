import { Module } from '@nestjs/common';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from 'src/schemas/film.schema';
import { FilmRepository } from './film.repositoy';

@Module({
    providers: [FilmService, FilmRepository],
    controllers: [FilmController],
    imports: [
        MongooseModule.forFeature([{ name: 'film', schema: FilmSchema }])
    ],
    exports: [FilmService]
})
export class FilmModule { }
