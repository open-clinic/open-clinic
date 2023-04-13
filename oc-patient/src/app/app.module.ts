import { Module } from '@nestjs/common';
import { PatientsDatabaseModule } from '../database/database.module';
import { PatientsHealthModule } from '../health/health.module';
import { PatientsApiModule } from 'src/api/api.module';

@Module({
  imports: [PatientsApiModule, PatientsDatabaseModule, PatientsHealthModule],
})
export class PatientsAppModule {}
