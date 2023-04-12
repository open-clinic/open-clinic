import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientsBroker } from './broker.controller';
import { PatientsDatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    PatientsDatabaseModule,
    ClientsModule.register([
      {
        name: 'patients_queue',
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
      },
    ]),
  ],
  providers: [],
  controllers: [PatientsBroker],
})
export class PatientsBrokerModule {}
