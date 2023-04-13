import { Module } from '@nestjs/common';
import { PatientsBroker } from './broker.controller';
import { PatientsDatabaseModule } from 'src/database/database.module';

@Module({
  imports: [PatientsDatabaseModule],
  providers: [],
  controllers: [PatientsBroker],
})
export class PatientsBrokerModule {}
