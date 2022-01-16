import React from 'react';
import {Platform, TouchableOpacity, UIManager, Text, LayoutAnimation} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {styles} from "./AccordionStyles"
import PropTypes from "prop-types";

export const Accordion = (props) => {

    if (
        Platform.OS === "android" &&
        UIManager.setLayoutAnimationEnabledExperimental
    ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const onToggle = () => {
        props.setOpen();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    props.setOpen()
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }}
                style={styles.heading}
            >
                <Text style={styles.sectionTitle}>
                    {props.title}
                </Text>
                <MaterialIcons
                    name={props.open ? "expand-less" : "expand-more"}
                    color={'#03DAC5'}
                    size={30}
                />
            </TouchableOpacity>
            {props.open ? props.body : <></>}
        </>
    )
}

Accordion.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.any.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}