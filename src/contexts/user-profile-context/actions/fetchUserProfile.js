import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../../../firebase/config';
import { FETCH_USER_PROFILE_ACTION_PREFIX } from '../constants';

export const fetchUserProfile = (dispatch, { uid }) => {
    dispatch({ type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-request` });

    const docRef = doc(Firestore, 'users', uid)

    getDoc(docRef)
        .then(docSnap => {
            dispatch({ type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-success`, payload: docSnap.data() })
        })
        .catch(error => {
            dispatch({ type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-failure`, error: error })
        })
}

export const fetchUserProfileReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_USER_PROFILE_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        }
        case `${FETCH_USER_PROFILE_ACTION_PREFIX}-success`: {
            return {
                ...state,
                fetching: false,
                userProfile: action.payload,
            }
        }
        case `${FETCH_USER_PROFILE_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                fetching: false,
                error: action.error,
            }
        }
        default: {
            throw new Error(`Unhandled exception type ${action.type}`);
        }
    }
}