import React from 'react';
import { Text, View } from "react-native";
import { Link } from 'react-router-native';
import { PROTECTED_ROUTES } from '../../router/constants';
import { styles } from './NavigationViewStyles';

export const NavigationView = () => {

    const links = [
        { name: 'Strona główna', link: PROTECTED_ROUTES.DASHBOARD_ROUTE },
        { name: 'Profil', link: PROTECTED_ROUTES.PROFILE_ROUTE },
        { name: 'Cele', link: PROTECTED_ROUTES.GOALS_ROUTE },
        { name: 'Historia', link: PROTECTED_ROUTES.HISTORY_ROUTE }
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