import React from 'react';
import "./Map.css";
import {MapContainer as LeaftMap, TileLayer} from "react-leaflet";
import { showDataOnMap } from './utill';

function Map({ countries,casesType, center, zoom }) {
    const state = {
        keyMAP: Math.random(),
     };
    return (
        <div className="map"> 
            <LeaftMap key={state.keyMAP} center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}
            </LeaftMap>
        </div>
    )
}

export default Map





















