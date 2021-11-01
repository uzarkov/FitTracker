import { FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX } from "./constants"
import { dailyProgressReducer } from "./dailyProgressReducer"

jest.mock('./actions/fetchSingleDayProgress')

const { fetchSingleDayProgressReducer } = require('./actions/fetchSingleDayProgress')

describe('dailyProgressReducer', () => {
    const sampleState = {
        days: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        fetchSingleDayProgressReducer.mockReset()
    })

    it('given sign in action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX}-request` }

        // when
        dailyProgressReducer({ ...sampleState }, action)

        // then
        expect(fetchSingleDayProgressReducer).toBeCalled()
    })
})