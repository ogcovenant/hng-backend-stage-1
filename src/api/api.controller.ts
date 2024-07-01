import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiService } from './api.service';
import { RequestDTO } from './api.dto';
import * as reqIp from 'request-ip'
import { Request } from 'express';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  hello(@Query() query: RequestDTO, @Req() req: Request) {
    const ip = reqIp.getClientIp(req);
    return this.apiService.hello(query, ip);
  }
}
