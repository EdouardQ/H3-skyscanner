import axios from 'axios';

const API_KEY = process.env.REACT_APP_SKYSCANNER_API_KEY;

export const SearchFlights = async (data: { date: string; isLoading: boolean; origin: string; destination: string; flights: any[]; error: null }) => {
    try {
        const response = await axios.get('https://skyscanner50.p.rapidapi.com/api/v1/searchFlights', {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
            },
            params: {
                origin: data.origin,
                destination: data.destination,
                date: data.date,
                currency: 'EUR'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
