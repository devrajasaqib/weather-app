import { useState } from 'react';
import axios from 'axios';
import { City } from '../interfaces/weatherInterfaces';

interface UseCitySearch {
    searchCity: (cityName: string) => Promise<City | null>;
    loading: boolean;
    error: string | null;
}

export const useCitySearch = (): UseCitySearch => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchCity = async (cityName: string): Promise<City | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
                params: { name: cityName },
            });

            const city = response.data?.results[0];
            setLoading(false);
            return city || null;
        } catch (err) {
            setLoading(false);
            setError('Error fetching data');
            console.error('Error fetching data:', err);
            return null;
        }
    };

    return { searchCity, loading, error };
};
