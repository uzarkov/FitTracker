import { FETCH_CURRENT_GOAL_ACTION_PREFIX } from "../constants"
import { fetchCurrentGoalReducer } from "./fetchCurrentGoal"

describe('fetchCurrentGoalReducer', () => {
    const sampleState = {
        goals: [],
        activeGoal: {},
        fetching: false,
        error: null,
    }

    it('given request action should reset state', () => {
        // given
        const startingState = {
            ...sampleState,
            error: {
                message: "Some error message",
            }
        }

        const action = { type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-request` }

        // when
        const newState = fetchCurrentGoalReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: {},
            fetching: true,
            error: null,
        })
    })

    it('given success action should initialize state', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }

        const action = {
            type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-success`,
            payload: {
                active: true,
                caloricDemand: 2000,
                startDate: "30-10-2021",
                startingWeight: 72.2,
                targetWeight: 66,
                type: 'LOSE_WEIGHT',
            }
        }

        // when
        const newState = fetchCurrentGoalReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: action.payload,
            fetching: false,
            error: null,
        })
    })

    it('given failure action should set proper error message', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }

        const action = {
            type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = fetchCurrentGoalReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: {},
            fetching: false,
            error: action.error,
        })
    })
})