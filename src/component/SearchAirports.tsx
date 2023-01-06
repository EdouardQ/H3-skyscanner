import axios from 'axios';

const API_KEY = process.env.REACT_APP_SKYSCANNER_API_KEY;

export const SearchAirports = async (searchText: string) => {
    try {
        const response = await axios.get('https://skyscanner50.p.rapidapi.com/api/v1/searchAirport', {
            headers: {
                'X-RapidAPI-Key': API_KEY,
                'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
            },
            params: {
                query: searchText
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
