import React, {useState, useEffect} from 'react'

const useGetUserLocation = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [address, setAddress] = useState("");
    
    useEffect(() => {
      const geoOptions = {
          enableHighAccuracy: true, // Request higher accuracy
          timeout: 5000, // Timeout after 5 seconds
        };
      // Use navigator.geolocation to get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }, geoOptions
      );
    }, []);
    const updateAndGetLocation = (mapRef)=>{
        const geoOptions = {
            enableHighAccuracy: true, // Request higher accuracy
            timeout: 5000, // Timeout after 5 seconds
          };
        // Use navigator.geolocation to get user's location
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("User location:", position.coords);
            setUserLocation([position.coords.latitude, position.coords.longitude]);
            mapRef.current.flyTo([position.coords.latitude, position.coords.longitude], 15, {animate: true})
          },
          (error) => {
            console.error("Error getting user location:", error);
          }, geoOptions
        );
    }
    return [userLocation, updateAndGetLocation, setUserLocation]
}

export default useGetUserLocation
