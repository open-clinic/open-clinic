import { Controller, Get } from '@nestjs/common';

@Controller()
export class PatientsHealth {
  @Get('/health')
  getHealth() {
    return { status: 'OK' };
  }
}
