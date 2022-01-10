import { getAuth, signOut as signUserOut } from 'firebase/auth';
import { FirebaseApp } from '../../../firebase/config';
import { showErrorToast, showSuccessToast } from '../../../utils/toasts';
import { USER_SIGN_OUT_ACTION_PREFIX } from '../constants';

export const signOut = (dispatch) => {
    dispatch({ type: `${USER_SIGN_OUT_ACTION_PREFIX}-request` });

    const auth = getAuth(FirebaseApp);

    signUserOut(auth)
        .then(() => {
            dispatch({ type: `${USER_SIGN_OUT_ACTION_PREFIX}-success` })
            showSuccessToast("Wylogowano pomyślnie")
        })
        .catch((error) => {
            dispatch({ type: `${USER_SIGN_OUT_ACTION_PREFIX}-failure`, error: error })
            showErrorToast(error.message)
        });
}

export const signOutReducer = (state, action) => {
    switch (action.type) {
        case `${USER_SIGN_OUT_ACTION_PREFIX}-request`: {
            return {
                ...state,
                error: null,
            }
        }
        case `${USER_SIGN_OUT_ACTION_PREFIX}-success`: {
            return {
                ...state,
                fetching: false,
                user: {},
            }
        }
        case `${USER_SIGN_OUT_ACTION_PREFIX}-failure`: {
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