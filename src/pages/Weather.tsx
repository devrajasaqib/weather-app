import { Button, Input, Space } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import DailyWeather from '../components/DailyWeather';
import { getWeatherCondition } from '../utils/utils';
import { useCitySearch } from '../hooks/useCitySearch';
import { City } from '../interfaces/weatherInterfaces';


const Weather: React.FC = () => {

    const [cityName, setCityName] = useState<string>("");
    const [weather, setWeather] = useState<any[]>([]);
    const { searchCity, loading } = useCitySearch();
    const [error, setError] = useState("")


    const handleChange = (e: { target: { value: string }; }) => {
        const { value } = e.target
        setCityName(value);
    };

    const searchCityHanlder = async () => {
        const city = await searchCity(cityName);
        if (city) {
            dailyWeatherHandler(city)
            console.log('City found:', city);
        } else {
            setWeather([])
            setError('City not found')
            console.log('City not found');
        }
    };


    const dailyWeatherHandler = async (city: City) => {
        const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: city?.latitude,
                longitude: city?.longitude,
                daily: ['temperature_2m_max', 'temperature_2m_min', 'windspeed_10m_max', 'weathercode'],
                timezone: 'auto'
            }
        });

        const weatherData = response.data.daily;
        const formattedData = weatherData.time.map((date: string, index: number) => {
            const weatherCondition = getWeatherCondition(weatherData.weathercode[index]);
            return {
                date,
                day_of_week: new Date(date).toLocaleDateString('en-US', { weekday: 'long' }),
                condition: weatherCondition,
                temperature: {
                    max: weatherData.temperature_2m_max[index],
                    min: weatherData.temperature_2m_min[index]
                },
                wind_speed: weatherData.windspeed_10m_max[index]
            };
        });
        const firstFive = formattedData.slice(0, 5);
        setWeather(firstFive)
    }


    return (
        <div className="container">
            <div className='sub-container' style={{ marginBottom: 30 }}>
                <h3>{"Discover the Weather, Wherever You Go!"} </h3>
                <Space style={{ width: '100%' }} direction="vertical">
                    <Input placeholder="enter city name" onChange={handleChange} size="large" />
                </Space>
                <Button
                    type="primary"
                    loading={loading}
                    onClick={searchCityHanlder}
                    style={{ padding: '0 50px', marginTop: 20 }}
                >
                    {"Search"}
                </Button>
            </div>
            {weather?.length ? <DailyWeather weather={weather} /> : <h4>{error}</h4>}
        </div>
    );
};

export default Weather;
