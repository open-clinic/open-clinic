import { Injectable } from '@nestjs/common';
import { CreatePatientInput } from '../api/dto/create-patient.input';
import { UpdatePatientInput } from '../api/dto/update-patient.input';
import { Patient } from './database.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PatientsDatabase {
  constructor(@InjectModel(Patient.name) private database: Model<Patient>) {}

  async create(createPatientInput: CreatePatientInput): Promise<Patient> {
    return new this.database(createPatientInput).save();
  }

  async findAll(): Promise<Patient[]> {
    return this.database.find().exec();
  }

  async findOne(_id: string): Promise<Patient> {
    return this.database.findOne((patient) => patient._id === _id).exec();
  }

  async update(_id: string, updatePatientInput: UpdatePatientInput) {
    return this.database
      .findOneAndUpdate((patient) => patient._id === _id, updatePatientInput)
      .exec();
  }

  async remove(_id: string) {
    return this.database
      .findOneAndRemove((patient) => patient._id === _id)
      .exec();
  }
}
