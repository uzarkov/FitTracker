import React from "react";
import {Text, Pressable, View, FlatList,} from "react-native";
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import {globalStyles} from "../../../global-styles/globalStyles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ListItem} from "../../../components/common/list-item/ListItem";
import {removeActivity} from "../../../contexts/activity-context/actions";
import {useAuth} from "../../../contexts/auth-context/authContext";
import {useDailyProgress} from "../../../contexts/daily-progress-context/dailyProgressContext";
import moment from "moment";
import {getDailyProgressPlaceholder} from "../../../contexts/daily-progress-context/utils";

export const ActivityInfoModal = (props) => {

    const [authState, ] = useAuth();
    const { user } = authState;

    const [dailyProgressState, dailyProgressDispatch] = useDailyProgress();
    const { days, } = dailyProgressState;

    const today = moment().format('DD-MM-YYYY');
    const dailyProgress = days[today] || getDailyProgressPlaceholder(today, 0);

    const removeDailyProgressActivity = (index) => {
        removeActivity(dailyProgressDispatch, {
            uid: user.uid,
            dailyProgress,
            index,
        })
    }

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
                            name={"directions-bike"}
                            color={"#03DAC5"}
                            size={40}
                        />
                        <Text style={globalStyles.modalTitle}>Aktywności</Text>
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
                    <View style={globalStyles.longList}>
                        <FlatList
                            data={dailyProgress.activities}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => (
                                <ListItem
                                    title={item.name}
                                    description={`Spalone kcal: ${item.burnedKcal}`}
                                    onDelete={() => removeDailyProgressActivity(index)}
                                />
                            )}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

ActivityInfoModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    isModalVisible: PropTypes.func.isRequired
}