import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AirportSearchForm from "./form/AirportSearchForm";
import FlightSearchForm from "./form/FlightSearchForm";
import DetailsFlight from "./component/DetailsFlight";
import Favoris from "./component/Favoris";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}>
              <Route index element={<FlightSearchForm />} />
              <Route path="/airports" element={<AirportSearchForm />} />
              <Route path="/details" element={<DetailsFlight />} />
              <Route path="/fav" element={<Favoris />} />
          </Route>
      </Routes>
  </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
