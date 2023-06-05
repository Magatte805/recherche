import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import '../style/styleIcon.css';

import markerIconRed from '../img/Map_pin_icon_blue.png';
import markerIconBlue from '../img/Map_pin_icon_red.png';

export default function CustomMarker({ lat, lon, color, num }) {
  const getIcon = () => {
    const iconUrl = color === 'red' ? markerIconRed : markerIconBlue;

    const customIcon = L.icon({
      iconUrl: iconUrl,
      iconAnchor: [15, 19],
      popupAnchor: [0, 0],
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null,
      iconSize: new L.Point(30, 38),
      className: 'leaflet-div-icon',
    });

    return customIcon;
  };

  return (
    <Marker position={[lat, lon]} icon={getIcon()}>
      {num && <Popup>{num}</Popup>}
    </Marker>
  );
}
