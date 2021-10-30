import React from 'react';
import { ProtectedContentRouting } from './ProtectedContentRouting';
import { PublicContentRouting } from './PublicContentRouting';
import { NativeRouter } from 'react-router-native';
import { useAuth } from '../contexts/auth-context/authContext';

export const ApplicationRouter = () => {
    const [authState] = useAuth();
    const { user } = authState;

    const signedIn = user.email !== undefined;

    return (
        <NativeRouter>
            {signedIn ? <ProtectedContentRouting /> : <PublicContentRouting />}
        </NativeRouter>
    )
}