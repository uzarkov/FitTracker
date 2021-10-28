import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../contexts/auth-context/authContext';

export const SignInView = () => {
    const [authState, authDispatch] = useAuth();
    const { fetching, error } = authState;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World!</Text>
            <StatusBar style="auto" />
        </View>
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
});