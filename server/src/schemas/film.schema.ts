import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type FilmDocument = HydratedDocument<Film>;

@Schema({ collection: 'film' })
export class Film {
    @Prop({ required: true })
    title: string;
    @Prop({ required: true })
    director: string;
    @Prop({ required: true })
    cast: string;
    @Prop({ required: true })
    des: string;
    @Prop({ required: true })
    release: string;
    @Prop({ required: true })
    background: string;
    @Prop({ required: true })
    thumbnails: string;
    @Prop({ required: true })
    trailer: string;
    @Prop({ required: true })
    id: string
    @Prop({ required: true })
    frame: number[]
    @Prop({ required: true })
    time: string
}

export const FilmSchema = SchemaFactory.createForClass(Film);