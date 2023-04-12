import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field()
  name: string;

  @Field()
  birthdate: Date;

  @Field()
  cpf: string;
}
