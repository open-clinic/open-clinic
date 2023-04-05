import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { Patient } from '../mongodb/patient.schema';
import { CreatePatientInput } from '../dto/create-patient.input';
import { UpdatePatientInput } from '../dto/update-patient.input';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { PatientsDatabase } from '../mongodb/patient.service';

@Resolver(() => Patient)
export class PatientsGraphQL { 
  constructor( @Inject('patients_queue') private client: ClientProxy, private readonly database: PatientsDatabase ) { }
  
  @Mutation(() => Patient)
  async createPatient(@Args('createPatientInput') createPatientInput: CreatePatientInput) {
    this.client.emit('patients-create', createPatientInput);
    return createPatientInput;
  }

  @Mutation(() => Patient)
  async updatePatient(@Args('updatePatientInput') updatePatientInput: UpdatePatientInput) {
    this.client.emit('patients-update', updatePatientInput);
    return updatePatientInput;
  }

  @Mutation(() => Patient)
  async removePatient(@Args('_id') _id: string) {
    this.client.emit('patients-remove', _id);
    return null;
  }
  
  @Query(() => [Patient], { name: 'patients' })
  async findAll() {
    return this.database.findAll();
  }

  @Query(() => Patient, { name: 'patient' })
  async findOne(@Args('_id') _id: string) {
    return this.database.findOne(_id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string, _id: string}): Promise<Patient> {
    return await this.database.findOne(reference._id);
  }
}
