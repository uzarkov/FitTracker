import React from "react";
import {Text, Pressable, View,} from "react-native";
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {globalStyles} from "../../../../global-styles/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {FoodForm} from "../food-form/FoodForm";

export const FoodModal = (props) => {

    return (
        <Modal
            isVisible={props.modalVisible}
            avoidKeyboard={true}
            backdropOpacity={0.9}
            onBackdropPress={() => props.isModalVisible(false)}
            backdropTransitionOutTiming={0}
        >
            <View style={globalStyles.modalContainer}>
                <View style={globalStyles.modal}>
                    <View style={globalStyles.modalTitleContainer}>
                        <MaterialIcons
                            name={"straighten"}
                            color={"#03DAC5"}
                            size={40}
                        />
                        <Text style={globalStyles.modalTitle}>Posiłek</Text>
                        <Pressable
                            style={globalStyles.iconButton}
                            onPress={() => props.isModalVisible(false)}
                        >
                            <MaterialIcons
                                name={"close"}
                                color={"#CF6679"}
                                size={40}
                            />
                        </Pressable>
                    </View>
                    <FoodForm isModalVisible={props.isModalVisible}/>
                </View>
            </View>
        </Modal>
    );
};

FoodModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.func.isRequired
}