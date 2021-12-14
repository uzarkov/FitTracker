import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { TopBar } from '../components/TopBar/TopBar';

export const StatsView = () => {
    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <Text style={styles.text}>{'<Stats placeholder>'}</Text>
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