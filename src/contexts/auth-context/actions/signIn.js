import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp } from '../../../firebase/config';
import { showErrorToast, showSuccessToast } from '../../../utils/toasts';
import { USER_SIGN_IN_ACTION_PREFIX } from '../constants';

export const signIn = (dispatch, { email, password }) => {
    dispatch({ type: `${USER_SIGN_IN_ACTION_PREFIX}-request` });

    const auth = getAuth(FirebaseApp);

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
            dispatch({ type: `${USER_SIGN_IN_ACTION_PREFIX}-success`, payload: userCredentials })
            showSuccessToast("Zalogowano pomyślnie")
        })
        .catch((error) => {
            dispatch({ type: `${USER_SIGN_IN_ACTION_PREFIX}-failure`, error: error })
            if (error.message.includes('invalid')) {
                showErrorToast("Niepoprawny login lub hasło")
            } else {
                showErrorToast(error.message)
            }
        });
}

export const signInReducer = (state, action) => {
    switch (action.type) {
        case `${USER_SIGN_IN_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        }
        case `${USER_SIGN_IN_ACTION_PREFIX}-success`: {
            return {
                ...state,
                fetching: false,
                user: action.payload.user,
            }
        }
        case `${USER_SIGN_IN_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                fetching: false,
                error: action.error,
            }
        }
        default: {
            throw new Error(`Unhandled action type ${action.type}`);
        }
    }
}