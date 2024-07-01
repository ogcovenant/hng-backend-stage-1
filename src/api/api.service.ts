import { Injectable } from '@nestjs/common';
import { RequestDTO } from './api.dto';
import axios from 'axios';

@Injectable()
export class ApiService {
  async hello(query: RequestDTO, ip: string){

    const geoData = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json`);

    const latitude = geoData.data.latitude;
    const longitude = geoData.data.longitude; 

    try {
      const temperature = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`)

      return {
        client_ip: ip,
        location: geoData.data.city,
        temperature,
        greeting: `Hello, ${(query.visitor_name).replace('\" || \'', "")}, the temperature is ${temperature.data.hourly[0].temp} degrees Celcius in New York`,
      }
    }catch(err) {
      console.log(err)
    }
  }
}
