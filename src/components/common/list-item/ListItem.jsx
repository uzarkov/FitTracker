import React from 'react';
import PropTypes from 'prop-types';
import {Pressable, Text, View} from "react-native";
import {styles} from './ListItemStyles';
import {globalStyles} from "../../../global-styles/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const ListItem = (props) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.description}>
                    {props.description}
                </Text>
            </View>
            <Pressable
                style={globalStyles.iconButton}
                onPress={props.onDelete}
            >
                <MaterialIcons
                    name={"delete"}
                    color={props.withAction ? "#CF6679" : "transparent"}
                    size={30}
                />
            </Pressable>
        </View>
    );
}

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    withAction: PropTypes.bool
}

ListItem.defaultProps = {
    onDelete: () => {},
    withAction: true
}
