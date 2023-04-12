import { Module } from '@nestjs/common';
import { PatientsDatabaseModule } from '../database/database.module';
import { PatientsHealthModule } from '../health/health.module';
import { PatientsBrokerModule } from '../broker/broker.module';

@Module({
  imports: [PatientsBrokerModule, PatientsDatabaseModule, PatientsHealthModule],
})
export class PatientsAppModule {}
