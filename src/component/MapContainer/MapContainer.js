import React from 'react';
// import { GoogleMap, LoadScript} from '@react-google-maps/api';
import {GoogleMap,LoadScript} from '@react-google-maps/api'


const MapContainer = () => {
    const mapStyles = {        
        height: "65vh",
        width: "100%"
    };
          
    const defaultCenter = {
        lat: 23.6850, 
        lng: 90.3563
    }
    return (
        <LoadScript
        googleMapsApiKey='AIzaSyAPlEZ5zCF9zyWEUjCdicu8Dff57T8brLc'>
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={11}
            center={defaultCenter}
        />       
    </LoadScript>
    );
};

export default MapContainer;