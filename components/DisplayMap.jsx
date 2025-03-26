"use-client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";

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
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={mainMarkerCoords}
        //   draggable={true}
        //   eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>Listing Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DisplayMap;
