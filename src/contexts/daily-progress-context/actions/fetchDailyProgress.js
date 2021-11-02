import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../../../firebase/config';
import { FETCH_DAILY_PROGRESS_ACTION_PREFIX } from "../constants"
import { getDailyProgressPlaceholder } from '../utils';

export const fetchDailyProgress = (dispatch, { uid, date, caloricDemand = 0 }) => {
    dispatch({ type: `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-request` });

    const docRef = doc(Firestore, 'users', uid, 'daily-progresses', date);

    getDoc(docRef)
        .then(docSnap => {
            dispatch({
                type: `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-success`,
                payload: docSnap.exists() ? docSnap.data() : getDailyProgressPlaceholder(date, caloricDemand),
            });
        })
}

export const fetchDailyProgressReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        }
        case `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-success`: {
            const dailyProgress = action.payload;
            return {
                ...state,
                fetching: false,
                days: {
                    ...state.days,
                    [`${dailyProgress.date}`]: dailyProgress
                }
            }
        }
        case `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-failure`: {
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