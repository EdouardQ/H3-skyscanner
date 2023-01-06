import React from 'react';
import './App.css';
import { Menu } from "./component/Menu";
import { Outlet } from "react-router-dom";

const App = () => (
    <div className="App">
        <Menu items={[
            { label: "Recherche de vols", to: '/' },
            { label: "Recherche d'aéroports", to: '/airports' },
            { label: "Favoris", to: "/fav" }
        ]} />
        <Outlet />
    </div>
);

export default App;
