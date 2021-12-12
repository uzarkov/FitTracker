import { fetchCurrentGoalReducer } from "./actions/fetchCurrentGoal";
import { fetchGoalsReducer } from "./actions/fetchGoals";
import { setGoalReducer } from "./actions/setGoal";
import { FETCH_CURRENT_GOAL_ACTION_PREFIX, FETCH_GOALS_ACTION_PREFIX, SET_GOAL_ACTION_PREFIX } from "./constants";

export const goalReducer = (state, action) => {
    if (action.type.startsWith(FETCH_CURRENT_GOAL_ACTION_PREFIX)) {
        return fetchCurrentGoalReducer(state, action);
    } else if (action.type.startsWith(FETCH_GOALS_ACTION_PREFIX)) {
        return fetchGoalsReducer(state, action);
    } else if (action.type.startsWith(SET_GOAL_ACTION_PREFIX)) {
        return setGoalReducer(state, action);
    }
    throw new Error(`Unhandled action type ${action.type}`);
}