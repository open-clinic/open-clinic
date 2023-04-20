import { NestFactory } from '@nestjs/core';
import { PatientsAppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { PatientsBrokerModule } from './broker/broker.module';

async function bootstrap() {
  const app = await NestFactory.create(PatientsAppModule);

  app.connectMicroservice({
    module: PatientsBrokerModule,
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_URI}`,
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
