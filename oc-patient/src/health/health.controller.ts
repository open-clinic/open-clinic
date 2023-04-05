import { Controller, Get } from '@nestjs/common';

@Controller()
export class PatientHealth {
  @Get('/health')
  getHealth() {
    return { status: 'OK' };
  }
}
