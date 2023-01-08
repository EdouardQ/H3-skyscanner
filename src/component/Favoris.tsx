import * as React from "react";

interface Props {
}

interface State {
    fav: any[];
}

class Favoris extends React.Component<Props, State> {
    state = {
        // @ts-ignore
        fav: JSON.parse(localStorage.getItem("fav"))
    };

    handleDetails = (event: React.MouseEvent<HTMLElement>) => {
        const button: HTMLElement = event.currentTarget;
        localStorage.setItem("details", JSON.stringify({
            id: button.getAttribute('data-id'),
            // @ts-ignore
            legs: this.state.fav[button.getAttribute('data-id')]
        }));
    }

    render() {

        return (
            <div>
                <h3>Favoris</h3>
                { Object.keys(this.state.fav).length === 0 && <p>Aucun favoris</p>}
                {this.state.fav !== "" && Object.entries(this.state.fav).map(([key, item]: any[]) => (
                    <div key={key} className="card">
                        <p>Départ: {item.origin}</p>
                        <p>Arrivée: {item.destination}</p>
                        <p>Date: {new Date(item.date).toISOString().split('T')[0]}</p>
                        <p><a href="/details" className="btn-details" onClick={this.handleDetails} data-id={key}>Détails</a> </p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Favoris;
