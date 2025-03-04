import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./slices/StateSlice";


export const store = configureStore({
    reducer: {
        state: stateReducer,
    },
});