import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Appointment } from './appointment.entity';

@ObjectType()
@Directive('@key(fields: "_id")')
export class Patient {
  @Field(() => ID)
  _id: string;

  @Field(() => [Appointment])
  appointments?: Appointment[];  
}
