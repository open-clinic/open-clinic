import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AppointmentsService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Patient } from './entities/patient.entity';

@Resolver(() => Appointment)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Mutation(() => Appointment)
  createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput) {
    return this.appointmentsService.create(createAppointmentInput);
  }

  @Query(() => [Appointment], { name: 'appointments' })
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Query(() => Appointment, { name: 'appointment' })
  findOne(@Args('_id') _id: string) {
    return this.appointmentsService.findOne(_id);
  }

  @Mutation(() => Appointment)
  updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
    return this.appointmentsService.update(updateAppointmentInput._id, updateAppointmentInput);
  }

  @Mutation(() => Appointment)
  removeAppointment(@Args('_id') _id: string) {
    return this.appointmentsService.remove(_id);
  }

  @ResolveField(() => Patient) 
  patient(@Parent() appointment: Appointment): any {
    return { __typename: 'Patient', _id: appointment._patientId };
  }
  
}
