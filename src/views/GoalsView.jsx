import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from "react-native";
import { TopBar } from '../components/TopBar';
import { useAuth } from '../contexts/auth-context/authContext';
import { fetchCurrentGoal } from '../contexts/goal-context/actions/fetchCurrentGoal';
import { setGoal } from '../contexts/goal-context/actions/setGoal';
import { useGoal } from '../contexts/goal-context/goalContext';
import moment from 'moment';
import { GOAL_TYPES } from '../contexts/goal-context/constants';

export const GoalsView = () => {
    const [userState] = useAuth();
    const { user } = userState;

    const [goalsState, goalsDispatch] = useGoal();
    const { activeGoal, fetching } = goalsState;

    useEffect(() => {
        fetchCurrentGoal(goalsDispatch, { uid: user.uid })
    }, [])

    const setNewGoal = () => {
        setGoal(goalsDispatch, {
            uid: user.uid,
            goal: {
                caloricDemand: 9999,
                startDate: moment().format('DD-MM-YYYY HH:mm:ss'),
                minWeight: 68,
                maxWeight: 72,
                type: GOAL_TYPES.MAINTAIN_WEIGHT,
            },
        })
    }

    if (activeGoal && activeGoal.isPlaceholder) {
        return (
            <>
                <TopBar />
                <View style={styles.container}>
                    <Text style={styles.text}>{"You didn't set up a goal yet."}</Text>
                    <Pressable
                        style={styles.button}
                        onPress={setNewGoal}
                    >
                        <Text style={styles.text}>Set new goal</Text>
                    </Pressable>
                </View>
            </>
        )
    }

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <Text style={styles.text}>{activeGoal.caloricDemand}</Text>
                <Text style={styles.text}>{activeGoal.startDate}</Text>
                {activeGoal.type === GOAL_TYPES.MAINTAIN_WEIGHT ?
                    <>
                        <Text style={styles.text}>{activeGoal.minWeight}</Text>
                        <Text style={styles.text}>{activeGoal.maxWeight}</Text>
                    </>
                    :
                    <>
                        <Text style={styles.text}>{activeGoal.startingWeight}</Text>
                        <Text style={styles.text}>{activeGoal.targetWeight}</Text>
                    </>
                }
                <Text style={styles.text}>{activeGoal.type}</Text>
                <Pressable
                    style={styles.button}
                    onPress={setNewGoal}
                >
                    <Text style={styles.text}>Set new goal</Text>
                </Pressable>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 24,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        minWidth: 100,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        margin: 12,
        height: 50,
        backgroundColor: '#404040',
    },
})