import React from "react";
import GoogleMap from 'google-map-react';

const MonitorView = ({ center, listMarker }) => {

  return (
    <div style={{ height: '700px', }}>
      <GoogleMap
        bootstrapURLKeys={{ key: 'AIzaSyA_h7luUMWCZZuaYMdPgUkgUXVjQsAwUZc' }}
        center={{ lat: center.lat, lng: center.lng }}
        zoom={10}
        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
      >
        {listMarker?.map((place) => place)}
      </GoogleMap>

    </div>
  );
}

export default MonitorView;