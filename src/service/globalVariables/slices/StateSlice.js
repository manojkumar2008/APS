"use client";

const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    myValue: true, // Global variable
    isForSomeone: false,
    isList: false,
    selectedCard: 1,
    isAmbulance: false,
    userCurrentLocation: { lat: 20.278385, lng: 85.862898 },
    userLocation: true,
    mapCenter: { lat: 20.278385, lng: 85.862898 },
    userDestinationRoute: false,
    userVehicleRoute: false,
    pickupLocation: { lat: 20.278385, lng: 85.862898 },
    destinationLocation: { lat: 20.278385, lng: 85.862898 },
    userDesDistance:"",
    userDesDuration:"",
    uservehDistance:"",
    uservehDuration:"",
    zoom: 12,
};

const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setMyValue: (state, action) => {
            state.myValue = action.payload;
        },
        setIsForSomeone: (state, action) => {
            state.isForSomeone = action.payload;
        },
        setIsList: (state, action) => {
            state.isList = action.payload;
        },
        setSelectedCard: (state, action) => {
            state.selectedCard = action.payload;
        },
        setIsAmbulance: (state, action) => {
            state.isAmbulance = action.payload;
        },
        setUserCurrentLocation: (state, action) => {
            state.userCurrentLocation = action.payload;
        },
        setMapCenter: (state, action) => {  // 🔥 Add mapCenter reducer
            state.mapCenter = action.payload;
        },
        setDestination: (state, action) => {  // 🔥 Add mapCenter reducer
            state.destination = action.payload;
        },
        setUserDestinationRoute: (state, action) => {  // 🔥 Add mapCenter reducer
            state.userDestinationRoute = action.payload;
        },
        setUserVehicleRoute: (state, action) => {  // 🔥 Add mapCenter reducer
            state.userVehicleRoute = action.payload;
        },
        setUserLocation: (state, action) => {  // 🔥 Add mapCenter reducer
            state.userLocation = action.payload;
        },
        setPickupLocation: (state, action) => {  // 🔥 Add mapCenter reducer
            state.pickupLocation = action.payload;
        },
        setDestinationLocation: (state, action) => {  // 🔥 Add mapCenter reducer
            state.destinationLocation = action.payload;
        },
        setDestinationDistance: (state, action) => {  // 🔥 Add mapCenter reducer
            state.userDesDistance = action.payload;
        },
        setDestinationDuration: (state, action) => {  // 🔥 Add mapCenter reducer
            state.userDesDuration = action.payload;
        },
        setVehicleDistance: (state, action) => {  // 🔥 Add mapCenter reducer
            state.uservehDistance = action.payload;
        },
        setVehicleDuration: (state, action) => {  // 🔥 Add mapCenter reducer
            state.uservehDuration = action.payload;
        },
        setZoom: (state, action) => {  // 🔥 Add mapCenter reducer
            state.zoom = action.payload;
        },
    },
});

export const {
    setDestinationDistance,
    setDestinationDuration,
    setVehicleDistance,
    setVehicleDuration,
    setMyValue,
    setIsForSomeone,
    setIsList,
    setSelectedCard,
    setIsAmbulance,
    setUserCurrentLocation,
    setMapCenter,
    setDestination,
    setUserDestinationRoute,
    setUserVehicleRoute,
    setUserLocation,
    setDestinationLocation,
    setPickupLocation,
    setZoom,
} = stateSlice.actions;
export default stateSlice.reducer;