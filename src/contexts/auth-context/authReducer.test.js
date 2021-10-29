import { authReducer } from "./authReducer"
import { USER_SIGN_IN_ACTION_PREFIX, USER_SIGN_OUT_ACTION_PREFIX } from "./constants"

jest.mock('./actions/signIn')
jest.mock('./actions/signOut')

const { signInReducer } = require('./actions/signIn')
const { signOutReducer } = require('./actions/signOut')

describe('authReducer', () => {
    const sampleState = {
        user: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        signInReducer.mockReset()
        signOutReducer.mockReset()
    })

    it('given sign in action should call correct reducer', () => {
        // given
        const action = { type: `${USER_SIGN_IN_ACTION_PREFIX}-request` }

        // when
        authReducer({ ...sampleState }, action)

        // then
        expect(signInReducer).toBeCalled()
    })

    it('given sign out action should call correct reducer', () => {
        // given
        const action = { type: `${USER_SIGN_OUT_ACTION_PREFIX}-request` }

        // when
        authReducer({ ...sampleState }, action)

        // then
        expect(signOutReducer).toBeCalled()
    })
})