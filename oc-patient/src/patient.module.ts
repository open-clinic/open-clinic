import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientsRabbitMQ } from './rabbitmq/patient.controller';
import { PatientsGraphQL } from './graphql/patient.resolver';
import { PatientsDatabase } from './mongodb/patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient, PatientSchema } from './mongodb/patient.schema';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'patients_queue',
        transport: Transport.RMQ,
        options: {
          urls: [ process.env.RABBITMQ_HOST ],
          queue: 'patients_queue',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGODB_URI }),
    }),
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  providers: [PatientsGraphQL, PatientsDatabase],
  controllers: [PatientsRabbitMQ],
})
export class PatientsModule {}
