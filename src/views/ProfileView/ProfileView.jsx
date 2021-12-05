import React, { useEffect } from 'react';
import { Text, View } from "react-native";
import {styles} from "./ProfileViewStyles";
import { TopBar } from '../../components/TopBar';
import { useAuth } from '../../contexts/auth-context/authContext';
import { fetchUserProfile } from '../../contexts/user-profile-context/actions/fetchUserProfile';
import { useUserProfile } from '../../contexts/user-profile-context/userProfileContext';
import {CircProgress} from "../../components/common/circ-progress/CircProgress";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {InfoLabel} from "../../components/common/info-label/InfoLabel";

export const ProfileView = () => {

    const EMAIL_ADDRESS = "Adres email";
    const BIRTHDATE = "Data urodzenia";
    const CURRENT_GOAL = "Aktualny cel";

    const [userState] = useAuth();
    const { user } = userState;

    const [userProfileState, userProfileDispatch] = useUserProfile();
    const { userProfile, fetching, error } = userProfileState;

    useEffect(() => {
        fetchUserProfile(userProfileDispatch, user);
    }, [])

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
                    {/*TODO: fetch info about email*/}
                    <InfoLabel
                        text={EMAIL_ADDRESS}
                        value={"jank.kowalski@gmail.com"}
                    />
                    <InfoLabel
                        text={BIRTHDATE}
                        value={userProfile.birthDate}
                    />
                    <View style={styles.group}>
                        <Text style={[styles.goal, styles.text]}>
                            {CURRENT_GOAL}
                        </Text>
                        {/*TODO: fetch info about current progress */}
                        <CircProgress
                            value={50}
                            radius={50}
                        />
                    </View>
                </View>
            </View>
        </>
    )
}