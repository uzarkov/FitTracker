import { USER_SIGN_UP_ACTION_PREFIX } from "../constants"
import { signUpReducer } from "./signUp"

describe('signUpReducer', () => {
    const sampleState = {
        user: {},
        fetching: false,
        error: null,
        signingUp: false,
        signingUpError: null,
    }

    it('given request action should reset state', () => {
        // given
        const startingState = {
            ...sampleState,
            signingUpError: {
                message: "Some error message",
            }
        }

        const action = { type: `${USER_SIGN_UP_ACTION_PREFIX}-request` }

        // when
        const newState = signUpReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: {},
            fetching: false,
            error: null,
            signingUp: true,
            signingUpError: null,
        })
    })

    it('given success action should set signed up flag to true', () => {
        // given
        const startingState = {
            ...sampleState,
            signingUp: true,
        }

        const action = {
            type: `${USER_SIGN_UP_ACTION_PREFIX}-success`,
            payload: {
                user: {
                    displayName: "sampleUserDisplayName",
                    email: "sampleUserEmail",
                    uid: "sampleUserUid"
                }
            }
        }

        // when
        const newState = signUpReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: {},
            fetching: false,
            error: null,
            signingUp: false,
            signingUpError: null,
        })
    })

    it('given failure action should set proper error message', () => {
        // given
        const startingState = {
            ...sampleState,
            signingUp: true,
        }

        const action = {
            type: `${USER_SIGN_UP_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = signUpReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: {},
            fetching: false,
            error: null,
            signingUp: false,
            signingUpError: action.error,
        })
    })
})