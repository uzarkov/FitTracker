import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './SigningTitleStyles';

export const SigningTitle = () => {

    const TITLE_NAME = 'FitTracker';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{TITLE_NAME}</Text>
            <MaterialIcons name={"fitness-center"} color={"white"} size={50}/>
        </View>
    )
}