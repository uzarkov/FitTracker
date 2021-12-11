import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import PropTypes from 'prop-types';

export const CircProgress = (props) => {

    return (
      <CircularProgress
        value={props.value}
        radius={props.radius}
        duration={1500}
        textColor={'white'}
        maxValue={100}
        valueSuffix={'%'}
        activeStrokeColor={'#BB86FC'}
      />
    );
}

CircProgress.propTypes = {
    value: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired
}