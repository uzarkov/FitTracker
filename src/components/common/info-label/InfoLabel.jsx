import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from "react-native";
import {styles} from './InfoLabelStyles';

export const InfoLabel = (props) => {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
              {props.text}
          </Text>
          <Text style={styles.value}>
              {props.value}
          </Text>
      </View>
    );
}

InfoLabel.propTypes = {
    text: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
}