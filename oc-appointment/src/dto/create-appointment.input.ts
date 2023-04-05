import { InputType, Int, Field } from '@nestjs/graphql';
import { Patient } from 'src/entities/patient.entity';

@InputType()
export class CreateAppointmentInput {
  @Field()
  _id: string;

  @Field()
  _patientId: string;

  @Field()
  datetime: Date;
}
