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
    onLoad: boolean;
}

class DetailsFlight extends React.Component<Props, State> {
    state = {
        // @ts-ignore
        details: JSON.parse(localStorage.getItem("details")),
        flight: {
            legs: [],
            pricingOptions: []
        },
        onLoad: true
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
            this.setState({onLoad: false})
        } catch (error) {
            console.error(error);
        }
    }

    addToFav = () => {
        // @ts-ignore
        let fav: any = JSON.parse(localStorage.getItem("fav"));
        fav[this.state.details.id] = this.state.details.legs;
        localStorage.setItem("fav", JSON.stringify(fav));
    }

    componentDidMount() {
        this.fetchFlight();
    }

    render() {
        return (
            <div>
                <h2>
                    Détails du vol
                </h2>
                <p className="addToFav"><button className="btn-details" onClick={this.addToFav}>Ajouter aux favoris</button></p>
                <div>
                    {this.state.onLoad && <p>Chargement en cours</p>}
                    {!this.state.onLoad && this.state.flight.pricingOptions.map((result: any) => (
                        <div key={result.id} className="card">
                           <p>Prix: {result.totalPrice} €</p>
                            <p>Nom: {result.agents[0].name}</p>
                            {result.agents[0].segments.map((segment: any) => (
                                <div key={segment.id}>
                                    <p>Numéro du vol: {segment.flightNumber}</p>
                                    <p>De: {segment.origin.name} - {segment.origin.displayCode} - {segment.origin.city}</p>
                                    <p>Départ le: {new Date(segment.departure).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                                    <p>À: {segment.destination.name} - {segment.destination.displayCode} - {segment.destination.city}</p>
                                    <p>Arrivé le: {new Date(segment.arrival).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                                    <p>Durée du vol: {segment.duration} mins</p>
                                </div>
                            ))}
                            <p>Note: {result.agents[0].rating.value}/5 ({result.agents[0].rating.count} votes)</p>
                            <p>URL: <a href={result.agents[0].url} target="_blank" rel="noreferrer">lien</a></p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default DetailsFlight;
