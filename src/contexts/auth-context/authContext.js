import React, { createContext, useContext, useReducer } from "react";
import { authReducer } from "./authReducer";

const AuthContext = createContext();

const initialState = {
    user: {},
    fetching: false,
    error: null,
    signingUp: false,
    signingUpError: null,
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const value = [state, dispatch];
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth() must be used within an AuthProvider');
    }
    return context;
}