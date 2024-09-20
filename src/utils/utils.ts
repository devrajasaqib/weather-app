import { WeatherConditions } from "../interfaces/weatherInterfaces";

export function formatDate(dateStr: string | number | Date) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'long' });

    return `${day} ${month}`;
}

export const getWeatherCondition = (code: string | number) => {
    const weatherConditions: WeatherConditions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Fog',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        80: 'Slight rain shower',
        81: 'Moderate rain shower',
        82: 'Violent rain shower',
        95: 'Thunderstorm',
        99: 'Heavy thunderstorm'
    };
    const normalizedCode = typeof code === 'string' ? parseInt(code, 10) : code;

    return weatherConditions[normalizedCode as keyof WeatherConditions] || 'Unknown';
}