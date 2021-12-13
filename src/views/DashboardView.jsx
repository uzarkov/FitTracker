import moment from 'moment';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from 'react/cjs/react.development';
import { TopBar } from '../components/TopBar';
import { addActivity, removeActivity } from '../contexts/activity-context/actions';
import { signOut } from '../contexts/auth-context/actions/signOut';
import { useAuth } from '../contexts/auth-context/authContext';
import { fetchDailyProgress } from '../contexts/daily-progress-context/actions/fetchDailyProgress';
import { useDailyProgress } from '../contexts/daily-progress-context/dailyProgressContext';
import { countTotalsOf, getDailyProgressPlaceholder } from '../contexts/daily-progress-context/utils';
import { fetchCurrentGoal } from '../contexts/goal-context/actions/fetchCurrentGoal';
import { useGoal } from '../contexts/goal-context/goalContext';
import { addProduct, removeProduct } from '../contexts/product-context/actions';

export const DashboardView = () => {
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

    const onSignOut = () => {
        signOut(authDispatch)
    }

    const addDailyProgressProduct = () => {
        addProduct(dailyProgressDispatch, {
            uid: user.uid,
            dailyProgress,
            newProduct: {
                name: "White rice",
                kcal: 357,
                proteins: 7.9,
                carbs: 79,
                fats: 0.9
            }
        })
    }

    const removeDailyProgressProduct = (index) => {
        removeProduct(dailyProgressDispatch, {
            uid: user.uid,
            dailyProgress,
            index,
        })
    }

    const addDailyProgressActivity = () => {
        addActivity(dailyProgressDispatch, {
            uid: user.uid,
            dailyProgress,
            newActivity: {
                name: "Running",
                burnedKcal: 500
            }
        })
    }

    const removeDailyProgressActivity = (index) => {
        removeActivity(dailyProgressDispatch, {
            uid: user.uid,
            dailyProgress,
            index,
        })
    }

    const dailyProgressTotals = countTotalsOf(dailyProgress)

    return (
        <>
            <TopBar />
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
                    <Text style={styles.text}>{`Date: ${dailyProgress.date}`}</Text>
                    <Text style={styles.text}>{`Target kcal: ${dailyProgress.targetKcal}`}</Text>
                    <Text style={styles.text}>{`Total kcal: ${dailyProgressTotals.totalKcal}`}</Text>
                    <Text style={styles.text}>{`Total carbs: ${dailyProgressTotals.totalCarbs}`}</Text>
                    <Text style={styles.text}>{`Total proteins: ${dailyProgressTotals.totalProteins}`}</Text>
                    <Text style={styles.text}>{`Total fats: ${dailyProgressTotals.totalFats}`}</Text>
                    {dailyProgress.activities.map((activity, idx) => (
                        <>
                            <Text style={styles.text}>{`Name: ${activity.name}`}</Text>
                            <Text style={styles.text}>{`Kcal: ${activity.burnedKcal}`}</Text>
                            <Pressable
                                style={styles.button}
                                onPress={() => removeDailyProgressActivity(idx)}
                            >
                                <Text style={styles.text}>Remove</Text>
                            </Pressable>
                        </>
                    ))}
                    <Pressable
                        style={styles.button}
                        onPress={addDailyProgressActivity}
                    >
                        <Text style={styles.text}>Add activity</Text>
                    </Pressable>
                    {dailyProgress.products.map((product, idx) => (
                        <>
                            <Text style={styles.text}>{`Name: ${product.name}`}</Text>
                            <Text style={styles.text}>{`Kcal: ${product.kcal}`}</Text>
                            <Text style={styles.text}>{`Proteins: ${product.proteins}`}</Text>
                            <Text style={styles.text}>{`Carbs: ${product.carbs}`}</Text>
                            <Text style={styles.text}>{`Fats: ${product.fats}`}</Text>
                            <Pressable
                                style={styles.button}
                                onPress={() => removeDailyProgressProduct(idx)}
                            >
                                <Text style={styles.text}>Remove</Text>
                            </Pressable>
                        </>
                    ))}
                    <Pressable
                        style={styles.button}
                        onPress={addDailyProgressProduct}
                    >
                        <Text style={styles.text}>Add product</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={onSignOut}
                    >
                        <Text style={styles.text}>Sign out</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#353535',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        height: Dimensions.get('window').height,
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