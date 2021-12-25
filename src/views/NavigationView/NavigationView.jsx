import React from 'react';
import { Text, View } from "react-native";
import { Link } from 'react-router-native';
import { DASHBOARD_ROUTE, GOALS_ROUTE, HISTORY_ROUTE, PROFILE_ROUTE, STATS_ROUTE } from '../../router/ProtectedContentRouting';
import {styles} from './NavigationViewStyles';

export const NavigationView = () => {

    const links = [
        {name: 'Strona główna', link: DASHBOARD_ROUTE},
        {name: 'Profil', link: PROFILE_ROUTE},
        {name: 'Cele', link: GOALS_ROUTE},
        {name: 'Statystyki', link: STATS_ROUTE},
        {name: 'Historia', link: HISTORY_ROUTE}
    ];

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {links.map((link, i) => {
                    return (
                      <Link to={link.link} key={i}>
                          <Text style={styles.text}>{link.name}</Text>
                      </Link>
                    );
                })}
            </View>
        </View>
    );
}