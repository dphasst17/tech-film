import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketSchema } from 'src/schemas/ticket.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketClass } from 'src/sockets/socket';
import { TicketRepository } from './ticket.repository';

@Module({
  providers: [TicketService, SocketClass, TicketRepository],
  controllers: [TicketController],
  imports: [
    MongooseModule.forFeature([{ name: 'ticket', schema: TicketSchema }]),
  ],
  exports: [TicketService],
})
export class TicketModule { }
