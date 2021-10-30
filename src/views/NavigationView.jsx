import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Link } from 'react-router-native';
import { DASHBOARD_ROUTE, GOALS_ROUTE, HISTORY_ROUTE, PROFILE_ROUTE, STATS_ROUTE } from '../router/ProtectedContentRouting';

export const NavigationView = () => {
    return (
        <View style={styles.container}>
            <Link to={DASHBOARD_ROUTE}>
                <Text style={styles.text}>{'-> Dashboard'}</Text>
            </Link>
            <Link to={PROFILE_ROUTE}>
                <Text style={styles.text}>{'-> Profile'}</Text>
            </Link>
            <Link to={GOALS_ROUTE}>
                <Text style={styles.text}>{'-> Goals'}</Text>
            </Link>
            <Link to={STATS_ROUTE}>
                <Text style={styles.text}>{'-> Stats'}</Text>
            </Link>
            <Link to={HISTORY_ROUTE}>
                <Text style={styles.text}>{'-> History'}</Text>
            </Link>
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
})