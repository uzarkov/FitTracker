import React, { useState } from 'react';
import {Keyboard, Pressable, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import { useAuth } from '../../contexts/auth-context/authContext';
import { signIn } from '../../contexts/auth-context/actions/signIn';
import { DashboardView} from "../DashboardView";
import { Link } from 'react-router-native';
import { SIGN_UP_ROUTE } from '../../router/PublicContentRouting';
import {styles} from './SignInViewStyles';
import {globalStyles} from "../../global-styles/globalStyles";
import {SigningTitle} from "../../components/signing-title/SigningTitle";
import {StatusBar} from "expo-status-bar";

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
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
        >
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <SigningTitle/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Email"}
                        placeholderTextColor={"grey"}
                        value={emailInput}
                        onChangeText={(text) => setEmailInput(text)}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Hasło"}
                        placeholderTextColor={"grey"}
                        value={passwordInput}
                        onChangeText={(text) => setPasswordInput(text)}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.submitContainer}>
                    <Pressable
                        style={[globalStyles.button, styles.button]}
                        onPress={() => onSignIn()}
                    >
                        <Text style={styles.buttonText}>{fetching ? "..." : "Zaloguj się"}</Text>
                    </Pressable>
                    <Link to={SIGN_UP_ROUTE}>
                        <Text style={styles.link}>REJESTRACJA</Text>
                    </Link>
                </View>
                <StatusBar style="auto" />
            </View>
        </TouchableWithoutFeedback>
    )
}

    