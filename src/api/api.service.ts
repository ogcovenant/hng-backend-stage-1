import { Injectable } from '@nestjs/common';
import { RequestDTO } from './api.dto';
import axios from 'axios';
import { fetchWeatherApi } from 'openmeteo';

@Injectable()
export class ApiService {
  async hello(query: RequestDTO, ip: string){

    const geoData = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json`);

    const latitude = geoData.data.latitude;
    const longitude = geoData.data.longitude; 

    const temperature = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
      latitude,
      longitude,
      hourly: "temperature_2m"
    })

    return {
      client_ip: ip,
      location: geoData.data.city,
      temperature,
      greeting: `Hello, ${(query.visitor_name).replace('\" || \'', "")}, the temperature is ${temperature} degrees Celcius in New York`,
    }
  }
}
