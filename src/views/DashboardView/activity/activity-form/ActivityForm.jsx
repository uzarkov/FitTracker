import React from 'react';
import {View, Pressable, Text, TextInput} from "react-native";
import { Formik } from 'formik';
import {styles} from "./ActivityFormStyles";
import {globalStyles} from "../../../../global-styles/globalStyles";
import PropTypes from "prop-types";
import moment from 'moment';
import {useAuth} from "../../../../contexts/auth-context/authContext";
import {useDailyProgress} from "../../../../contexts/daily-progress-context/dailyProgressContext";
import {getDailyProgressPlaceholder} from "../../../../contexts/daily-progress-context/utils";
import {addActivity} from "../../../../contexts/activity-context/actions";

export const ActivityForm = (props) => {

    const [authState, ] = useAuth();
    const { user } = authState;

    const [dailyProgressState, dailyProgressDispatch] = useDailyProgress();
    const { days, } = dailyProgressState;

    const today = moment().format('DD-MM-YYYY');
    const dailyProgress = days[today] || getDailyProgressPlaceholder(today, 0);

    const addDailyProgressActivity = (values) => {
        addActivity(dailyProgressDispatch, {
            uid: user.uid,
            dailyProgress,
            newActivity: {
                name: values.name,
                burnedKcal: Number(values.burnedKcal)
            }
        })
    }

    const initialValues = {
        name: '',
        burnedKcal: 0
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                addDailyProgressActivity(values)
                props.isModalVisible(false)
            }}
        >
            {(formikProps) => (
                <View style={styles.container}>
                    <View>
                        <TextInput
                            style={[globalStyles.inputAndroid, styles.input]}
                            placeholder={"Nazwa"}
                            placeholderTextColor={'grey'}
                            onChangeText={formikProps.handleChange('name')}
                            value={formikProps.values.name}
                        />
                        <TextInput
                            style={[globalStyles.inputAndroid, styles.input]}
                            placeholder={"Spalone Kcal"}
                            placeholderTextColor={'grey'}
                            keyboardType={"numeric"}
                            onChangeText={formikProps.handleChange('burnedKcal')}
                            value={formikProps.values.burnedKcal}
                        />
                    </View>
                    <Pressable
                        style={[globalStyles.button, styles.button]}
                        onPress={() => formikProps.handleSubmit()}
                    >
                        <Text style={styles.buttonText}>Dodaj aktywność</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

ActivityForm.propTypes = {
    isModalVisible: PropTypes.func.isRequired
}