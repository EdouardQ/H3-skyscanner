import axios from 'axios';
import * as React from "react";

const API_KEY = process.env.REACT_APP_SKYSCANNER_API_KEY;

interface Props {
}

interface Details {
    id: string;
    legs: string;
}

interface Flight {
    legs: any[];
    pricingOptions: any[];
}

interface State {
    details: Details;
    flight: Flight;
}

class DetailsFlight extends React.Component<Props, State> {
    state = {
        // @ts-ignore
        details: JSON.parse(localStorage.getItem("details")),
        flight: {
            legs: [],
            pricingOptions: []
        }
    };

    fetchFlight = async () => {
        try {
            const response = await axios.get('https://skyscanner50.p.rapidapi.com/api/v1/getFlightDetails', {
                headers: {
                    'X-RapidAPI-Key': API_KEY,
                    'X-RapidAPI-Host': 'skyscanner50.p.rapidapi.com'
                },
                params: {
                    itineraryId: this.state.details.id,
                    legs: JSON.stringify([this.state.details.legs]),
                    currency: 'EUR'
                }
            });

            this.setState({flight: {
                    legs: response.data['data'].legs[0],
                    pricingOptions: response.data['data'].pricingOptions
                }});
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.fetchFlight();
    }

    render() {
        return (
            <div>
                <div className="card">
                    {JSON.stringify(this.state.flight)}
                </div>
            </div>
        );
    }
}


export default DetailsFlight;