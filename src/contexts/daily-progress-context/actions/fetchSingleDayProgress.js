import { doc, getDoc } from 'firebase/firestore';
import { Firestore } from '../../../firebase/config';
import { FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX } from "../constants"

export const fetchSingleDayProgress = (dispatch, { uid, date, caloricDemand = 0 }) => {
    dispatch({ type: `${FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX}-request` });

    const docRef = doc(Firestore, 'users', uid, 'daily-progresses', date);

    getDoc(docRef)
        .then(docSnap => {
            dispatch({
                type: `${FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX}-success`,
                payload: docSnap.exists() ? docSnap.data() : getDailyProgressPlaceholder(date, caloricDemand),
            });
        })
}

export const getDailyProgressPlaceholder = (date, caloricDemand) => {
    return {
        activities: [],
        date: date,
        products: [],
        targetKcal: caloricDemand,
        totalCarbs: 0,
        totalFats: 0,
        totalKcal: 0,
        totalProteins: 0,
        isPlaceholder: true,
    }
}

export const fetchSingleDayProgressReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        }
        case `${FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX}-success`: {
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
        case `${FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX}-failure`: {
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