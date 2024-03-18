'use-client'
import React, {useState, useEffect} from 'react'
//clean
const useGetUserLocation = (initialValue) => {
    const [userLocation, setUserLocation] = useState(initialValue);
    const updateAndGetLocation = (mapRef)=>{
      if (typeof window !== "undefined") {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation([position.coords.latitude, position.coords.longitude]);
            mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 15, {animate: true})
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );}
    }
    return [userLocation, updateAndGetLocation, setUserLocation]
}

export default useGetUserLocation
