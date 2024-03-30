"use-client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";

const FilterMap = ({ value, setValue }) => {
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const initialValue =
    value.length === 0 ? [19.469642507521538, 72.88930892944337] : value;
  const [coordinates, setCoordinates] = useState(initialValue);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const coords = Object.values(marker._latlng);
          setCoordinates(coords);
        }
      },
    }),
    []
  );

  const getUserLocation = async () => {
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCoordinates([position.coords.latitude, position.coords.longitude]);
          mapRef.current.flyTo(
            [position.coords.latitude, position.coords.longitude],
            15,
            { animate: true }
          );
        },
        (error) => {
          console.error("Error white fetching Location", error);
        }
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    setValue(coordinates);
  }, [coordinates]);
  return (
    <div className="w-full h-full">
      <MapContainer
        center={coordinates}
        zoom={15}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={coordinates}
          draggable={true}
          eventHandlers={eventHandlers}
          ref={markerRef}
        >
          <Popup>Listing Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default FilterMap;
