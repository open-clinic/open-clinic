import { Controller, Injectable } from '@nestjs/common';
import { CreatePatientInput } from '../dto/create-patient.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { MessagePattern } from '@nestjs/microservices';
import { PatientsDatabase } from '../mongodb/patient.service';
import { Patient } from '../mongodb/patient.schema';

@Controller()
export class PatientsRabbitMQ {
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

