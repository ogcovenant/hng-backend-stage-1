import { Controller, Get, Query, Ip } from '@nestjs/common';
import { ApiService } from './api.service';
import { RequestDTO } from './api.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('hello')
  hello(@Query() query: RequestDTO, @Ip() ip: string) {
    return this.apiService.hello(query, ip);
  }
}
