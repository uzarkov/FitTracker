import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";
import { FirebaseApp } from "../../../firebase/config";
import { USER_SIGN_UP_ACTION_PREFIX } from "../constants"

export const signUp = (dispatch, { email, password, name, birthDate }) => {
    dispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-request` });

    const auth = getAuth(FirebaseApp);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            // TODO: Add user profile with {name} and {birthDate}
            dispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-success`, payload: userCredentials })
        })
        .catch((error) => {
            dispatch({ type: `${USER_SIGN_UP_ACTION_PREFIX}-failure`, error: error })
        });
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