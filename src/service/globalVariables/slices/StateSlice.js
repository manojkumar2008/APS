"use client";

const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    myValue: true, // Global variable
    isForSomeone: false,
    isList: false,
    selectedCard: 1,
    isAmbulance: false,
    userCurrentLocation: { lat: 0, lng: 0 },
    userLocation: true,
    mapCenter: { lat: 0, lng: 0 },
    userDestinationRoute: false,
    userVehicleRoute: false,
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
    },
});

export const {
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
} = stateSlice.actions;
export default stateSlice.reducer;