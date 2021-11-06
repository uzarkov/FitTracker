import React, { createContext, useContext, useReducer } from "react";
import { userProfileReducer } from "./userProfileReducer";

const UserProfileContext = createContext();

const initialState = {
    userProfile: {},
    fetching: false,
    error: null,
}

export const UserProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userProfileReducer, initialState);
    const value = [state, dispatch];
    return <UserProfileContext.Provider value={value}>{children}</UserProfileContext.Provider>
}

export const useUserProfile = () => {
    const context = useContext(UserProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfile() must be used within an UserProfileProvider');
    }
    return context;
}