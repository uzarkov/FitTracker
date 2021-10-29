import { USER_SIGN_OUT_ACTION_PREFIX } from "../constants"
import { signOutReducer } from "./signOut"

describe('signOutReducer', () => {
    const sampleState = {
        user: {
            username: "sampleUsername",
            password: "samplePassword",
        },
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

        const action = { type: `${USER_SIGN_OUT_ACTION_PREFIX}-request` }

        // when
        const newState = signOutReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: sampleState.user,
            fetching: false,
            error: null,
        })
    })

    it('given success action should remove user from state', () => {
        // given
        const startingState = { ...sampleState }
        const action = { type: `${USER_SIGN_OUT_ACTION_PREFIX}-success` }

        // when
        const newState = signOutReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: {},
            fetching: false,
            error: null,
        })
    })

    it('given failure action should set proper error message', () => {
        // given
        const startingState = { ...sampleState }

        const action = {
            type: `${USER_SIGN_OUT_ACTION_PREFIX}-failure`,
            error: {
                message: "Some error message",
            }
        }

        // when
        const newState = signOutReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            user: sampleState.user,
            fetching: false,
            error: action.error,
        })
    })
})