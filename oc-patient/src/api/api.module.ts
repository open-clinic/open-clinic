import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PatientsApi } from './api.resolver';
import { PatientsDatabaseModule } from 'src/database/database.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PatientsDatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ClientsModule.register([
      {
        name: 'patients_queue',
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
      },
    ]),
  ],
  providers: [PatientsApi],
})
export class PatientsApiModule {}
