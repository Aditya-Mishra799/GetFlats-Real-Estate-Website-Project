"use-client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const defaultIcon =  new Icon({
  iconUrl: "/loaction-marker.png",
  iconSize: [28, 28], // size of the icon
  iconAnchor: [14, 28], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -28], // point from which the popup should open relative to the iconAnchor
});

const DisplayMap = ({mainMarkerCoords, locationMarkerCoords , markers = []}) => {
    const markerRef = useRef(null);
    const mapRef = useRef(null);
  return (
    <div className="w-full  h-[62vh]">
      <MapContainer
        center={mainMarkerCoords}
        zoom={15}
        scrollWheelZoom={true}
        ref={mapRef}
        icon = {defaultIcon}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={mainMarkerCoords}
        //   draggable={true}
        //   eventHandlers={eventHandlers}
          ref={markerRef}
          icon = {defaultIcon}
        >
          <Popup>Listing Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DisplayMap;
