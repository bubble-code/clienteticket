import React, { useEffect, useState } from "react";
import GoogleMap from 'google-map-react';
import DataService from '../service/service';
import MarkerHall from "./MarkerHall";

const MonitorView = () => {
  const [locationList, setLocationList] = useState([]);
  const loadingsLocations = async () => {
    const markers = [];
    const locations = await DataService.getLocationsHall();
    const faults = await DataService.getHallWithTicketOpen();
    for (const item in locations) {
      markers.push(
        <MarkerHall
          hall={item} key={item}
          cantFaults={faults[item] ?? 0}
          lat={locations[item]._lat}
          lng={locations[item]._long}
        />);
      console.log(locations[item]);
    }
    setLocationList(markers);
  }
  useEffect(() => {
    loadingsLocations();
  }, [])
  return (
    <div style={{ width: '1000px', height: '600px' }}>
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyA_h7luUMWCZZuaYMdPgUkgUXVjQsAwUZc' }}
        center={{ lat: 40.387184874298995, lng: -3.7427978611447448 }}
        zoom={11}
      >
        {locationList.map((place) => place)}
      </GoogleMap>

    </div>
  );
}

export default MonitorView;