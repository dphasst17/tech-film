import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'user' })
export class User {
    @Prop()
    _id: string
    @Prop()
    idUser: string
    @Prop()
    email: string
    @Prop()
    name: string
    @Prop()
    phone: string
    @Prop()
    point: number
    @Prop()
    action: string
    @Prop()
    created_at: string
}

export const UserSchema = SchemaFactory.createForClass(User);