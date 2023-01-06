import * as React from 'react';
import { SearchAirports } from '../component/SearchAirports';
import {SearchFlights} from "../component/SearchFlights";

interface Props {
}

interface State {
    origin: string;
    destination: string;
    date: string;
    isLoading: boolean;
    flights: any[];
    error: string | null;
}

class FlightSearchForm extends React.Component<Props, State> {
    state = {
        origin: '',
        destination: '',
        date: '',
        isLoading: false,
        flights: [],
        error: null
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name === "origin") {
            this.setState({ origin : event.target.value })
        } else if (event.target.name === "destination") {
            this.setState({ destination : event.target.value })
        } else if (event.target.name === "date") {
            this.setState({ date : event.target.value })
        }
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.setState({isLoading: true});
        const searchResults = await SearchFlights(this.state);
        this.setState({ flights: searchResults['data'].sort((a: any, b: any) => (a.price.amount < b.price.amount) ? -1 : 1)});
        this.setState({isLoading: false});

    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Départ:
                        <input type="text" name="origin" value={this.state.origin} onChange={this.handleChange} />
                    </label>
                    <label>
                        Arrivé:
                        <input type="text" name="destination" value={this.state.destination} onChange={this.handleChange} />
                    </label>
                    <label>
                        Date: <br/>
                        <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Rechercher" />
                </form>
                <div>
                    {this.state.flights === null && <p>La recherche a échoué.</p>}
                    {this.state.flights && this.state.flights.map((result: any) => (
                        <div key={result.id} className="card">
                            <p>Départ: {new Date(result.legs[0].departure).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                            <p>Arrivée: {new Date(result.legs[0].arrival).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</p>
                            <p>Prix: {result.price.amount} €</p>
                            <p>Compagnie: {result.legs[0].carriers[0].name}</p>
                            <p><a href="#">Détails</a></p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default FlightSearchForm;
