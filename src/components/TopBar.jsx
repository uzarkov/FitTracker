import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'react-router-native';

export const TopBar = () => {
    return (
        <View style={styles.container}>
            <Link to={'/navigation'} style={styles.link}>
                <Text style={styles.text}>Navigate</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: '#252525',
        height: 36,
    },
    text: {
        color: 'white',
        fontSize: 16,
        padding: 8,
    },
    link: {
        width: 80,
    }
})