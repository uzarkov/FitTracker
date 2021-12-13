import { collection, addDoc, updateDoc, where, doc, getDocs, query } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { SET_GOAL_ACTION_PREFIX } from "../constants"

export const setGoal = (dispatch, { uid, goal }) => {
    dispatch({ type: `${SET_GOAL_ACTION_PREFIX}-request` })

    const collectionRef = collection(Firestore, 'users', uid, 'goals');
    const q = query(collectionRef, where('active', '==', true));

    const newGoal = {
        ...goal,
        active: true,
    }

    getDocs(q)
        .then(querySnap => Promise.all(querySnap.docs.map(doc => deactivateGoal(uid, doc.id))))
        .then(() => addDoc(collectionRef, newGoal))
        .then(() => onSuccess(dispatch, newGoal), () => onFailure(dispatch))
}

const deactivateGoal = (uid, goalId) => {
    const docRef = doc(Firestore, 'users', uid, 'goals', goalId)

    return updateDoc(docRef, {
        active: false
    })
}

const onSuccess = (dispatch, newGoal) => {
    dispatch({
        type: `${SET_GOAL_ACTION_PREFIX}-success`,
        payload: newGoal
    })
}

const onFailure = (dispatch) => {
    dispatch({ type: `${SET_GOAL_ACTION_PREFIX}-failure` })
}

export const setGoalReducer = (state, action) => {
    switch (action.type) {
        case `${SET_GOAL_ACTION_PREFIX}-request`: {
            return {
                ...state,
                error: null,
            }
        }
        case `${SET_GOAL_ACTION_PREFIX}-success`: {
            const newGoal = action.payload;

            return {
                ...state,
                goals: [newGoal, ...state.goals],
                activeGoal: newGoal,
            }
        }
        case `${SET_GOAL_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                error: action.error,
            }
        }
        default: {
            throw new Error(`Unhandled action type ${action.type}`);
        }
    }
}