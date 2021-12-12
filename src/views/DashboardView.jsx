import moment from 'moment';
import React, { useEffect } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { TopBar } from '../components/TopBar';
import { addActivity, removeActivity } from '../contexts/activity-context/actions';
import { signOut } from '../contexts/auth-context/actions/signOut';
import { useAuth } from '../contexts/auth-context/authContext';
import { fetchDailyProgress } from '../contexts/daily-progress-context/actions/fetchDailyProgress';
import { useDailyProgress } from '../contexts/daily-progress-context/dailyProgressContext';
import { getDailyProgressPlaceholder } from '../contexts/daily-progress-context/utils';
import { addProduct, removeProduct } from '../contexts/product-context/actions';

export const DashboardView = () => {
    const [authState, authDispatch] = useAuth();
    const { user } = authState;

    const [dailyProgressState, dailyProgressDispatch] = useDailyProgress();
    const { days, fetching, error } = dailyProgressState;

    const today = moment().format('DD-MM-YYYY');
    const dailyProgress = days[today] || getDailyProgressPlaceholder(today, 0);

    useEffect(() => {
        fetchDailyProgress(dailyProgressDispatch, {
            uid: user.uid,
            date: today,
            defaultCaloricDemand: 0, // TODO: Use caloric demand from active goal here
        });
    }, [])

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

    return (
        <>
            <TopBar />
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
                    <Text style={styles.text}>{`Date: ${dailyProgress.date}`}</Text>
                    <Text style={styles.text}>{`Target kcal: ${dailyProgress.targetKcal}`}</Text>
                    <Text style={styles.text}>{`Total kcal: ${dailyProgress.products.reduce((acc, v) => acc + v.kcal, 0)}`}</Text>
                    <Text style={styles.text}>{`Total carbs: ${dailyProgress.products.reduce((acc, v) => acc + v.carbs, 0)}`}</Text>
                    <Text style={styles.text}>{`Total proteins: ${dailyProgress.products.reduce((acc, v) => acc + v.proteins, 0)}`}</Text>
                    <Text style={styles.text}>{`Total fats: ${dailyProgress.products.reduce((acc, v) => acc + v.fats, 0)}`}</Text>
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
                        onPress={onSignOut}
                    >
                        <Text style={styles.text}>Sign out</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={addDailyProgressProduct}
                    >
                        <Text style={styles.text}>Add product</Text>
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