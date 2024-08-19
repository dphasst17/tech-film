import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    methos: ['GET', 'POST'],

})
export class SocketClass {
    @WebSocketServer()
    server: Server;

    constructor() { }
    // Phát sự kiện 'seat-changed'
    emitSeatChanged(newTicket: { date: string; time: string; seat: string, status: string }) {
        this.server.emit('seat-focus', newTicket);
    }


    @SubscribeMessage('seat-select')
    async seatSelect(client: SocketClass, ticketData: { date: string; time: string; seat: string }) {
        // Xử lý logic chọn ghế, ví dụ lưu vào cơ sở dữ liệu
        const newTicket = {
            date: ticketData.date,
            time: ticketData.time,
            seat: ticketData.seat,
            status: 'focus'
        };

        // Phát sự kiện seat-changed cho tất cả các client
        this.emitSeatChanged(newTicket);
    }
}
