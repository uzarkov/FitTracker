import React from 'react';
import { View, Pressable, Text, TextInput } from "react-native";
import { Formik } from 'formik';
import { styles } from "./SignUpFormStyles";
import { globalStyles } from "../../../global-styles/globalStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-native";
import { PUBLIC_ROUTES } from '../../../router/constants';

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
                        placeholder={"Nazwa"}
                        placeholderTextColor={'grey'}
                        onChangeText={formikProps.handleChange('name')}
                        value={formikProps.values.name}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Data urodzenia (DD-MM-YYYY)"}
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
                        placeholder={"Has??o"}
                        placeholderTextColor={'grey'}
                        secureTextEntry={true}
                        onChangeText={formikProps.handleChange('password')}
                        value={formikProps.values.password}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Potwierdzenie has??a"}
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
                            {props.fetching ? "..." : "Utw??rz konto"}
                        </Text>
                    </Pressable>
                    <Link to={PUBLIC_ROUTES.SIGN_IN_ROUTE}>
                        <Text style={styles.link}>LOGOWANIE</Text>
                    </Link>
                </View>
            )}
        </Formik>
    );
}

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
}