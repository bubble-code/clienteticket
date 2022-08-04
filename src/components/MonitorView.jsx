import React, { useEffect, useState } from "react";
import GoogleMap from 'google-map-react';
import DataService from '../service/service';
import MarkerHall from "./MarkerHall";

const MonitorView = ({ comunidad }) => {
  const [locationList, setLocationList] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });


  const locationComunidad = async (comuni) => {
    const { _lat, _long } = await DataService.getLocationComunidad({ comunidad: comuni });
    setCenter({ lat: _lat, lng: _long });
  }
  const loadingsLocations = async (comuni) => {
    const markers = [];
    const locations = await DataService.getLocationsHall({ comunidad: comuni });
    const faults = await DataService.getHallWithTicketOpen({ comunidad: comuni });
    for (const item in locations) {
      markers.push(
        <MarkerHall
          hall={item} key={item}
          cantFaults={faults[item] ?? 0}
          lat={locations[item]._lat}
          lng={locations[item]._long}
        />);
      // console.log(locations[item]);
    }
    setLocationList(markers);
  }
  useEffect(() => {
    loadingsLocations(comunidad);
    locationComunidad(comunidad);
  }, [comunidad])
  return (
    <div style={{ height: '700px', }}>
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyA_h7luUMWCZZuaYMdPgUkgUXVjQsAwUZc' }}
        center={{ lat: center.lat, lng: center.lng }}
        zoom={10}
        style={{ height: '100%', width: '100%', borderRadius: '10px' }} 
      >
        {locationList.map((place) => place)}
      </GoogleMap>

    </div>
  );
}

export default MonitorView;