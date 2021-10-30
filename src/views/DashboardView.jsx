import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TopBar } from '../components/TopBar';
import { signOut } from '../contexts/auth-context/actions/signOut';
import { useAuth } from '../contexts/auth-context/authContext';

export const DashboardView = () => {
    const [, authDispatch] = useAuth();

    const onSignOut = () => {
        signOut(authDispatch)
    }

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <Text style={styles.text}>{'<Dashboard placeholder>'}</Text>
                <Pressable
                    style={styles.button}
                    onPress={onSignOut}
                >
                    <Text style={styles.text}>Sign out</Text>
                </Pressable>
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
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        minWidth: 100,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        margin: 12,
        height: 50,
        backgroundColor: '#404040',
    },
})