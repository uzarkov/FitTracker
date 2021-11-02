import { FETCH_USER_PROFILE_ACTION_PREFIX, USER_SIGN_IN_ACTION_PREFIX } from "../constants"
import { fetchUserProfileReducer } from "./fetchUserProfile"

describe('fetchUserProfileReducer', () => {
    const sampleState = {
        userProfile: {},
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

        const action = { type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-request` }

        // when
        const newState = fetchUserProfileReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            userProfile: {},
            fetching: true,
            error: null,
        })
    })

    it('given success action should initialize user profile data', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }

        const action = {
            type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-success`,
            payload: {
                birthDate: "01-01-2000",
                name: "Jan Kowalski",
            }
        }

        // when
        const newState = fetchUserProfileReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            userProfile: action.payload,
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
            type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = fetchUserProfileReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            userProfile: {},
            fetching: false,
            error: action.error,
        })
    })
})