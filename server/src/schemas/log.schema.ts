import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LogDocument = HydratedDocument<Log>;

@Schema({ versionKey: false })
export class Log {
    @Prop()
    idLog: string;
    @Prop()
    idUser: string;
    @Prop()
    action: string;
    @Prop()
    date: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);