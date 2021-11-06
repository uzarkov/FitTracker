import { doc, setDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { UPDATE_USER_PROFILE_ACTION_PREFIX } from "../constants"

export const updateUserProfile = (dispatch, { uid, updatedProfile }) => {
    dispatch({
        type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-request`,
        payload: updatedProfile,
    });

    const docRef = doc(Firestore, 'users', uid);

    setDoc(docRef, updatedProfile)
        .then(() => onSuccess(dispatch), () => onFailure(dispatch))
}

const onSuccess = (dispatch) => {
    dispatch({ type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-success` })
}

const onFailure = (dispatch) => {
    dispatch({ type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-failure` })
}

let originalProfile = {};
const defaultOriginalProfileWrapper = {
    set: (value) => originalProfile = value,
    get: () => originalProfile,
}

export const updateUserProfileReducer = (state, action, originalProfileWrapper = defaultOriginalProfileWrapper) => {
    switch (action.type) {
        case `${UPDATE_USER_PROFILE_ACTION_PREFIX}-request`: {
            originalProfileWrapper.set(state.userProfile);

            return {
                ...state,
                userProfile: action.payload,
            }
        }
        case `${UPDATE_USER_PROFILE_ACTION_PREFIX}-success`: {
            originalProfileWrapper.set({});

            return {
                ...state,
            }
        }
        case `${UPDATE_USER_PROFILE_ACTION_PREFIX}-failure`: {
            const originalProfile = originalProfileWrapper.get();
            originalProfileWrapper.set({});

            return {
                ...state,
                userProfile: originalProfile,
            }
        }
        default: {
            throw new Error(`Unhandled action type ${action.type}`);
        }
    }
}