import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { FirebaseApp } from "../../../firebase/config";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { updateUserProfile } from "../../user-profile-context/actions/updateUserProfile";
import { USER_SIGN_UP_ACTION_PREFIX } from "../constants";
import { validateSignUp } from "../utils/signUpValidation";

export const signUp = (authDispatch, userProfileDispatch, { email, password, passwordConfirmation, name, birthDate }) => {
    authDispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-request` });

    try {
        validateSignUp(password, email, passwordConfirmation, name, birthDate);
    } catch (error) {
        authDispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-failure`, error: error });
        showErrorToast(error.message)
        return;
    }

    const auth = getAuth(FirebaseApp);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            const uid = userCredentials.user.uid
            createUserProfile(userProfileDispatch, uid, name, birthDate)
            authDispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-success` })
            showSuccessToast("Konto utworzone pomyślnie")
        })
        .catch((error) => {
            authDispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-failure`, error: error })
            showErrorToast(error.message)
        });
}

const createUserProfile = (userProfileDispatch, uid, name, birthDate) => {
    updateUserProfile(userProfileDispatch, {
        uid: uid,
        updatedProfile: {
            name: name,
            birthDate: birthDate,
        }
    })
}

export const signUpReducer = (state, action) => {
    switch (action.type) {
        case `${USER_SIGN_UP_ACTION_PREFIX}-request`: {
            return {
                ...state,
                signingUp: true,
                signingUpError: null,
            }
        }
        case `${USER_SIGN_UP_ACTION_PREFIX}-success`: {
            return {
                ...state,
                signingUp: false,
            }
        }
        case `${USER_SIGN_UP_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                signingUp: false,
                signingUpError: action.error,
            }
        }
        default: {
            throw new Error(`Unhandled exception type ${action.type}`);
        }
    }
}