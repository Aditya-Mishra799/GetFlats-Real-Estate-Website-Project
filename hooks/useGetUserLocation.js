'use-client'
import React, {useState, useEffect} from 'react'
//clean
const useGetUserLocation = () => {
    const [userLocation, setUserLocation] = useState([19.076,72.8777]);
    
    useEffect(() => {
      if (typeof window === "undefined") return
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }, []);
    const updateAndGetLocation = (mapRef)=>{
      if (typeof window === "undefined") return
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("User location:", position.coords);
            setUserLocation([position.coords.latitude, position.coords.longitude]);
            mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 15, {animate: true})
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
    }
    return [userLocation, updateAndGetLocation, setUserLocation]
}

export default useGetUserLocation
