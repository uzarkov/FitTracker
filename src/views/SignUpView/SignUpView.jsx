import React, { useEffect, useState } from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from "react-native";
import { signUp } from '../../contexts/auth-context/actions/signUp';
import { useAuth } from '../../contexts/auth-context/authContext';
import {SIGN_IN_ROUTE} from '../../router/PublicContentRouting';
import { Redirect } from 'react-router-native';
import { useUserProfile } from '../../contexts/user-profile-context/userProfileContext';
import {styles} from "./SignUpViewStyles";
import {SigningTitle} from "../../components/signing-title/SigningTitle";
import {SignUpForm} from "./SignUpForm/SignUpForm";
import {StatusBar} from "expo-status-bar";

export const SignUpView = () => {
    const [authState, authDispatch] = useAuth();
    const { signingUp, fetching, signingUpError } = authState;

    const [, userProfileDispatch] = useUserProfile();

    const [signingUpPrevState, setSigningUpPrevState] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    useEffect(() => {
        if (signingUpPrevState && !signingUp && signingUpError === null) {
            setSignedUp(true);
        }
        setSigningUpPrevState(signingUp)
    }, [signingUp])

    const onSignUp = (values) => {
        signUp(authDispatch, userProfileDispatch, {
            email: values.email,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
            name: values.name,
            birthDate: values.birthDate,
        })
    }

    if (signedUp) {
        return <Redirect to={SIGN_IN_ROUTE} />
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
                <View style={styles.formContainer}>
                    <SignUpForm
                        onSignUp={onSignUp}
                        fetching={fetching}
                    />
                </View>
                <StatusBar style="auto"/>
            </View>
        </TouchableWithoutFeedback>
    )
}
