import { doc, updateDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { UPDATE_DAILY_PROGRESS_ACTION_PREFIX } from "../constants";
import assert from 'assert';
import { setDailyProgress } from "./setDailyProgress";

export const updateDailyProgress = (dispatch, { uid, dailyProgress, updatedFields }) => {
    if (dailyProgress.isPlaceholder) {
        const updatedDailyProgress = {
            ...dailyProgress,
            ...updatedFields
        }
        delete updatedDailyProgress.isPlaceholder

        setDailyProgress(dispatch, { uid, updatedDailyProgress })
    } else {
        update(dispatch, { uid, date: dailyProgress.date, updatedFields })
    }
}

const update = (dispatch, { uid, date, updatedFields }) => {
    dispatch({
        type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-request`,
        payload: {
            date,
            updatedFields,
        },
    });

    const docRef = doc(Firestore, 'users', uid, 'daily-progresses', date);

    updateDoc(docRef, updatedFields)
        .then(() => onSuccess(dispatch), () => onFailure(dispatch, date, updatedFields))
}

const onSuccess = (dispatch) => {
    dispatch({ type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-success` })
}

const onFailure = (dispatch, date, updatedFields) => {
    dispatch({
        type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-failure`,
        payload: {
            date,
            updatedFields,
        },
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
            const { date, updatedFields } = action.payload;
            const originalDailyProgress = state.days[date];

            originalDailyProgressWrapper.set(originalDailyProgress);
            // Original daily progress won't ever be undefined at this point because
            // of placeholder setting when fetched daily progress does not exist
            assert(originalDailyProgressWrapper.get());

            return {
                ...state,
                days: {
                    ...state.days,
                    [`${date}`]: {
                        ...originalDailyProgress,
                        ...updatedFields
                    }
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