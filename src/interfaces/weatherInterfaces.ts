export type WeatherConditions = {
  0: 'Clear sky';
  1: 'Mainly clear';
  2: 'Partly cloudy';
  3: 'Overcast';
  45: 'Fog';
  48: 'Depositing rime fog';
  51: 'Light drizzle';
  53: 'Moderate drizzle';
  55: 'Dense drizzle';
  61: 'Slight rain';
  63: 'Moderate rain';
  65: 'Heavy rain';
  71: 'Slight snow';
  73: 'Moderate snow';
  75: 'Heavy snow';
  80: 'Slight rain shower';
  81: 'Moderate rain shower';
  82: 'Violent rain shower';
  95: 'Thunderstorm';
  99: 'Heavy thunderstorm';
};

export interface City {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

export interface Weather {
  date: string;
  condition: string;
  day_of_week: string;
  temperature: { min: number; max: number };
  wind_speed: number;
}


