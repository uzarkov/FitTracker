import { FETCH_DAILY_PROGRESS_ACTION_PREFIX, UPDATE_DAILY_PROGRESS_ACTION_PREFIX } from "./constants"
import { dailyProgressReducer } from "./dailyProgressReducer"

jest.mock('./actions/fetchDailyProgress')
jest.mock('./actions/updateDailyProgress')

const { fetchDailyProgressReducer } = require('./actions/fetchDailyProgress')
const { updateDailyProgressReducer } = require('./actions/updateDailyProgress')

describe('dailyProgressReducer', () => {
    const sampleState = {
        days: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        fetchDailyProgressReducer.mockReset()
        updateDailyProgressReducer.mockReset()
    })

    it('given fetch action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_DAILY_PROGRESS_ACTION_PREFIX}-request` }

        // when
        dailyProgressReducer({ ...sampleState }, action)

        // then
        expect(fetchDailyProgressReducer).toBeCalled()
    })

    it('given update action should call correct reducer', () => {
        // given
        const action = { type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-request` }

        // when
        updateDailyProgressReducer({ ...sampleState }, action)

        // then
        expect(updateDailyProgressReducer).toBeCalled()
    })
})