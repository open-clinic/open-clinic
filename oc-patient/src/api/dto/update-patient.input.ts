import { CreatePatientInput } from './create-patient.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePatientInput extends PartialType(CreatePatientInput) {
  @Field()
  _id: string;
}
