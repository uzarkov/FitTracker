import React, { useEffect } from 'react';
import { Text, View } from "react-native";
import { styles } from "./ProfileViewStyles";
import { TopBar } from '../../components/TopBar/TopBar';
import { useAuth } from '../../contexts/auth-context/authContext';
import { fetchUserProfile } from '../../contexts/user-profile-context/actions/fetchUserProfile';
import { useUserProfile } from '../../contexts/user-profile-context/userProfileContext';
import { CircProgress } from "../../components/common/circ-progress/CircProgress";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { InfoLabel } from "../../components/common/info-label/InfoLabel";
import { calculateGoalProgress } from '../../contexts/goal-context/utils';
import { useGoal } from '../../contexts/goal-context/goalContext';
import { useBodyMeasurements } from '../../contexts/body-measurements-context/bodyMeasurementsContext';
import { fetchLatestBodyMeasurement } from '../../contexts/body-measurements-context/actions/fetchLatestBodyMeasurement';
import { fetchCurrentGoal } from '../../contexts/goal-context/actions/fetchCurrentGoal';

export const ProfileView = () => {

    const EMAIL_ADDRESS = "Adres email";
    const BIRTHDATE = "Data urodzenia";
    const CURRENT_GOAL = "Aktualny cel";

    const [userState] = useAuth();
    const { user } = userState;

    const [userProfileState, userProfileDispatch] = useUserProfile();
    const { userProfile, fetching: fetchingUserProfile, error } = userProfileState;

    const [goalsState, goalsDispatch] = useGoal();
    const { activeGoal, fetching: fetchingGoal } = goalsState;

    const [bodyMeasurementsState, measurementsDispatch] = useBodyMeasurements();
    const { latestBodyMeasurement } = bodyMeasurementsState

    useEffect(() => {
        fetchUserProfile(userProfileDispatch, user);
        fetchLatestBodyMeasurement(measurementsDispatch, { uid: user.uid })
        fetchCurrentGoal(goalsDispatch, { uid: user.uid })
    }, [])

    const currentWeight = latestBodyMeasurement?.weight || activeGoal.startingWeight

    return (
        <>
            <TopBar />
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={styles.group}>
                        <MaterialIcons
                            name={"account-circle"}
                            color={"#03DAC5"}
                            size={80}
                        />
                        <Text style={[styles.title, styles.text]}>
                            {userProfile.name}
                        </Text>
                    </View>
                    <InfoLabel
                        text={EMAIL_ADDRESS}
                        value={user.email}
                    />
                    <InfoLabel
                        text={BIRTHDATE}
                        value={userProfile.birthDate}
                    />
                    <View style={styles.group}>
                        <Text style={[styles.goal, styles.text]}>
                            {CURRENT_GOAL}
                        </Text>
                        <CircProgress
                            value={calculateGoalProgress(activeGoal, currentWeight)}
                            radius={50}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}