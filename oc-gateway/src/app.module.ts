import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'patients', url: 'http://oc-patient:3001/graphql' }, 
          //  { name: 'appointments', url: 'http://oc-appointment:3002/graphql' },
          ],
        }),        
      },
    }),
  ],
})

export class AppModule {}