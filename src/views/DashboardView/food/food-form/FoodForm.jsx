import React from 'react';
import { View, Pressable, Text, TextInput } from "react-native";
import { Formik } from 'formik';
import { styles } from "./FoodFormStyles";
import { globalStyles } from "../../../../global-styles/globalStyles";
import PropTypes from "prop-types";
import moment from 'moment';
import { useAuth } from "../../../../contexts/auth-context/authContext";
import { addProduct } from "../../../../contexts/product-context/actions";
import { useDailyProgress } from "../../../../contexts/daily-progress-context/dailyProgressContext";
import { getDailyProgressPlaceholder } from "../../../../contexts/daily-progress-context/utils";
import { validateProduct } from '../../../../contexts/product-context/utils/productAddValidation';
import { showErrorToast } from '../../../../utils/toasts';

export const FoodForm = (props) => {

    const [authState,] = useAuth();
    const { user } = authState;

    const [dailyProgressState, dailyProgressDispatch] = useDailyProgress();
    const { days, } = dailyProgressState;

    const today = moment().format('DD-MM-YYYY');
    const dailyProgress = days[today] || getDailyProgressPlaceholder(today, 0);

    const addDailyProgressProduct = (values) => {
        const product = {
            name: values.name,
            kcal: parseFloat(values.kcal) || 0,
            proteins: parseFloat(values.proteins) || 0,
            carbs: parseFloat(values.carbs) || 0,
            fats: parseFloat(values.fats) || 0,
        }

        try {
            validateProduct({ ...product })
            addProduct(dailyProgressDispatch, {
                uid: user.uid,
                dailyProgress,
                newProduct: product,
            })
        } catch (error) {
            showErrorToast(error.message)
        }
    }

    const initialValues = {
        name: '',
        kcal: 0,
        proteins: 0,
        carbs: 0,
        fats: 0
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                addDailyProgressProduct(values)
                props.isModalVisible(false)
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
                        placeholder={"Kcal"}
                        placeholderTextColor={'grey'}
                        keyboardType={"numeric"}
                        onChangeText={formikProps.handleChange('kcal')}
                        value={formikProps.values.kcal}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Białko (g)"}
                        placeholderTextColor={'grey'}
                        keyboardType={"numeric"}
                        onChangeText={formikProps.handleChange('proteins')}
                        value={formikProps.values.proteins}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Węglowodany (g)"}
                        placeholderTextColor={'grey'}
                        keyboardType={"numeric"}
                        onChangeText={formikProps.handleChange('carbs')}
                        value={formikProps.values.carbs}
                    />
                    <TextInput
                        style={[globalStyles.inputAndroid, styles.input]}
                        placeholder={"Tłuszcze (g)"}
                        placeholderTextColor={'grey'}
                        keyboardType={"numeric"}
                        onChangeText={formikProps.handleChange('fats')}
                        value={formikProps.values.fats}
                    />
                    <Pressable
                        style={[globalStyles.button, styles.button]}
                        onPress={() => formikProps.handleSubmit()}
                    >
                        <Text style={styles.buttonText}>Dodaj posiłek</Text>
                    </Pressable>
                </View>
            )}
        </Formik>
    );
}

FoodForm.propTypes = {
    isModalVisible: PropTypes.func.isRequired
}