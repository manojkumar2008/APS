"use client";
import { setDestinationDistance, setDestinationDuration, setMapCenter, setUserCurrentLocation, setVehicleDistance, setVehicleDuration } from '@/service/globalVariables/slices/StateSlice';
import { DirectionsRenderer, DirectionsService, GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};


const googleApi = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;


const Map = () => {

    const libraries = useMemo(() => ["places"], []);
    const dispatch = useDispatch();
    const mapRef = useRef(null);

    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [mapAmbulanceIcon, setMapAmbulanceIcon] = useState(null);
    const [directions1, setDirections1] = useState(null);
    const [directions2, setDirections2] = useState(null);
    const [userDestinationDistance, setUserDestinationDistance] = useState("");
    const [userDestinationDuration, setUserDestinationDuration] = useState("");
    const [userVehicleDistance, setUserVehicleDistance] = useState("");
    const [userVehicleDuration, setUserVehicleDuration] = useState("");

    const isAmbulance = useSelector((state) => state.state.isAmbulance);
    const selectedCard = useSelector((state) => state.state.selectedCard);
    const userCurrentLocation = useSelector((state) => state.state.userCurrentLocation);
    const mapCenter = useSelector((state) => state.state.mapCenter);
    const userDestinationRoute = useSelector((state) => state.state.userDestinationRoute);
    const userVehicleRoute = useSelector((state) => state.state.userVehicleRoute);
    const zoom = useSelector((state) => state.state.zoom);
    // const [routePath1, setRoutePath1] = useState(null);
    // const [routePath2, setRoutePath2] = useState(null);
    const userLocation = useSelector((state) => state.state.userLocation);

    const currentLocation = latitude !== null && longitude !== null
        ? { lat: latitude, lng: longitude }
        : { lat: 20.278385, lng: 85.862898 };

    const alsAmbulanceLocations = [
        { lat: 20.278385, lng: 85.862898 },
        { lat: 20.258295, lng: 85.841306 },
        { lat: 20.269728, lng: 85.823238 },
        { lat: 20.236950, lng: 85.840983 },
        { lat: 20.246081, lng: 85.885852 },
    ];

    const blsAmbulanceLocations = [
        { lat: 20.278385, lng: 85.862898 },
        { lat: 20.258295, lng: 85.841306 },
        { lat: 20.269728, lng: 85.823238 },
        { lat: 20.236950, lng: 85.840983 },
        { lat: 20.246081, lng: 85.885852 },
    ];
    const mvAmbulanceLocations = [
        { lat: 20.278385, lng: 85.862898 },
        { lat: 20.258295, lng: 85.841306 },
        { lat: 20.269728, lng: 85.823238 },
        { lat: 20.236950, lng: 85.840983 },
        { lat: 20.246081, lng: 85.885852 },
    ];
    const destin = useSelector((state) => state.state.destinationLocation);
    const orig = useSelector((state) => state.state.pickupLocation);
    const vehicle = { lat: 20.269728, lng: 85.823238 };

    const [ambulanceType, setAmbulanceType] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: googleApi,
        libraries: libraries,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLongitude(position.coords.longitude);
                    setLatitude(position.coords.latitude);
                    dispatch(setUserCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude }));
                    dispatch(setMapCenter({ lat: position.coords.latitude, lng: position.coords.longitude }));
                }
            )
        }
        if (selectedCard == 1) {
            setTimeout(() => {
                setAmbulanceType(alsAmbulanceLocations);
            }, 500);
        } else if (selectedCard == 2) {
            setTimeout(() => {
                setAmbulanceType(blsAmbulanceLocations);
            }, 500);
        } else {
            setTimeout(() => {
                setAmbulanceType(mvAmbulanceLocations);
            }, 500);
        }
    }, [selectedCard, userCurrentLocation]);

    useEffect(() => {
        if (mapRef.current && mapCenter) {
            mapRef.current.panTo(mapCenter);
        }
    }, [mapCenter]);

    useEffect(() => {
        if (isLoaded) {
            if (selectedCard == 1) {
                setTimeout(() => {
                    setMapAmbulanceIcon({
                        url: "./als-top-view (1) 1.png", // Your custom marker icon
                        scaledSize: new window.google.maps.Size(40, 50), // Width: 50px, Height: 50px
                        anchor: new window.google.maps.Point(25, 25), // Center the icon
                    });
                }, 500); // Delay of 500ms
            }
            if (selectedCard == 2) {
                setTimeout(() => {
                    setMapAmbulanceIcon({
                        url: "./blsAmbulance.png", // Your custom marker icon
                        scaledSize: new window.google.maps.Size(50, 50), // Width: 50px, Height: 50px
                        anchor: new window.google.maps.Point(25, 25), // Center the icon
                    });
                }, 500); // Delay of 500ms
            }
            if (selectedCard == 3) {
                setTimeout(() => {
                    setMapAmbulanceIcon({
                        url: "./map_ambulance.png", // Your custom marker icon
                        scaledSize: new window.google.maps.Size(0, 0), // Width: 50px, Height: 50px
                    });
                }, 500); // Delay of 500ms
            }
        }
    }, [isLoaded, selectedCard]);

    const directionsCallback1 = useCallback((response) => {
        // console.log(response);
        if (response && response.status === "OK") {
            setDirections1((prev) => (JSON.stringify(prev) === JSON.stringify(response) ? prev : response));
            // setRoutePath1(response.routes[0].overview_path);
            const route = response.routes[0];
            const leg = route.legs[0];
            const distance = leg.distance.text; // Distance in human-readable format (e.g., "10 km")
            const duration = leg.duration.text; // Duration in human-readable format (e.g., "2 hours")

            // Update the distance and duration state
            setUserDestinationDistance(distance);
            setUserDestinationDuration(duration);
            dispatch(setDestinationDistance(distance))
            dispatch(setDestinationDuration(duration))
        } else {
            console.error("Directions request 1 failed");
        }
    }, []);

    const directionsCallback2 = useCallback((response) => {
        if (response && response.status === "OK") {
            setDirections2((prev) => (JSON.stringify(prev) === JSON.stringify(response) ? prev : response));
            // setRoutePath2(response.routes[0].overview_path);
            const route = response.routes[0];
            const leg = route.legs[0];
            const distance = leg.distance.text; // Distance in human-readable format (e.g., "10 km")
            const duration = leg.duration.text; // Duration in human-readable format (e.g., "2 hours")

            // Update the distance and duration state
            setUserVehicleDistance(distance);
            setUserVehicleDuration(duration);
            dispatch(setVehicleDistance(distance));
            dispatch(setVehicleDuration(duration));
            
        } else {
            console.error("Directions request 2 failed");
        }
    }, []);

    // console.log(userCurrentLocation);
    const [destinationIcon, setDestinationIcon] = useState(null);
    const [vehicleIcon, setVehicleIcon] = useState(null);

    const isValidLatLng = (obj) => obj && typeof obj.lat === "number" && typeof obj.lng === "number";

    useEffect(() => {
        if (isLoaded) {
            if (selectedCard == 1) {
                setVehicleIcon({
                    url: "./als-top-view (1) 1.png", // Path to your vehicle icon
                    scaledSize: new window.google.maps.Size(40, 50), // Size of the icon
                    anchor: new window.google.maps.Point(20, 20), // Anchor point
                })
            }
            if (selectedCard == 2) {
                setVehicleIcon({
                    url: "./blsAmbulance.png", // Path to your vehicle icon
                    scaledSize: new window.google.maps.Size(40, 50), // Size of the icon
                    anchor: new window.google.maps.Point(20, 20), // Anchor point
                })
            }
            if (selectedCard == 3) {
                setVehicleIcon({
                    url: "./hv-ambulance2.png", // Path to your vehicle icon
                    scaledSize: new window.google.maps.Size(50, 40), // Size of the icon
                    anchor: new window.google.maps.Point(20, 20), // Anchor point
                })
            }
            setDestinationIcon({
                url: "./destinationPin.png", // Path to your destination icon
                scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
            });

        }
    }, [isLoaded, selectedCard]);
    // useEffect(() => {
    //     if (!userDestinationRoute) {
    //         setRoutePath1(null);
    //     }
    // }, [userDestinationRoute]);

    // const destinationIcon = {
    //     url: "./als-top-view (1) 1.png", // Path to your destination icon
    //     scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
    //     anchor: new window.google.maps.Point(20, 20), // Anchor point
    // };

    // const vehicleIcon = {
    //     url: "./als-top-view (1) 1.png", // Path to your vehicle icon
    //     scaledSize: new window.google.maps.Size(40, 40), // Size of the icon
    //     anchor: new window.google.maps.Point(20, 20), // Anchor point
    // };


    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading Maps...</div>;
    return (
        <div className='w-full h-96 sm:w-full md:h-full lg:w-full lg:h-full rounded-lg overflow-hidden  sm:mt-0 lg:mt-0'>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={zoom}
                center={mapCenter}
                options={{
                    mapTypeControl: false,
                    streetViewControl: false,
                    zoomControl: false,
                }}
                onLoad={(map) => { mapRef.current = map; }}
            >
                {userCurrentLocation && (
                    <>
                        {/* <Marker position={userCurrentLocation} title="You are here!" /> */}
                        {/* {destination && <Marker position={destination} title="Destination" />} */}

                        {userCurrentLocation && (
                            <Marker position={userCurrentLocation} title="You are here!" />
                        )}

                        {/* {directions && <DirectionsRenderer directions={directions} />} */}

                        {isAmbulance && (ambulanceType.map((location, index) => (
                            <Marker
                                key={index}
                                position={location}
                                icon={mapAmbulanceIcon}
                            />
                        )))
                        }

                        {userDestinationRoute && <Marker
                            position={destin}
                            icon={destinationIcon}
                            title="Destination"
                        />}

                        {userDestinationRoute && <Marker
                            position={orig}
                            // icon={destinationIcon}
                            title="someone"
                        />}

                        {/* Vehicle Marker with Custom Icon */}
                        {userVehicleRoute && <Marker
                            position={vehicle}
                            icon={vehicleIcon}
                            title="Vehicle"
                        />}
                        {/* First Directions Service */}
                        {
                            isValidLatLng(destin) && isValidLatLng(orig) && (
                                <DirectionsService
                                    options={{
                                        destination: destin,
                                        origin: orig,
                                        travelMode: google.maps.TravelMode.DRIVING,
                                    }}
                                    callback={directionsCallback1}
                                />
                            )
                        }

                        {/* Second Directions Service */}
                        {
                            isValidLatLng(destin) && isValidLatLng(orig) && (
                                <DirectionsService
                                    options={{
                                        destination: vehicle,
                                        origin: orig,
                                        travelMode: google.maps.TravelMode.DRIVING,
                                    }}
                                    callback={directionsCallback2}
                                />
                            )
                        }

                        {/* First Directions Renderer */}
                        {userDestinationRoute && directions1 && (
                            <DirectionsRenderer
                                options={{
                                    directions: directions1,
                                    suppressMarkers: true,
                                }}
                            />
                        )}

                        {/* Second Directions Renderer */}
                        {userVehicleRoute && directions2 && (
                            <DirectionsRenderer
                                options={{
                                    directions: directions2,
                                    suppressMarkers: true,
                                }}
                            />
                        )}

                        {/* Custom Polyline for First Route */}
                        {/* {userDestinationRoute && routePath1 && (
                            <Polyline
                                path={routePath1}
                                options={{
                                    strokeColor: "#054D3F", // Red color for first route
                                    strokeOpacity: 1,
                                    strokeWeight: 5,
                                }}
                            />
                        )} */}
                        {/* Custom Polyline for Second Route */}
                        {/* {userVehicleRoute && routePath2 && (
                            <Polyline
                                path={routePath2}
                                options={{
                                    strokeColor: "#FF0004", // Blue color for second route
                                    strokeOpacity: 1,
                                    strokeWeight: 5,
                                }}
                            />
                        )} */}
                    </>
                )}
            </GoogleMap>
        </div>
    )
}

export default Map
