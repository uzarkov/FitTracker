import { SET_GOAL_ACTION_PREFIX } from "../constants"
import { setGoalReducer } from "./setGoal"

describe('setGoalReducer', () => {
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

        const action = { type: `${SET_GOAL_ACTION_PREFIX}-request` }

        // when
        const newState = setGoalReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: {},
            fetching: false,
            error: null,
        })
    })

    it('given success action should initialize state', () => {
        // given
        const startingState = {
            ...sampleState,
            activeGoal: { isPlaceholder: true }
        }

        const action = {
            type: `${SET_GOAL_ACTION_PREFIX}-success`,
            payload: {
                active: true,
                caloricDemand: 2700,
                startDate: "10-12-2021 12:30:00",
                minWeight: 68,
                maxWeight: 72,
                type: 'MAINTAIN_WEIGHT',
            },
        }

        // when
        const newState = setGoalReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [action.payload],
            activeGoal: action.payload,
            fetching: false,
            error: null,
        })
    })

    it('given failure action should set proper error message', () => {
        // given
        const startingState = {
            ...sampleState,
            activeGoal: { isPlaceholder: true }
        }

        const action = {
            type: `${SET_GOAL_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = setGoalReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: { isPlaceholder: true },
            fetching: false,
            error: action.error,
        })
    })
})