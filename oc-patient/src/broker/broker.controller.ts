import { Controller } from '@nestjs/common';
import { CreatePatientInput } from '../api/dto/create-patient.input';
import { UpdatePatientInput } from '../api/dto/update-patient.input';
import { MessagePattern } from '@nestjs/microservices';
import { PatientsDatabase } from '../database/database.service';
import { Patient } from '../database/database.schema';

@Controller()
export class PatientsBroker {
  constructor(private readonly database: PatientsDatabase) {}

  @MessagePattern('patients-create')
  async create(createPatientInput: CreatePatientInput): Promise<Patient> {
    return this.database.create(createPatientInput);
  }

  @MessagePattern('patients-update')
  async update(updatePatientInput: UpdatePatientInput): Promise<Patient> {
    return this.database.update(updatePatientInput._id, updatePatientInput);
  }

  @MessagePattern('patients-remove')
  async remove(_id: string) {
    return this.database.remove(_id);
  }
}
