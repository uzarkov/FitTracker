import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Link } from 'react-router-native';
import { signUp } from '../contexts/auth-context/actions/signUp';
import { useAuth } from '../contexts/auth-context/authContext';
import { SIGN_IN_ROUTE } from '../router/PublicContentRouting';
import { Redirect } from 'react-router-native';

export const SignUpView = () => {
    const [authState, authDispatch] = useAuth();
    const { signingUp, signingUpError } = authState;

    const [signingUpPrevState, setSigningUpPrevState] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    const [nameInput, setNameInput] = useState('');
    const [birthDateInput, setBirthDateInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordConfirmationInput, setPasswordConfirmationInput] = useState('');

    useEffect(() => {
        if (signingUpPrevState && !signingUp && signingUpError === null) {
            setSignedUp(true);
        }
        setSigningUpPrevState(signingUp)
    }, [signingUp])

    const onSignUp = () => {
        signUp(authDispatch, {
            email: emailInput,
            password: passwordInput,
            name: nameInput,
            birthDate: birthDateInput,
        })

        setNameInput('')
        setBirthDateInput('')
        setEmailInput('')
        setPasswordInput('')
        setPasswordConfirmationInput('')
    }

    if (signedUp) {
        return <Redirect to={SIGN_IN_ROUTE} />
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setNameInput}
                value={nameInput}
                placeholder={'name'}
                placeholderTextColor={'grey'}
            />
            <TextInput
                style={styles.input}
                onChangeText={setBirthDateInput}
                value={birthDateInput}
                placeholder={'birthdate'}
                placeholderTextColor={'grey'}
                keyboardType={'default'}
            />
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
            <TextInput
                style={styles.input}
                onChangeText={setPasswordConfirmationInput}
                value={passwordConfirmationInput}
                placeholder={'confirm password'}
                placeholderTextColor={'grey'}
                secureTextEntry={true}
            />
            <Pressable
                style={styles.button}
                onPress={onSignUp}
            >
                <Text style={styles.text}>Sign up</Text>
            </Pressable>
            <Link to={SIGN_IN_ROUTE}>
                <Text style={styles.text}>{'<- Sign in'}</Text>
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