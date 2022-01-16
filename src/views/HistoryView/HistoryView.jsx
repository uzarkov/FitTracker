import React, { useEffect, useState } from 'react';
import { Pressable, Text, TouchableWithoutFeedback, View } from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import { styles } from "./HistoryViewStyles";
import { globalStyles } from "../../global-styles/globalStyles";
import moment from "moment";
import { FoodAccordion } from "./accordions/food-acordion/FoodAccordion";
import { ActivityAccordion } from "./accordions/activity-accordion/ActivityAccordion";

import { TopBar } from "../../components/TopBar/TopBar";
import { MeasurementAccordion } from "./accordions/measurement-accordion/MeasurementAccordion";
import { useDailyProgress } from "../../contexts/daily-progress-context/dailyProgressContext";
import { countTotalsOf, getDailyProgressPlaceholder } from "../../contexts/daily-progress-context/utils";
import { LoadingView } from "../LoadingView/LoadingView";
import { useBodyMeasurements } from "../../contexts/body-measurements-context/bodyMeasurementsContext";
import { fetchBodyMeasurement } from "../../contexts/body-measurements-context/actions/fetchBodyMeasurement";
import { useAuth } from "../../contexts/auth-context/authContext";
import { fetchDailyProgress } from '../../contexts/daily-progress-context/actions/fetchDailyProgress';


export const HistoryView = () => {
    const today = moment().format('DD-MM-YYYY');

    const [date, setDate] = useState(today);
    const [calendarOpen, isCalendarOpen] = useState(false);

    const [foodAccordion, setFoodAccordion] = useState(false);
    const [activityAccordion, setActivityAccordion] = useState(false);
    const [measurementAccordion, setMeasurementAccordion] = useState(false);

    const [dailyProgressState, dailyProgressDispatch] = useDailyProgress();
    const { days, fetching, } = dailyProgressState;
    const dailyProgress = days[date] || getDailyProgressPlaceholder(today, 0);

    const [userState] = useAuth();
    const { user } = userState;

    const [bodyMeasurementsState, measurementsDispatch] = useBodyMeasurements();
    const { bodyMeasurements } = bodyMeasurementsState;

    useEffect(() => {
        fetchBodyMeasurement(measurementsDispatch, { uid: user.uid, date: date })
        fetchDailyProgress(dailyProgressDispatch, { uid: user.uid, date: date })
    }, [date])

    const dailyProgressTotals = countTotalsOf(dailyProgress)

    const toggleFoodAccordion = () => {
        setFoodAccordion(!foodAccordion)
        setActivityAccordion(false)
        setMeasurementAccordion(false)
    }

    const toggleActivityAccordion = () => {
        setFoodAccordion(false)
        setActivityAccordion(!activityAccordion)
        setMeasurementAccordion(false)
    }

    const toggleMeasurementAccordion = () => {
        setFoodAccordion(false)
        setActivityAccordion(false)
        setMeasurementAccordion(!measurementAccordion)
    }

    return (
        <>
            <TopBar />
            {fetching ?
                <LoadingView />
                : (calendarOpen ?
                    <TouchableWithoutFeedback
                        style={styles.container}
                        onPress={() => isCalendarOpen(false)}
                    >
                        <View style={styles.container}>
                            <CalendarPicker
                                months={["Sty", "Lut", "Mar", "Kwi", "Maj",
                                    "Cze", "Lip", "Sie", "Wrz", "Paz", "Lis", "Gru"]}
                                startFromMonday={true}
                                nextTitle={"Nastepny"}
                                previousTitle={"Poprzedni"}
                                selectMonthTitle={"Wybierz miesiac w roku "}
                                selectYearTitle={"Wybierz Rok"}
                                selectedDayColor={'#03DAC5'}
                                todayBackgroundColor={"transparent"}
                                textStyle={{ color: 'white' }}
                                onDateChange={(date) => {
                                    setDate(
                                        moment(date).utc().format('DD-MM-YYYY')
                                    )
                                    isCalendarOpen(false)
                                }}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    :
                    <View style={styles.container}>
                        <View style={[globalStyles.shadowBox, styles.box]}>
                            <Text style={styles.title}>
                                Data
                            </Text>
                            <Pressable
                                onPress={() => isCalendarOpen(true)}
                                style={styles.button}
                            >
                                <Text style={[styles.buttonText, styles.value]}>
                                    {date}
                                </Text>
                            </Pressable>
                            <Text style={styles.title}>
                                Całkowity bilans kaloryczny
                            </Text>
                            <Text style={styles.value}>
                                {dailyProgressTotals.totalKcal}
                            </Text>
                            <View style={styles.accordionsContainer}>
                                <FoodAccordion
                                    open={foodAccordion}
                                    setOpen={() => toggleFoodAccordion()}
                                    data={dailyProgress.products}
                                />
                                <ActivityAccordion
                                    open={activityAccordion}
                                    setOpen={() => toggleActivityAccordion()}
                                    data={dailyProgress.activities}
                                />
                                <MeasurementAccordion
                                    open={measurementAccordion}
                                    setOpen={() => toggleMeasurementAccordion()}
                                    data={bodyMeasurements[date] ? [bodyMeasurements[date]] : []}
                                />
                            </View>
                        </View>
                    </View>
                )
            }
        </>
    )
}

