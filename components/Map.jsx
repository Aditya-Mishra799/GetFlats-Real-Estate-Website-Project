import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import { useMapEvents, useMap } from "react-leaflet";
import useGetUserLocation from "@hooks/useGetUserLocation";
import Button from "./Button";

const Map = () => {
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const [userLocation, updateAndGetLocation, setUserLocation] =
    useGetUserLocation();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const coords = Object.values(marker._latlng)
          // const {lat, lang} = marker._latlng
          setUserLocation(coords);
        }
      },
    }),
    []
  );

  return (
    <div className="w-96 h-full flex flex-col gap-3 items-center">
      {userLocation && (
        <div className="flex flex-col space-y-2">
        <span>Latitude: {userLocation[0]}</span>
        <span>Longitude: {userLocation[1]}</span>
      </div>
      )}
      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={15}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={userLocation}
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
          >
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      )}
      <Button onClick={() => updateAndGetLocation(mapRef)}>Locate Me</Button>
    </div>
  );
};

export default Map;
