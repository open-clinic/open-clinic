import { NestFactory } from '@nestjs/core';
import { PatientsModule } from './patient.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PatientsModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [ process.env.RABBITMQ_HOST ],
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
