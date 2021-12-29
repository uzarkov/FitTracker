import React from 'react';
import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    inputAndroid: {
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 14,
        borderColor: '#03DAC5',
        fontSize: 20,
        color: 'white',
        textAlign: 'auto',
        paddingHorizontal: 15,
    },
    button: {
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#03DAC5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconButton: {
        backgroundColor: 'transparent',
        borderWidth: 0
    }
})