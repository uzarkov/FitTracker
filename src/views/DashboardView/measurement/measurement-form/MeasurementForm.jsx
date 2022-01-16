import React from 'react';
import { View, Pressable, Text, TextInput } from "react-native";
import { Formik } from 'formik';
import { styles } from "./MeasurementFormStyles";
import { globalStyles } from "../../../../global-styles/globalStyles";
import PropTypes from "prop-types";
import { addBodyMeasurement } from "../../../../contexts/body-measurements-context/actions/addBodyMeasurement";
import { useAuth } from "../../../../contexts/auth-context/authContext";
import { useBodyMeasurements } from "../../../../contexts/body-measurements-context/bodyMeasurementsContext";
import moment from "moment";

export const MeasurementForm = (props) => {

    const [authState,] = useAuth();
    const { user } = authState;

    const [bodyMeasurementsState, measurementsDispatch] = useBodyMeasurements();

    const addMeasurement = (values) => {
        addBodyMeasurement(measurementsDispatch, {
            uid: user.uid,
            date: moment().format('DD-MM-YYYY'),
            bodyMeasurement: {
                weight: parseFloat(values.weight) || 0,
                bodyFat: parseFloat(values.bodyFat) || 0,
                height: parseFloat(values.height) || 0
            }
        })
    }

    const initialValues = {
        weight: 0,
        bodyFat: 0,
        height: 0
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                addMeasurement(values)
                props.isModalVisible(false)
            }}
        >
            {(formikProps) => (
                <View style={styles.container}>
                    <View>
                        <TextInput
                            style={[globalStyles.inputAndroid, styles.input]}
                            placeholder={"Waga (kg)"}
                            placeholderTextColor={'grey'}
                            keyboardType={"numeric"}
                            onChangeText={formikProps.handleChange('weight')}
                            value={formikProps.values.weight}
                        />
                        <TextInput
                            style={[globalStyles.inputAndroid, styles.input]}
                            placeholder={"Tkanka tłuszczowa (%)"}
                            placeholderTextColor={'grey'}
                            keyboardType={"numeric"}
                            onChangeText={formikProps.handleChange('bodyFat')}
                            value={formikProps.values.bodyFat}
                        />
                        <TextInput
                            style={[globalStyles.inputAndroid, styles.input]}
                            placeholder={"Wzrost (cm)"}
                            placeholderTextColor={'grey'}
                            keyboardType={"numeric"}
                            onChangeText={formikProps.handleChange('height')}
                            value={formikProps.values.height}
                        />
                    </View>
                    <Pressable
                        style={[globalStyles.button, styles.button]}
                        onPress={() => formikProps.handleSubmit()}
                    >
                        <Text style={styles.buttonText}>Dodaj pomiar</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

MeasurementForm.propTypes = {
    isModalVisible: PropTypes.func.isRequired
}