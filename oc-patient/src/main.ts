import { NestFactory } from '@nestjs/core';
import { PatientsAppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { PatientsApiModule } from './api/api.module';

async function bootstrap() {
  const app = await NestFactory.create(PatientsAppModule);

  app.connectMicroservice({
    module: PatientsApiModule,
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      ],
      queue: 'patients_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices();

  await app.listen(3001);
}

bootstrap();
