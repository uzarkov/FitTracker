import React from "react";
import { Text, Pressable, View, } from "react-native";
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { Link } from "react-router-native";
import { styles } from "./GoalsModalStyles";
import { globalStyles } from "../../../global-styles/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GoalsForm } from "../GoalsForm/GoalsForm";
import { PROTECTED_ROUTES } from "../../../router/constants";

export const GoalsModal = (props) => {
    const isMeasurementProvided = props.latestBodyMeasurement !== undefined;

    return (
        <Modal
            isVisible={props.modalVisible}
            avoidKeyboard={true}
            backdropOpacity={0.9}
            onBackdropPress={() => props.isModalVisible(false)}
            backdropTransitionOutTiming={0}
        >
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.titleContainer}>
                        <MaterialIcons
                            name={"track-changes"}
                            color={"#03DAC5"}
                            size={40}
                        />
                        <Text style={styles.title}>Nowy cel</Text>
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
                    {isMeasurementProvided ?
                        <GoalsForm isModalVisible={props.isModalVisible} />
                        :
                        <View style={styles.infoGroup}>
                            <Text style={styles.info}>
                                Cel mo??na ustali?? dopiero po dodaniu pomiaru cia??a
                            </Text>
                            <Link to={PROTECTED_ROUTES.DASHBOARD_ROUTE}>
                                <Text style={styles.link}>Dodaj pomiar</Text>
                            </Link>
                        </View>
                    }
                </View>
            </View>
        </Modal>
    );
};

GoalsModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.func.isRequired
}

