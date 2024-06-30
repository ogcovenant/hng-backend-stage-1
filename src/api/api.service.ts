import { Injectable } from '@nestjs/common';
import { RequestDTO } from './api.dto';
import axios from 'axios';

@Injectable()
export class ApiService {
  async hello(query: RequestDTO, ip: string){

    const apiResponse = axios.get(`http://ip-api.com/json/${ip}`);

    return {
      client_ip: ip,
      location: (await apiResponse).data.city,
      greeting: `Hello ${query.visitor_name}`,
    }
  }
}
