import React from 'react';
import {View, Text, Pressable} from 'react-native';
import { Link } from 'react-router-native';
import {DASHBOARD_ROUTE, NAVIGATION_ROUTE} from '../../router/ProtectedContentRouting';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {styles} from './TopBarStyles';
import {signOut} from "../../contexts/auth-context/actions/signOut";
import {useAuth} from "../../contexts/auth-context/authContext";

export const TopBar = () => {

    const [, authDispatch] = useAuth();

    const onSignOut = () => {
        signOut(authDispatch)
    }

    return (
        <View style={styles.container}>
            <Link to={NAVIGATION_ROUTE}>
                <MaterialIcons
                    name={"menu"}
                    color={"#FFFFFF"}
                    size={30}
                />
            </Link>
            <Link to={DASHBOARD_ROUTE}>
                <Text style={styles.title}>FitTracker</Text>
            </Link>
            <Pressable onPress={() => onSignOut()}>
                <MaterialIcons
                    name={"logout"}
                    color={"#FFFFFF"}
                    size={30}
                />
            </Pressable>
        </View>
    )
}