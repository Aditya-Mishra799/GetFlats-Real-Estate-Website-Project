"use client";
import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useMapEvents } from "react-leaflet";
import FetchAndDisplayCards from "@components/FetchAndDisplayCards";
import PropertyListingsCard from "@components/PropertyLisingsCard";
import { IoCloseSharp } from "react-icons/io5";
import Button from "@components/Button";
import { FaLocationCrosshairs } from "react-icons/fa6";

const MapInteractionHandler = ({ handleMapMove, loadMarkers }) => {
  const map = useMapEvents({
    click: (e) => {
      console.log(map);
    },
    moveend: (e) => {
      console.log("Moved map...");
      handleMapMove(map);
    },
  });
  useEffect(() => {
    if (window) {
      console.log("Loaded initial markers....");
      loadMarkers(map.getBounds());
    }
  }, [window]);
  return null;
};

const MapSearchPage = () => {
  const mapRef = useRef();
  const initalMarkersSet = new Set();
  const [markers, setMarkes] = useState(initalMarkersSet);
  const [current, setCurrent] = useState(null);
  const [userLocation, setUserLocation] = useState([19.4714447, 72.8868084]);
  const handleMapMove = (map) => {
    const bounds = map.getBounds();
    loadMarkers(bounds);
  };

  const extendMArkers = (values) => {
    const stringValues = values.map((value) => value.toString());
    const updatedMarkers = new Set([...markers, ...stringValues]);
    setMarkes(updatedMarkers);
    console.log(updatedMarkers);
  };

  const getCoordsFromString = (coordsString) => {
    return coordsString.split(",").map(Number);
  };
  const loadMarkers = async (bounds) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const expandedBounds = bounds.pad(0.5);
    const neExpanded = expandedBounds.getNorthEast();
    const swExpanded = expandedBounds.getSouthWest();
    try {
      //fetch the markers in the current area
      const response = await fetch(
        `api/listing/fetch-in-bounds?minLat=${swExpanded.lat}&minLng=${swExpanded.lng}&maxLat=${neExpanded.lat}&maxLng=${neExpanded.lng}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data, "Data loaded successfully");
      extendMArkers(data);
    } catch (error) {
      console.log(error);
    }
  };
  const housingIcon = new Icon({
    iconUrl: "https://img.icons8.com/plasticine/100/exterior.png",
    iconSize: [38, 45], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  });

  const getApiEndPoint = () => {
    const coords = getCoordsFromString(current);
    const url = `api/listing/fetch-coords?lat=${coords[0]}&lng=${coords[1]}&radius=0`;
    return url;
  };

  //get user location 
  const updateAndGetLocation = async () =>{
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
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
    <div className="w-[95vw]   h-[85vh] ">
      <h3 className="text-2xl mx-3 my-2">Search listings via map</h3>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="w-full mx-2 my-3 h-full relative">
          <MapContainer
            center={userLocation}
            zoom={15}
            scrollWheelZoom={true}
            ref={mapRef}
          >
            <MapInteractionHandler
              handleMapMove={handleMapMove}
              loadMarkers={loadMarkers}
            />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {Array.from(markers).map((coords, index) => (
              <Marker
                key={index}
                position={getCoordsFromString(coords)}
                icon={housingIcon} // Use the selected icon
                eventHandlers={{ click: () => setCurrent(coords) }}
              ></Marker>
            ))}
            <Marker position={userLocation}>
              <Popup>Your location</Popup>
            </Marker>
          </MapContainer>

          {current && (
            <div className="w-full  absolute bottom-2 z-10">
              <div className="w-[90vw] min-h-80 max-h-96 bg-black   bg-opacity-50 rounded-md  mx-auto px-4 py-2  overflow-x-scroll hidden-scrollbar relative">
                <button
                  className="absolute top-3 right-3 text-white "
                  onClick={() => setCurrent(null)}
                >
                  <IoCloseSharp size={40} /> 
                </button>
                <FetchAndDisplayCards
                  apiEndpoint={getApiEndPoint()}
                  CardComponet={PropertyListingsCard}
                />
              </div>
            </div>
          )}
          <Button
          onClick={updateAndGetLocation}
          className="absolute flex justify-center gap-2 bottom-8 right-8 p-4 rounded-lg shadow-lg"
        >
          <FaLocationCrosshairs  className="lg:w-[35px] lg:h-[35px] h-[30px] w-[30px]"/>
        </Button>
        </div>
      </div>
    </div>
  );
};

export default MapSearchPage;
