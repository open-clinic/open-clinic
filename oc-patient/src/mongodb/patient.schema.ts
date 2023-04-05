import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
@Directive('@key(fields: "_id")')
export class Patient extends Document {
  @Field()
  _id: string;

  @Prop()
  @Field({ description: "Patient Name" })
  name: string;

  @Prop()
  @Field({  description: "Patient Birthdate" })
  birthdate: Date;
  
  @Prop({ unique: true })
  @Field({ description: "Patient Brazilian CPF" })
  cpf: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);