import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Patient } from './patient.entity';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Appointment {
  @Field(() => ID)
  _id: string;

  @Field()
  _patientId: string;

  @Field(() => Patient)
  patient?: Patient;

  @Field()
  datetime: Date;
}
