import React from 'react';
import {View, Pressable, Text, TextInput} from "react-native";
import { Formik } from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {styles} from "./GoalsFormStyles";
import {globalStyles} from "../../../global-styles/globalStyles";
import {GOAL_TYPES} from "../../../contexts/goal-context/constants";
import PropTypes from "prop-types";
import moment from 'moment';
import {useAuth} from "../../../contexts/auth-context/authContext";
import {useGoal} from "../../../contexts/goal-context/goalContext";
import {setGoal} from "../../../contexts/goal-context/actions/setGoal";

export const GoalsForm = (props) => {
    const [userState] = useAuth();
    const { user } = userState;

    const [, goalsDispatch] = useGoal();

    const setNewGoal = (values) => {
        setGoal(goalsDispatch, {
            uid: user.uid,
            goal: {
                type: values.type,
                caloricDemand: values.caloricDemand,
                startingWeight: values.startingWeight,
                targetWeight: values.targetWeight,
                startDate: moment().format('DD-MM-YYYY HH:mm:ss'),
            },
        })
    }

    const initialValues = {
        type: GOAL_TYPES.LOSE_WEIGHT,
        caloricDemand: '',
        startingWeight: '',
        targetWeight: '',
    }

   const goalTypes = [
       {
           label: GOAL_TYPES.LOSE_WEIGHT,
           value: GOAL_TYPES.LOSE_WEIGHT
       },
       {
           label: GOAL_TYPES.MAINTAIN_WEIGHT,
           value: GOAL_TYPES.MAINTAIN_WEIGHT
       },
       {
           label: GOAL_TYPES.GAIN_WEIGHT,
           value: GOAL_TYPES.GAIN_WEIGHT
       },
   ];

    return (
      <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
              setNewGoal(values)
              props.isModalVisible(false)
          }}
      >
          {(formikProps) => (
              <View style={styles.container}>
                  <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      style={{iconContainer: {top: 7, right: 7}}}
                      textInputProps={
                          {style: {...globalStyles.inputAndroid,...styles.input}}
                      }
                      placeholder={{}}
                      onValueChange={formikProps.handleChange('type')}
                      value={formikProps.values.type}
                      items={goalTypes}
                      Icon={() => {
                        return (
                            <MaterialIcons
                                name={"arrow-drop-down"}
                                color={"#03DAC5"}
                                size={24}
                            />
                        )
                      }}
                  />
                  <TextInput
                    style={[globalStyles.inputAndroid, styles.input]}
                    placeholder={"Zapotrzebowanie kcal"}
                    placeholderTextColor={'grey'}
                    keyboardType={'numeric'}
                    onChangeText={formikProps.handleChange('caloricDemand')}
                    value={formikProps.values.caloricDemand}
                  />
                  <TextInput
                    style={[globalStyles.inputAndroid, styles.input]}
                    placeholder={"Waga początkowa"}
                    placeholderTextColor={'grey'}
                    keyboardType={"numeric"}
                    onChangeText={formikProps.handleChange('startingWeight')}
                    value={formikProps.values.startingWeight}
                  />
                  <TextInput
                      style={[globalStyles.inputAndroid, styles.input]}
                      placeholder={"Waga końcowa"}
                      placeholderTextColor={'grey'}
                      keyboardType={"numeric"}
                      onChangeText={formikProps.handleChange('targetWeight')}
                      value={formikProps.values.targetWeight}
                  />
                  <Pressable
                    style={[globalStyles.button, styles.button]}
                    onPress={() => formikProps.handleSubmit()}
                  >
                      <Text style={styles.buttonText}>Utwórz cel</Text>
                  </Pressable>
              </View>
          )}
      </Formik>
    );
}

GoalsForm.propTypes = {
    isModalVisible: PropTypes.func.isRequired
}