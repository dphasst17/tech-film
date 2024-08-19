import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function server() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  setTimeout(() => { console.log(mongoose.connection.readyState); }, 5000)
  await app.listen(3001);
}
server();
