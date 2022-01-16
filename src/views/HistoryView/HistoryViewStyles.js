import React from 'react';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center',
    },
    box: {
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    value: {
        color: '#03DAC5',
        fontSize: 19,
    },
    buttonText: {
        padding: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#03DAC5',
    },
    accordionsContainer: {
        width: '85%'
    }
})