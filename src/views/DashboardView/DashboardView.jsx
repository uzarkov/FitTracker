import moment from 'moment';
import React, { useEffect } from 'react';
import { LogBox, View, Text, Pressable } from "react-native";
import { useState } from 'react/cjs/react.development';
import { TopBar } from "../../components/TopBar/TopBar";
import { useAuth } from '../../contexts/auth-context/authContext';
import { fetchDailyProgress } from '../../contexts/daily-progress-context/actions/fetchDailyProgress';
import { useDailyProgress } from '../../contexts/daily-progress-context/dailyProgressContext';
import {
    countRemainingKcal,
    countTotalsOf,
    getDailyProgressPlaceholder
} from '../../contexts/daily-progress-context/utils';
import { fetchCurrentGoal } from '../../contexts/goal-context/actions/fetchCurrentGoal';
import { useGoal } from '../../contexts/goal-context/goalContext';
import ActionButton from 'react-native-action-button';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { styles } from './DashboardViewStyles';
import { globalStyles } from "../../global-styles/globalStyles";
import { InfoLabel } from "../../components/common/info-label/InfoLabel";
import { CircularChart } from "../../components/common/pie-chart/CircularChart";
import { ActivityModal } from "./activity/activity-modal/ActivityModal";
import { FoodModal } from "./food/food-modal/FoodModal";
import { MeasurementModal } from "./measurement/measurement-modal/MeasurementModal";
import { ActivityInfoModal } from "./activity-info/ActivityInfoModal";
import { FoodInfoModal } from "./food-info/FoodInfoModal";

export const DashboardView = () => {

    const [measurementModalVisible, isMeasurementModalVisible] = useState(false);
    const [activityModalVisible, isActivityModalVisible] = useState(false);
    const [foodModalVisible, isFoodModalVisible] = useState(false);
    const [activityInfoModalVisible, isActivityInfoModalVisible] = useState(false);
    const [foodInfoModalVisible, isFoodInfoModalVisible] = useState(false);

    const [authState, authDispatch] = useAuth();
    const { user } = authState;

    const [dailyProgressState, dailyProgressDispatch] = useDailyProgress();
    const { days, fetching, error } = dailyProgressState;

    const today = moment().format('DD-MM-YYYY');
    const dailyProgress = days[today] || getDailyProgressPlaceholder(today, 0);

    const [goalState, goalDispatch] = useGoal();
    const { activeGoal, fetching: fetchingGoal } = goalState;

    const [activeGoalFetched, setActiveGoalFetched] = useState(false);

    useEffect(() => {
        fetchCurrentGoal(goalDispatch, {
            uid: user.uid
        })
        setActiveGoalFetched(true)
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    useEffect(() => {
        if (activeGoalFetched && !fetchingGoal) {
            fetchDailyProgress(dailyProgressDispatch, {
                uid: user.uid,
                date: today,
                defaultCaloricDemand: activeGoal.caloricDemand || 0,
            });
        }
    }, [activeGoalFetched, fetchingGoal])

    const dailyProgressTotals = countTotalsOf(dailyProgress)

    const remainingCalories = countRemainingKcal(dailyProgressTotals.totalKcal, dailyProgress.targetKcal)

    const kcalProgress = dailyProgressTotals.totalKcal / dailyProgress.targetKcal;

    if (fetching || fetchingGoal) {
        return (
            <>
                <TopBar />
                <View style={styles.container}>
                    <Text style={styles.loading}>
                        ...
                    </Text>
                </View>
            </>
        )
    }

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <View style={styles.boxes}>
                    <View style={[globalStyles.shadowBox, styles.balanceContainer]}>
                        <View style={styles.progressContainer}>
                            <Text style={styles.lineItem}>
                                0
                            </Text>
                            <Progress.Bar
                                progress={kcalProgress ? kcalProgress : 0}
                                width={250}
                                height={5}
                                color={'#03DAC5'}
                                unfilledColor={'#085c5c'}
                                borderWidth={0}
                            />
                            <Text style={styles.lineItem}>
                                {dailyProgress.targetKcal}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.title}>
                                Dzisiejszy bilans kaloryczny
                            </Text>
                            <Text style={styles.value}>
                                {dailyProgressTotals.totalKcal}
                            </Text>
                        </View>
                        <InfoLabel
                            text={"Pozostało"}
                            value={`${remainingCalories}`}
                        />
                    </View>
                    <View style={[globalStyles.shadowBox, styles.foodContainer]}>
                        <InfoLabel
                            text={"Posiłki"}
                            value={dailyProgressTotals.productsKcal}
                        />
                        <View style={styles.chartContainer}>
                            <CircularChart data={dailyProgressTotals} />
                        </View>
                        <Pressable
                            style={globalStyles.iconButton}
                            onPress={() => { isFoodInfoModalVisible(true) }}
                        >
                            <Text style={styles.link}>
                                SZCZEGÓŁY
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[globalStyles.shadowBox, styles.activityContainer]}>
                        <InfoLabel
                            text={"Całkowita aktywność fizyczna"}
                            value={dailyProgressTotals.burnedKcal}
                        />
                        <Pressable
                            style={globalStyles.iconButton}
                            onPress={() => { isActivityInfoModalVisible(true) }}
                        >
                            <Text style={styles.link}>
                                SZCZEGÓŁY
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <FoodModal
                modalVisible={foodModalVisible}
                isModalVisible={isFoodModalVisible}
            />
            <ActivityModal
                modalVisible={activityModalVisible}
                isModalVisible={isActivityModalVisible}
            />
            <MeasurementModal
                modalVisible={measurementModalVisible}
                isModalVisible={isMeasurementModalVisible}
            />
            <ActivityInfoModal
                modalVisible={activityInfoModalVisible}
                isModalVisible={isActivityInfoModalVisible}
            />
            <FoodInfoModal
                modalVisible={foodInfoModalVisible}
                isModalVisible={isFoodInfoModalVisible}
            />
            <ActionButton
                buttonColor="#03DAC5"
                buttonTextStyle={{ color: '#000' }}
                bgColor="rgba(0,0,0,0.9)"
            >
                <ActionButton.Item
                    buttonColor='#FCE086'
                    title="Posiłek"
                    onPress={() => isFoodModalVisible(true)}
                >
                    <MaterialIcons
                        name={"fastfood"}
                        color={"#000"}
                        size={22}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#036FDA'
                    title="Aktywność"
                    onPress={() => isActivityModalVisible(true)}
                >
                    <MaterialIcons
                        name={"directions-bike"}
                        color={"#000"}
                        size={22}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor='#CF6679'
                    title="Pomiar"
                    onPress={() => isMeasurementModalVisible(true)}
                >
                    <MaterialIcons
                        name={"straighten"}
                        color={"#000"}
                        size={22}
                    />
                </ActionButton.Item>
            </ActionButton>

        </>
    )
}

