import React, { useEffect, useState } from 'react';
import { Text, View, Pressable } from "react-native";
import { TopBar } from '../../components/TopBar/TopBar';
import { useAuth } from '../../contexts/auth-context/authContext';
import { fetchCurrentGoal } from '../../contexts/goal-context/actions/fetchCurrentGoal';
import { useGoal } from '../../contexts/goal-context/goalContext';
import { styles } from './GoalsViewStyles';
import { InfoLabel } from "../../components/common/info-label/InfoLabel";
import { CircProgress } from "../../components/common/circ-progress/CircProgress";
import { Link } from "react-router-native";
import { GoalsModal } from "./GoalsModal/GoalsModal";
import { useBodyMeasurements } from '../../contexts/body-measurements-context/bodyMeasurementsContext';
import { fetchLatestBodyMeasurement } from '../../contexts/body-measurements-context/actions/fetchLatestBodyMeasurement';
import { calculateGoalProgress } from '../../contexts/goal-context/utils';
import { GOAL_TYPES } from '../../contexts/goal-context/constants';
import { PROTECTED_ROUTES } from '../../router/constants';

export const GoalsView = () => {
    const [userState] = useAuth();
    const { user } = userState;

    const [goalsState, goalsDispatch] = useGoal();
    const { activeGoal, fetching } = goalsState;

    const [bodyMeasurementsState, measurementsDispatch] = useBodyMeasurements();
    const { latestBodyMeasurement } = bodyMeasurementsState

    const [modalVisible, isModalVisible] = useState(false);

    useEffect(() => {
        fetchLatestBodyMeasurement(measurementsDispatch, { uid: user.uid })
        fetchCurrentGoal(goalsDispatch, { uid: user.uid })
    }, [])

    const currentWeight = latestBodyMeasurement?.weight || activeGoal.startingWeight

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <View style={styles.box}>
                    {!(activeGoal && activeGoal.isUndefined) ?
                        <>
                            <InfoLabel
                                text={"Aktualny cel"}
                                value={activeGoal.type}
                            />
                            <InfoLabel
                                text={"Zapotrzebowanie kaloryczne"}
                                value={`${activeGoal.caloricDemand} kcal`}
                            />
                            <View style={styles.weightGroup}>
                                <InfoLabel
                                    text={activeGoal.type === GOAL_TYPES.MAINTAIN_WEIGHT ? "Min" : "Start"}
                                    value={`${activeGoal.startingWeight}kg`}
                                />
                                <InfoLabel
                                    text={"Aktualnie"}
                                    value={`${currentWeight}kg`}
                                />
                                <InfoLabel
                                    text={activeGoal.type === GOAL_TYPES.MAINTAIN_WEIGHT ? "Max" : "Cel"}
                                    value={`${activeGoal.targetWeight}kg`}
                                />
                            </View>
                            <CircProgress
                                value={calculateGoalProgress(activeGoal, currentWeight)}
                                radius={65}
                            />
                            <View>
                                <Pressable
                                    style={styles.modalButton}
                                    onPress={() => {
                                        isModalVisible(true);
                                    }}
                                >
                                    <Text style={styles.link}>Zmień cel</Text>
                                </Pressable>
                                <Link to={PROTECTED_ROUTES.HISTORY_ROUTE}>
                                    <Text style={styles.link}>Historia celów</Text>
                                </Link>
                            </View>
                        </>
                        :
                        <View>
                            <Text style={styles.title}>Brak ustalonego celu</Text>
                            <Pressable
                                style={styles.modalButton}
                                onPress={() => {
                                    isModalVisible(true);
                                }}
                            >
                                <Text style={styles.link}>Dodaj nowy cel</Text>
                            </Pressable>
                        </View>
                    }
                </View>
                <GoalsModal
                    modalVisible={modalVisible}
                    isModalVisible={isModalVisible}
                    latestBodyMeasurement={latestBodyMeasurement}
                />
            </View>
        </>
    )
}