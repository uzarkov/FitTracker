import React from 'react';
import {View, Pressable, Text, TextInput} from "react-native";
import { Formik } from 'formik';
import {styles} from "./SignUpFormStyles";
import {globalStyles} from "../../../global-styles/globalStyles";
import PropTypes from "prop-types";
import {SIGN_IN_ROUTE} from "../../../router/PublicContentRouting";
import {Link} from "react-router-native";

export const SignUpForm = (props) => {

    const initialValues = {
        name: '',
        birthDate: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                props.onSubmit(values)
            }}
        >
            {(formikProps) => (
                <View style={styles.container}>
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Imię i nazwisko"}
                        placeholderTextColor={'grey'}
                        onChangeText={formikProps.handleChange('name')}
                        value={formikProps.values.name}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Data urodzenia (dd.mm.yyyy)"}
                        placeholderTextColor={'grey'}
                        keyboardType={"numeric"}
                        onChangeText={formikProps.handleChange('birthDate')}
                        value={formikProps.values.birthDate}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Email"}
                        placeholderTextColor={'grey'}
                        onChangeText={formikProps.handleChange('email')}
                        value={formikProps.values.email}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Hasło"}
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={formikProps.handleChange('password')}
                        value={formikProps.values.password}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Potwierdzenie hasła"}
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={formikProps.handleChange('passwordConfirmation')}
                        value={formikProps.values.passwordConfirmation}
                    />
                        <Pressable
                            style={[globalStyles.button, styles.button]}
                            onPress={() => formikProps.handleSubmit()}
                        >
                            <Text style={styles.buttonText}>
                                {props.fetching ? "..." : "Utwórz konto" }
                            </Text>
                        </Pressable>
                        <Link to={SIGN_IN_ROUTE}>
                            <Text style={styles.link}>LOGOWANIE</Text>
                        </Link>
                </View>
            )}
        </Formik>
    );
}

SignUpForm.propTypes = {
    onSignUp: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
}