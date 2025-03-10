import React from 'react';
import '../styles/Map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function LiveMap() {
  const position = [51.505, -0.09]; // Example coordinates (latitude, longitude)

  return (
    <div className = "map-section">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={position}>
          <Popup>
            A sample location. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default LiveMap;
