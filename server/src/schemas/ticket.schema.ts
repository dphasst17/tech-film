import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema({ collection: 'ticket', versionKey: false })
export class Ticket {
    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    idUser: string

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    created_at: string

    @Prop({ required: true })
    count: number

    @Prop({ required: true })
    price: number

    @Prop({ required: true })
    idFilm: string

    @Prop({ required: true })
    release: string;

    @Prop({ required: true })
    timeFrame: number

    @Prop({ required: true })
    seat: string

    @Prop({ required: true })
    orderId: string

    @Prop({ required: true })
    confirm: boolean

}

export const TicketSchema = SchemaFactory.createForClass(Ticket);