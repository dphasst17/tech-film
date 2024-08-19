import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ collection: 'auth' })
export class Auth {
    @Prop({ required: true })
    _id: string
    @Prop({ required: true })
    idUser: string
    @Prop({ required: true })
    username: string
    @Prop({ required: true })
    password: string
    @Prop({ required: true })
    role: number
}

export const AuthSchema = SchemaFactory.createForClass(Auth);