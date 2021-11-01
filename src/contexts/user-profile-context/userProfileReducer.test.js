import { FETCH_USER_PROFILE_ACTION_PREFIX } from "./constants"
import { userProfileReducer } from "./userProfileReducer"

jest.mock('./actions/fetchUserProfile')

const { fetchUserProfileReducer } = require('./actions/fetchUserProfile')

describe('profileReducer', () => {
    const sampleState = {
        user: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        fetchUserProfileReducer.mockReset()
    })

    it('given sign in action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_USER_PROFILE_ACTION_PREFIX}-request` }

        // when
        userProfileReducer({ ...sampleState }, action)

        // then
        expect(fetchUserProfileReducer).toBeCalled()
    })
})