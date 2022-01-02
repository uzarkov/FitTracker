import React, { createContext, useContext, useReducer } from "react";
import { bodyMeasurementsReducer } from "./bodyMeasurementsReducer";

const BodyMeasurementsContext = createContext();

const initialState = {
    bodyMeasurements: {},
    latestBodyMeasurement: {},
    fetching: false,
    adding: false,
    error: null,
}

export const BodyMeasurementsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(bodyMeasurementsReducer, initialState);
    const value = [state, dispatch];
    return <BodyMeasurementsContext.Provider value={value}>{children}</BodyMeasurementsContext.Provider>
}

export const useBodyMeasurements = () => {
    const context = useContext(BodyMeasurementsContext);
    if (context === undefined) {
        throw new Error('useBodyMeasurements() must be used within a BodyMeasurementsProvider');
    }
    return context;
}