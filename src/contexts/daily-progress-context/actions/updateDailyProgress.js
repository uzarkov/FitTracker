import { doc, setDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { UPDATE_DAILY_PROGRESS_ACTION_PREFIX } from "../constants";
import assert from 'assert';

export const updateDailyProgress = (dispatch, { uid, updatedDailyProgress }) => {
    dispatch({
        type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-request`,
        payload: updatedDailyProgress,
    });

    const docRef = doc(Firestore, 'users', uid, 'daily-progresses', updatedDailyProgress.date);

    setDoc(docRef, updatedDailyProgress)
        .then(() => onSuccess(dispatch), () => onFailure(dispatch, updatedDailyProgress))
}

const onSuccess = (dispatch) => {
    dispatch({ type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-success` })
}

const onFailure = (dispatch, updatedDailyProgress) => {
    dispatch({
        type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-failure`,
        payload: updatedDailyProgress
    })
}

let originalDailyProgress = undefined;
const defaultOriginalDailyProgressWrapper = {
    set: (value) => originalDailyProgress = value,
    get: () => originalDailyProgress,
}

export const updateDailyProgressReducer = (state, action, originalDailyProgressWrapper = defaultOriginalDailyProgressWrapper) => {
    switch (action.type) {
        case `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-request`: {
            const updatedDailyProgress = action.payload;
            const { date } = updatedDailyProgress;

            originalDailyProgressWrapper.set(state.days[date]);
            assert(originalDailyProgressWrapper.get());

            return {
                ...state,
                days: {
                    ...state.days,
                    [`${date}`]: updatedDailyProgress,
                }
            }
        }
        case `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-success`: {
            originalDailyProgressWrapper.set(undefined);

            return {
                ...state,
            }
        }
        case `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-failure`: {
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