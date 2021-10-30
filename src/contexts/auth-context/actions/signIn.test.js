import { USER_SIGN_IN_ACTION_PREFIX } from "../constants"
import { signInReducer } from "./signIn"

describe('signInReducer', () => {
    const sampleState = {
        user: {},
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

        const action = { type: `${USER_SIGN_IN_ACTION_PREFIX}-request` }

        // when
        const newState = signInReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: {},
            fetching: true,
            error: null,
        })
    })

    it('given success action should initialize user auth data', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }

        const action = {
            type: `${USER_SIGN_IN_ACTION_PREFIX}-success`,
            payload: {
                user: {
                    displayName: "sampleUserDisplayName",
                    email: "sampleUserEmail",
                    uid: "sampleUserUid"
                }
            }
        }

        // when
        const newState = signInReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: action.payload.user,
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
            type: `${USER_SIGN_IN_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = signInReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: {},
            fetching: false,
            error: action.error,
        })
    })
})