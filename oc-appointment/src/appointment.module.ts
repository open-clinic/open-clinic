import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointment.service';
import { AppointmentsResolver } from './appointment.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PatientResolver } from './patient.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
  providers: [AppointmentsResolver, AppointmentsService, PatientResolver]
})
export class AppointmentsModule {}
