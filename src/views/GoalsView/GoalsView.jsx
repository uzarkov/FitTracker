import React, {useEffect, useState} from 'react';
import { Text, View, Pressable } from "react-native";
import { TopBar } from '../../components/TopBar/TopBar';
import { useAuth } from '../../contexts/auth-context/authContext';
import { fetchCurrentGoal } from '../../contexts/goal-context/actions/fetchCurrentGoal';
import { useGoal } from '../../contexts/goal-context/goalContext';
import {styles} from './GoalsViewStyles';
import {InfoLabel} from "../../components/common/info-label/InfoLabel";
import {CircProgress} from "../../components/common/circ-progress/CircProgress";
import {Link} from "react-router-native";
import {HISTORY_ROUTE} from '../../router/ProtectedContentRouting';
import {GoalsModal} from "./GoalsModal/GoalsModal";

export const GoalsView = () => {
    const [userState] = useAuth();
    const { user } = userState;

    const [goalsState, goalsDispatch] = useGoal();
    const { activeGoal, fetching } = goalsState;

    const [modalVisible, isModalVisible] = useState(false);

    useEffect(() => {
        fetchCurrentGoal(goalsDispatch, { uid: user.uid })
    }, [])

    //TODO: remove this if context support is provided
    const getRandomIntIncl = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <View style={styles.box}>
                    {!(activeGoal && activeGoal.isPlaceholder) ?
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
                                    text={"Start"}
                                    value={`${activeGoal.startingWeight}kg`}
                                />
                                <InfoLabel
                                    text={"Aktualnie"}
                                    //TODO: fetch this val using context
                                    value={`${getRandomIntIncl(activeGoal.startingWeight, activeGoal.targetWeight)}kg`}
                                />
                                <InfoLabel
                                    text={"Cel"}
                                    value={`${activeGoal.targetWeight}kg`}
                                />
                            </View>
                            <CircProgress
                                //TODO: calculate this value if context is provided
                                value={50}
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
                                <Link to={HISTORY_ROUTE}>
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
                />
            </View>
        </>
    )
}