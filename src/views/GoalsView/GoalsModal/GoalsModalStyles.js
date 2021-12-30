import React from 'react';
import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '85%',
        height: 450,
        backgroundColor: "#252525",
        borderRadius: 20
    },
    titleContainer: {
      marginTop: '1%',
      marginBottom: '10%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold'
    },
    infoGroup: {
      alignItems: 'center',
    },
    info: {
      color: 'white',
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 20
    },
    link: {
        color: '#03DAC5',
        fontSize: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    group1: {
        display: 'flex',
        flexDirection: 'column',
        height: '50%'
    },
    group2: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    }
});