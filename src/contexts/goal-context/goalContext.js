import React, { createContext, useContext, useReducer } from "react";
import { goalReducer } from "./goalReducer";

const GoalContext = createContext();

const initialState = {
    goals: [],
    activeGoal: {},
    fetching: false,
    error: null,
}

export const GoalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(goalReducer, initialState);
    const value = [state, dispatch];
    return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>
}

export const useGoal = () => {
    const context = useContext(GoalContext);
    if (context === undefined) {
        throw new Error('useGoal() must be used within an GoalProvider');
    }
    return context;
}