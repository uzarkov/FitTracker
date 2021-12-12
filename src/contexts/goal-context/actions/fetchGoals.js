import { collection, getDocs } from "@firebase/firestore"
import { Firestore } from '../../../firebase/config'
import { FETCH_GOALS_ACTION_PREFIX } from "../constants"
import moment from 'moment'

export const fetchGoals = (dispatch, { uid }) => {
    dispatch({ type: `${FETCH_GOALS_ACTION_PREFIX}-request` })

    const collectionRef = collection(Firestore, 'users', uid, 'goals')

    getDocs(collectionRef)
        .then(querySnap => {
            const docs = querySnap.map(doc => doc.data())
            dispatch({ type: `${FETCH_GOALS_ACTION_PREFIX}-success`, payload: docs })
        })
        .catch(error => {
            dispatch({ type: `${FETCH_GOALS_ACTION_PREFIX}-failure`, error: error })
        })
}

export const fetchGoalsReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_GOALS_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        }
        case `${FETCH_GOALS_ACTION_PREFIX}-success`: {
            const goals = [...action.payload];
            goals.sort((a, b) => {
                const dateA = moment(a.startDate, "DD-MM-YYYY hh:mm:ss")
                const dateB = moment(b.startDate, "DD-MM-YYYY hh:mm:ss")
                return dateA.isAfter(dateB) ? -1 : 1
            })

            return {
                ...state,
                goals: goals,
                activeGoal: (goals.length > 0 && goals[0]) || { isPlaceholder: true },
                fetching: false,
            }
        }
        case `${FETCH_GOALS_ACTION_PREFIX}-failure`: {
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