import { Module } from '@nestjs/common';
import { PatientsHealth } from './health.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [PatientsHealth],
})
export class PatientsHealthModule {}
