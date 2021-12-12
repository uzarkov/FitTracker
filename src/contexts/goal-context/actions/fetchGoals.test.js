import { FETCH_GOALS_ACTION_PREFIX } from "../constants"
import { fetchGoalsReducer } from "./fetchGoals"

describe('fetchGoalsReducer', () => {
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

        const action = { type: `${FETCH_GOALS_ACTION_PREFIX}-request` }

        // when
        const newState = fetchGoalsReducer(startingState, action)

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
            type: `${FETCH_GOALS_ACTION_PREFIX}-success`,
            payload: [
                {
                    active: false,
                    caloricDemand: 2000,
                    startDate: "27-07-2021 12:30:00",
                    startingWeight: 72.2,
                    targetWeight: 66,
                    type: 'LOSE_WEIGHT',
                },
                {
                    active: false,
                    caloricDemand: 3300,
                    startDate: "30-10-2021 12:30:00",
                    startingWeight: 66,
                    targetWeight: 70,
                    type: 'GAIN_WEIGHT',
                },
                {
                    active: true,
                    caloricDemand: 2700,
                    startDate: "10-12-2021 12:30:00",
                    minWeight: 68,
                    maxWeight: 72,
                    type: 'MAINTAIN_WEIGHT',
                },
            ]
        }

        // when
        const newState = fetchGoalsReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [action.payload[2], action.payload[1], action.payload[0]],
            activeGoal: action.payload[2],
            fetching: false,
            error: null,
        })
    })

    it('given success action when there are no goals should initialize state', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }

        const action = {
            type: `${FETCH_GOALS_ACTION_PREFIX}-success`,
            payload: []
        }

        // when
        const newState = fetchGoalsReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: { isPlaceholder: true },
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
            type: `${FETCH_GOALS_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = fetchGoalsReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            goals: [],
            activeGoal: {},
            fetching: false,
            error: action.error,
        })
    })
})