import axios from 'axios';
import * as React from "react";

const API_KEY = process.env.REACT_APP_SKYSCANNER_API_KEY;

interface Props {
}

interface State {
    flight: any[]
}

class DetailsFlight extends React.Component<Props, State> {
    state = {
        flight: []
    };

    fetchFlight = async () => {
        try {
            const response = await axios.get('https://skyscanner50.p.rapidapi.com/api/v1/getFlightDetails', {
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
                },
                params: {

                }
            });
            this.setState({flight: response.data['data']});
        } catch (error) {
            console.error(error);
        }
    }




    render() {
        return <div></div>;
    }
}


export default DetailsFlight;