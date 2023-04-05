import { NestFactory } from '@nestjs/core';
import { AppointmentsModule } from './appointment.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function rabbitmq() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppointmentsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://bqwlbngm:C7SpvnKySFhW-nxyOJuJcLy0DBdhdbwE@jackal.rmq.cloudamqp.com/bqwlbngm'],
        queue: 'appointments_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
}

async function bootstrap() {
  const app = await NestFactory.create(AppointmentsModule);
  await app.listen(3002);
}

rabbitmq();
bootstrap();
