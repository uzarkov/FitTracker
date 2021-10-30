import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import { Link } from 'react-router-native';
import { SIGN_IN_ROUTE } from '../router/PublicContentRouting';

export const SignUpView = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{'<SignUp placeholder>'}</Text>
            <Link to={SIGN_IN_ROUTE}>
                <Text style={styles.text}>Sign in</Text>
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