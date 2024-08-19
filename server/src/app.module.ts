import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { FilmModule } from './api/film/film.module';
import { TicketModule } from './api/ticket/ticket.module';
import { JwtAuthMiddleware } from './middlewares/token.middleware';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({ global: true, secret: process.env.SECRET }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.NAME}:${process.env.PASS}@tech.of4l8iy.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority&ssl=true`),
    UserModule,
    AuthModule,
    FilmModule,
    TicketModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtAuthMiddleware)
      .forRoutes(
        { path: 'api/user', method: RequestMethod.GET },
        { path: 'api/user', method: RequestMethod.PUT },
        { path: 'api/ticket/user', method: RequestMethod.GET },
        { path: 'api/token', method: RequestMethod.GET },
        { path: 'api/auth/token', method: RequestMethod.GET },
      );
  }
}
