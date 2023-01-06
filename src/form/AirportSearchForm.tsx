import * as React from 'react';
import { SearchAirports } from '../component/SearchAirports';

interface Props {
}

interface State {
    searchText: string;
    searchResults: any[];
}

class AirportSearchForm extends React.Component<Props, State> {
    state = {
        searchText: '',
        searchResults: []
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchText: event.target.value })
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchResults = await SearchAirports(this.state.searchText);
        this.setState({ searchResults: searchResults['data'] });
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nom de l'aéroport:
                        <input type="text" value={this.state.searchText} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Rechercher" />
                </form>
                <div>
                    {this.state.searchResults === null && <p>La recherche a échoué.</p>}
                    {this.state.searchResults && this.state.searchResults.map((result: any) => (
                        <div key={result.id} className="card">
                            <p>Nom: {result.PlaceName}</p>
                            <p>Code: {result.CityId}</p>
                            <p>Ville: {result.CityName}</p>
                            <p>Pays: {result.CountryName}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AirportSearchForm;
