import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../contexts/auth-context/authContext';
import { signIn } from '../contexts/auth-context/actions/signIn';
import { DashboardView } from './DashboardView';

export const SignInView = () => {
    const [authState, authDispatch] = useAuth();
    const { user, fetching, error } = authState;

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const onSignIn = () => {
        signIn(authDispatch, {
            email: emailInput,
            password: passwordInput,
        })
        setEmailInput('');
        setPasswordInput('');
    }

    if (user.email !== undefined) {
        return <DashboardView />
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setEmailInput}
                value={emailInput}
                placeholder={'email'}
                placeholderTextColor={'grey'}
                keyboardType={'email-address'}
            />
            <TextInput
                style={styles.input}
                onChangeText={setPasswordInput}
                value={passwordInput}
                placeholder={'password'}
                placeholderTextColor={'grey'}
                secureTextEntry={true}
            />
            <Pressable
                style={styles.button}
                onPress={onSignIn}
            >
                <Text style={styles.text}>Sign in</Text>
            </Pressable>
            <StatusBar style="auto" />
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
    input: {
        margin: 12,
        height: 40,
        width: '60%',
        minWidth: 200,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        backgroundColor: '#404040',
        color: 'white',
        fontSize: 16,
        padding: 8,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        minWidth: 100,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        margin: 12,
        height: 50,
        backgroundColor: '#404040',
    },
    text: {
        color: 'white',
        fontSize: 24,
        padding: 8,
    },
});