import { collection, getDocs, query, where } from "@firebase/firestore"
import { Firestore } from '../../../firebase/config'
import { FETCH_CURRENT_GOAL_ACTION_PREFIX } from "../constants"

export const fetchCurrentGoal = (dispatch, { uid }) => {
    dispatch({ type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-request` })

    const collectionRef = collection(Firestore, 'users', uid, 'goals')
    const q = query(collectionRef, where('active', '==', true));

    getDocs(q)
        .then(querySnap => {
            const currentGoal = (querySnap.size > 0 && querySnap.docs[0].data()) || { isUndefined: true }
            dispatch({ type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-success`, payload: currentGoal })
        })
        .catch(error => {
            dispatch({ type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-failure`, error: error })
        })
}

export const fetchCurrentGoalReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
                error: null,
            }
        }
        case `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-success`: {
            return {
                ...state,
                activeGoal: action.payload,
                fetching: false,
            }
        }
        case `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-failure`: {
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