import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ collection: 'auth', versionKey: false })
export class Auth {
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