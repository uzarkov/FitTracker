import React from 'react';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#353535',
    },
    boxes: {
        alignItems: 'center',
        height: '87%'
    },
    balanceContainer: {
        justifyContent: 'space-around',
        flex: 1.1,
        alignItems: 'center'
    },
    progressContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    foodContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1.4
    },
    activityContainer: {
        flex: 0.7,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    caloriesContainer: {
        alignItems: 'center'
    },
    chartContainer: {
      height: '50%',
      width: '100%',
        marginBottom: 5
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    value: {
        color: '#03DAC5',
        fontSize: 30,
        textAlign: 'center'
    },
    loading: {
        color: '#03DAC5',
        fontSize: 100,
        textAlign: 'center'
    },
    lineItem: {
      fontSize: 20,
        color: '#03DAC5',
        fontWeight: 'bold'
    },
    link: {
        color: '#03DAC5',
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        minWidth: 100,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        margin: 12,
        height: 50,
        backgroundColor: '#404040',
    },

})