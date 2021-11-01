import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TopBar } from '../components/TopBar';
import { useAuth } from '../contexts/auth-context/authContext';
import { fetchUserProfile } from '../contexts/user-profile-context/actions/fetchUserProfile';
import { useUserProfile } from '../contexts/user-profile-context/userProfileContext';

export const ProfileView = () => {
    const [userState] = useAuth();
    const { user } = userState;

    const [userProfileState, userProfileDispatch] = useUserProfile();
    const { userProfile, fetching, error } = userProfileState;

    useEffect(() => {
        fetchUserProfile(userProfileDispatch, user);
    }, [])

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <Text style={styles.text}>{`Name: ${userProfile.name} ${userProfile.surname}`}</Text>
                <Text style={styles.text}>{`Birthdate: ${userProfile.birthDate}`}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
})