import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';
import { GatewayHealth } from './health/health.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'patients', url: `http://${process.env.OC_PATIENT_URI}/graphql` },
            //  { name: 'appointments', url: `http://${process.env.OC_APPOINTMENTS_URI}/graphql` },
          ],
        }),
      },
    }),
  ],
  controllers: [GatewayHealth],
})
export class AppModule {}
