import { Controller, Get } from '@nestjs/common';

@Controller()
export class GatewayHealth {
  @Get('/health')
  getHealth() {
    return { status: 'OK' };
  }
}
