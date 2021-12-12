import { doc, setDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { SET_DAILY_PROGRESS_ACTION_PREFIX } from "../constants";
import assert from 'assert';

export const setDailyProgress = (dispatch, { uid, updatedDailyProgress }) => {
    dispatch({
        type: `${SET_DAILY_PROGRESS_ACTION_PREFIX}-request`,
        payload: updatedDailyProgress,
    });

    const docRef = doc(Firestore, 'users', uid, 'daily-progresses', updatedDailyProgress.date);

    setDoc(docRef, updatedDailyProgress)
        .then(() => onSuccess(dispatch), () => onFailure(dispatch, updatedDailyProgress))
}

const onSuccess = (dispatch) => {
    dispatch({ type: `${SET_DAILY_PROGRESS_ACTION_PREFIX}-success` })
}

const onFailure = (dispatch, updatedDailyProgress) => {
    dispatch({
        type: `${SET_DAILY_PROGRESS_ACTION_PREFIX}-failure`,
        payload: updatedDailyProgress
    })
}

let originalDailyProgress = undefined;
const defaultOriginalDailyProgressWrapper = {
    set: (value) => originalDailyProgress = value,
    get: () => originalDailyProgress,
}

export const setDailyProgressReducer = (state, action, originalDailyProgressWrapper = defaultOriginalDailyProgressWrapper) => {
    switch (action.type) {
        case `${SET_DAILY_PROGRESS_ACTION_PREFIX}-request`: {
            const updatedDailyProgress = action.payload;
            const { date } = updatedDailyProgress;

            originalDailyProgressWrapper.set(state.days[date]);
            // Original daily progress won't ever be undefined at this point because
            // of placeholder setting when fetched daily progress does not exist
            assert(originalDailyProgressWrapper.get());

            return {
                ...state,
                days: {
                    ...state.days,
                    [`${date}`]: updatedDailyProgress,
                }
            }
        }
        case `${SET_DAILY_PROGRESS_ACTION_PREFIX}-success`: {
            originalDailyProgressWrapper.set(undefined);

            return {
                ...state,
            }
        }
        case `${SET_DAILY_PROGRESS_ACTION_PREFIX}-failure`: {
            const { date } = action.payload;
            const originalDailyProgress = originalDailyProgressWrapper.get();
            originalDailyProgressWrapper.set(undefined);

            return {
                ...state,
                days: {
                    ...state.days,
                    [`${date}`]: originalDailyProgress
                },
            }
        }
        default: {
            throw new Error(`Unhandled exception type ${action.type}`);
        }
    }
}