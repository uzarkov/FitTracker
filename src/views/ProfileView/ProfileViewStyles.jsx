import React from 'react';
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center'
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
        height: '80%',
        width: '92%',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    group: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    goal: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
})