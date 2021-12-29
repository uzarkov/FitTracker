import React from 'react';
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center',
    },
    box: {
        backgroundColor: '#383838',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginTop: '10%',
        borderRadius: 10,
        height: '87%',
        width: '92%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20
    },
    title: {
        fontSize: 25,
        color: '#fff',
        marginBottom: '10%'
    },
    weightGroup: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginBottom: '1%',
    },
    link: {
        color: '#03DAC5',
        fontSize: 20,
        textAlign: 'center',
    },
})