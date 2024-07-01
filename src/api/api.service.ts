import { Injectable } from '@nestjs/common';
import { RequestDTO } from './api.dto';
import axios from 'axios';

@Injectable()
export class ApiService {
  async hello(query: RequestDTO, ip: string){

    const apiResponse = await axios.get(`https://get.geojs.io/v1/ip.json`);

    return {
      client_ip: ip,
      location: apiResponse.data,
      greeting: `Hello ${query.visitor_name}`,
    }
  }
}
