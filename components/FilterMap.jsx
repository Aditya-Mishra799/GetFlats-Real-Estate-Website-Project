"use-client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Circle, MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl: "/loaction-marker.png", 
  iconSize: [28, 41], // Default size
  iconAnchor: [12, 41], // Point to place marker on map
  popupAnchor: [1, -34], // Where popup opens
  shadowSize: [41, 41], // Shadow size
});

const FilterMap = ({ value, setValue }) => {
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const initialValue =
    value.length === 0 ? [19.469642507521538, 72.88930892944337] : value;
  const [coordinates, setCoordinates] = useState(initialValue);
  const eventHandlers = useMemo(
    () => ({
      async drag(e) {
        const marker = markerRef.current;
        if (marker != null) {
          const coords = Object.values(marker.getLatLng());
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
    <div className="w-full h-[62vh]">
      <MapContainer
        center={coordinates}
        zoom={15}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Circle center={coordinates} radius={10000} color='#ff6f61' fillOpacity={0.1} weight={1}>
        <Popup>
            <strong>Search Radius</strong> <br />
            Listings will be shown within the highlighted area.
          </Popup>
        </Circle>
        <Marker
          position={coordinates}
          draggable={true}
          eventHandlers={eventHandlers}
          ref={markerRef}
          icon = {defaultIcon}
        >
         <Popup>
            <strong>Move Me!</strong> <br />
            Drag this marker to change your search location.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default FilterMap;
