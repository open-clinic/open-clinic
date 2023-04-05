import { Injectable } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  private readonly appointments: Appointment[] = [];

  create(createAppointmentInput: CreateAppointmentInput) {
    this.appointments.push(createAppointmentInput);
    return createAppointmentInput;
  }

  findAll() {
    return this.appointments;
  }

  findOne(_id: string) {
    return this.appointments.find(appointment => appointment._id === _id)
  }

  update(_id: string, updateAppointmentInput: UpdateAppointmentInput) {
    return `This action updates a #${_id} appointment`;
  }

  remove(_id: string) {
    delete this.appointments[this.appointments.indexOf(this.findOne(_id))];
  }

  forPatient(_patientId: string) {
    return this.appointments.filter((appointment) => appointment._patientId === _patientId);
  }
}
