import { Injectable } from '@nestjs/common';
import { RequestDTO } from './api.dto';
import axios from 'axios';

@Injectable()
export class ApiService {
  async hello(query: RequestDTO, ip: string) {
    try {
      // Fetch geolocation data
      const geoResponse = await axios.get(`https://get.geojs.io/v1/ip/geo/${ip}.json`);
      const location = geoResponse.data.city;
      const latitude = geoResponse.data.latitude;
      const longitude = geoResponse.data.longitude;

      // Fetch temperature data
      const temperatureResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          hourly: 'temperature_2m',
        },
      });

      const temperatureRaw = temperatureResponse.data;

      const currentHour = new Date().getHours();

      const temperature = temperatureRaw.hourly.temperature_2m[currentHour] 

      // Construct greeting message
      const greeting = `Hello, ${query.visitor_name}, the temperature is ${temperature} degrees Celsius in ${location}`;

      // Return response object
      return {
        client_ip: ip,
        location,
        greeting
      };
    } catch (err) {
      console.error('Error fetching data:', err);
      throw err; // Rethrow the error or handle it according to your application's needs
    }
  }
}
