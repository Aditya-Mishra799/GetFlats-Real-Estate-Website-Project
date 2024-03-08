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
import formatAddress from "@common_functions/formatAddress";
import { FaLocationCrosshairs } from "react-icons/fa6";
//function to fetch Adrdress based on  coords
const fetchAddress = async (
  reverseGeoCodeURL,
  locationCoords = [],
  setAddress
) => {
  if (locationCoords == null) return;
  const coordinates =
    locationCoords.length === 2
      ? {
          lat: locationCoords[0],
          lon: locationCoords[1],
        }
      : {
          lat: 19.076,
          lon: 72.8777,
        };
  const requestData = {
    ...coordinates,
    format: "json",
  };

  reverseGeoCodeURL += "?" + new URLSearchParams(requestData);
  try {
    console.log(reverseGeoCodeURL);
    const response = await fetch(reverseGeoCodeURL);
    const result = await response.json();
    setAddress(result?.address);
    console.log("address", formatAddress(result?.address));
  } catch (error) {
    console.error(error);
  }
};
const Map = () => {
  const markerRef = useRef(null);
  const mapRef = useRef(null);
  const [address, setAddress] = useState(null);
  const reverseGeoCodeURL = "https://nominatim.openstreetmap.org/reverse";
  const [userLocation, updateAndGetLocation, setUserLocation] =
    useGetUserLocation();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const coords = Object.values(marker._latlng);
          setUserLocation(coords);
        }
      },
    }),
    []
  );

  useEffect(() => {
    fetchAddress(reverseGeoCodeURL, userLocation, setAddress);
  }, [userLocation]);

  return (
    <div className="w-full h-full  px-2 py-1 space-y-2">
      <div className=" space-y-3">
        {userLocation && (
          <div className="w-full h-64">
            <MapContainer
              center={userLocation}
              zoom={13}
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
          </div>
        )}
        <Button onClick={() => updateAndGetLocation(mapRef)} className = 'flex justify-center gap-2'>
          Locate Me <FaLocationCrosshairs />
        </Button>
      </div>
      {address && (
        <div className="flex flex-col m-1 gap-1 flex-wrap bg-slate-200 px-2 py-1 rounded-md">
          <label className="font-semibold text-lg">Your Address</label>
          <p>{formatAddress(address)}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
