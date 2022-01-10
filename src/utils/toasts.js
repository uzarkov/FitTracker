import React from 'react';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const toastsCommonConfig = {
    contentContainerStyle: {
        backgroundColor: '#252525',
    },
    text1Style: {
        fontSize: 18,
        fontWeight: '400',
        color: '#03DAC5',
    },
    text2Style: {
        fontSize: 14,
        fontWeight: '800',
        color: '#ffffff',
    },
    text2NumberOfLines: 3
}

export const toastsConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            contentContainerStyle={toastsCommonConfig.contentContainerStyle}
            text1Style={toastsCommonConfig.text1Style}
            text2Style={toastsCommonConfig.text2Style}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#a32a2a' }}
            contentContainerStyle={toastsCommonConfig.contentContainerStyle}
            text1Style={toastsCommonConfig.text1Style}
            text2Style={toastsCommonConfig.text2Style}
            text2NumberOfLines={toastsCommonConfig.text2NumberOfLines}
        />
    ),
};

export const showErrorToast = (text) => {
    Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Błąd',
        text2: text
    })
}

export const showSuccessToast = (text) => {
    Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sukces',
        text2: text
    })
}