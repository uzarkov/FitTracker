import { FETCH_DAILY_PROGRESS_ACTION_PREFIX, SET_DAILY_PROGRESS_ACTION_PREFIX, UPDATE_DAILY_PROGRESS_ACTION_PREFIX } from "./constants"
import { dailyProgressReducer } from "./dailyProgressReducer"

jest.mock('./actions/fetchDailyProgress')
jest.mock('./actions/setDailyProgress')
jest.mock('./actions/updateDailyProgress')

const { fetchDailyProgressReducer } = require('./actions/fetchDailyProgress')
const { setDailyProgressReducer } = require('./actions/setDailyProgress')
const { updateDailyProgressReducer } = require('./actions/updateDailyProgress')

describe('dailyProgressReducer', () => {
    const sampleState = {
        days: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        fetchDailyProgressReducer.mockReset()
        setDailyProgressReducer.mockReset()
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

    it('given set action should call correct reducer', () => {
        // given
        const action = { type: `${SET_DAILY_PROGRESS_ACTION_PREFIX}-request` }

        // when
        dailyProgressReducer({ ...sampleState }, action)

        // then
        expect(setDailyProgressReducer).toBeCalled()
    })

    it('given update action should call correct reducer', () => {
        // given
        const action = { type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-request` }

        // when
        dailyProgressReducer({ ...sampleState }, action)

        // then
        expect(updateDailyProgressReducer).toBeCalled()
    })
})