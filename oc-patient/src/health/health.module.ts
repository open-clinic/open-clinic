import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PatientsHealth } from './health.controller';
import { PatientsDatabaseModule } from 'src/database/database.module';

@Module({
  imports: [TerminusModule, PatientsDatabaseModule],
  providers: [],
  controllers: [PatientsHealth],
})
export class PatientsHealthModule {}
