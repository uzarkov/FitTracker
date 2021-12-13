import { FETCH_CURRENT_GOAL_ACTION_PREFIX, FETCH_GOALS_ACTION_PREFIX, SET_GOAL_ACTION_PREFIX } from "./constants"
import { goalReducer } from "./goalReducer"

jest.mock('./actions/fetchCurrentGoal')
jest.mock('./actions/fetchGoals')
jest.mock('./actions/setGoal')

const { fetchCurrentGoalReducer } = require('./actions/fetchCurrentGoal')
const { fetchGoalsReducer } = require('./actions/fetchGoals')
const { setGoalReducer } = require('./actions/setGoal')

describe('goalReducer', () => {
    const sampleState = {
        goals: [],
        activeGoal: {},
        fetching: false,
        error: null,
    }

    beforeEach(() => {
        fetchCurrentGoalReducer.mockReset()
        fetchGoalsReducer.mockReset()
        setGoalReducer.mockReset()
    })

    it('given fetch current goal action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_CURRENT_GOAL_ACTION_PREFIX}-request` }

        // when
        goalReducer({ ...sampleState }, action)

        // then
        expect(fetchCurrentGoalReducer).toBeCalled()
    })

    it('given fetch goals action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_GOALS_ACTION_PREFIX}-request` }

        // when
        goalReducer({ ...sampleState }, action)

        // then
        expect(fetchGoalsReducer).toBeCalled()
    })

    it('given set goal action should call correct reducer', () => {
        // given
        const action = { type: `${SET_GOAL_ACTION_PREFIX}-request` }

        // when
        goalReducer({ ...sampleState }, action)

        // then
        expect(setGoalReducer).toBeCalled()
    })
})