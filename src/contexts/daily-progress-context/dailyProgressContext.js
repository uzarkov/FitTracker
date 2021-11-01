import React, { createContext, useContext, useReducer } from "react";
import { dailyProgressReducer } from "./dailyProgressReducer";

const DailyProgressContext = createContext();

const initialState = {
    days: {},
    fetching: false,
    error: null,
}

export const DailyProgressProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dailyProgressReducer, initialState);
    const value = [state, dispatch];
    return <DailyProgressContext.Provider value={value}>{children}</DailyProgressContext.Provider>
}

export const useDailyProgress = () => {
    const context = useContext(DailyProgressContext);
    if (context === undefined) {
        throw new Error('useDailyProgress() must be used within a DailyProgressProvider');
    }
    return context;
}