"use-client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker, Popup } from "react-leaflet";
import Button from "./Button";
import formatAddress from "@common_functions/formatAddress";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl: "/loaction-marker.png", 
  iconSize: [28, 41], // Default size
  iconAnchor: [12, 41], // Point to place marker on map
  popupAnchor: [1, -34], // Where popup opens
  shadowSize: [41, 41], // Shadow size
});

//function to fetch Adrdress based on  coords
const reverseGeoCodeURL = "https://nominatim.openstreetmap.org/reverse";
const fetchAddress = async (
  locationCoords = [],
  saveAddress
) => {
  if (locationCoords == null) return;
  const requestData = {
    lat: locationCoords[0],
    lon: locationCoords[1],
    format: "json",
  };

 let url = reverseGeoCodeURL + "?" + new URLSearchParams(requestData);
  try {
    const response = await fetch(url);
    const result = await response.json();
    saveAddress(locationCoords, result?.address);
  } catch (error) {
    console.error(error);
  }
};
const Map = ({ label, onChange, name, errors, getValues, ...rest }) => {
  const value = getValues(name);
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const saveAddress = (coordinates, address) => {
    onChange({ coordinates: coordinates, address: address });
  };
  const [userLocation, setUserLocation] = useState(value?.coordinates);
  const eventHandlers = useMemo(
    () => ({
      async dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const coords = Object.values(marker._latlng);
          setUserLocation(coords);
          await fetchAddress(coords, saveAddress)
        }
      },
    }),
    []
  );
  const updateAndGetLocation = async () =>{
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          await fetchAddress([position.coords.latitude, position.coords.longitude], saveAddress);
          mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 15, {animate: true})
        },
        (error) => {
          console.error("Error white fetching Location", error)
        }
      );
    }
    
  }
  useEffect(() => {
    updateAndGetLocation();
  }, []);
 
  return (
    <div className="w-full h-full  px-1 py-1 space-y-2" key={name}>
      <div className=" space-y-3">
        {userLocation && (
          <div className="w-full h-64">
            <MapContainer
              center={userLocation}
              zoom={13}
              scrollWheelZoom={true}
              ref={mapRef}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={userLocation}
                draggable={true}
                eventHandlers={eventHandlers}
                ref={markerRef}
                icon = {defaultIcon}
              >
                <Popup>Your Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
        <Button
          onClick={updateAndGetLocation}
          className="flex justify-center gap-2"
        >
          Locate Me <FaLocationCrosshairs />
        </Button>
      </div>
      {value?.address && Object.keys(value.address).length > 0 && (
        <div className="flex flex-col m-1 gap-1 flex-wrap bg-highlight-orange px-2 py-1 rounded-md">
          <label className="font-semibold text-lg">Your Address</label>
          <p>{formatAddress(value.address)}</p>
        </div>
      )}
      {errors[name] && (
        <p className="text-red-500 text-xs italic">
          {errors[name]?.coordinates.message}
        </p>
      )}
    </div>
  );
};

export default Map;
