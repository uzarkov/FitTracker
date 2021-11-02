import { FETCH_USER_PROFILE_ACTION_PREFIX, UPDATE_USER_PROFILE_ACTION_PREFIX } from "./constants"
import { userProfileReducer } from "./userProfileReducer"

jest.mock('./actions/fetchUserProfile')
jest.mock('./actions/updateUserProfile')

const { fetchUserProfileReducer } = require('./actions/fetchUserProfile')
const { updateUserProfileReducer } = require('./actions/updateUserProfile')

describe('profileReducer', () => {
    const sampleState = {
        user: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        fetchUserProfileReducer.mockReset()
        updateUserProfileReducer.mockReset()
    })

    it('given fetch user profile action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-request` }

        // when
        userProfileReducer({ ...sampleState }, action)

        // then
        expect(fetchUserProfileReducer).toBeCalled()
    })

    it('given update user profile action should call correct reducer', () => {
        // given
        const action = { type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-request`, payload: {} }

        // when
        userProfileReducer({ ...sampleState }, action)

        // then
        expect(updateUserProfileReducer).toBeCalled()
    })
})