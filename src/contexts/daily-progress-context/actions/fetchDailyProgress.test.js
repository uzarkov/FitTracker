import { FETCH_DAILY_PROGRESS_ACTION_PREFIX } from "../constants"
import { fetchDailyProgressReducer } from "./fetchDailyProgress"

describe('fetchDailyProgressReducer', () => {
    const sampleState = {
        days: {},
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

        const action = { type: `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-request` }

        // when
        const newState = fetchDailyProgressReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            days: {},
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
            type: `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-success`,
            payload: {
                activities: [{
                    name: "Running",
                    burnedKcal: 200,
                }],
                date: "30-10-2021",
                products: [
                    "users/9ezfIQTPJwN6GLH1kxVRdy16s1M2/products/ygbzM11Ni1MpwzFllrT7"
                ],
                targetKcal: 2000,
                totalCarbs: 79,
                totalFats: 0.9,
                totalKcal: 357,
                totalProteins: 7.9,
            }
        }

        // when
        const newState = fetchDailyProgressReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            days: {
                "30-10-2021": action.payload,
            },
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
            type: `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = fetchDailyProgressReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            days: {},
            fetching: false,
            error: action.error,
        })
    })
})