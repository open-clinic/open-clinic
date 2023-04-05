import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Patient } from "./entities/patient.entity";
import { AppointmentsService } from "./appointment.service";
import { Appointment } from "./entities/appointment.entity";

@Resolver(() => Patient)
export class PatientResolver {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @ResolveField(() =>  [Appointment])
    appointments(@Parent() patient: Patient): Appointment[] {
        return this.appointmentsService.forPatient(patient._id);
    }
 }
