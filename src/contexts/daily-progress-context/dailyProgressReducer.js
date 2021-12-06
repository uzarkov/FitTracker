import { fetchDailyProgressReducer } from "./actions/fetchDailyProgress";
import { updateDailyProgressReducer } from "./actions/updateDailyProgress";
import { FETCH_DAILY_PROGRESS_ACTION_PREFIX, UPDATE_DAILY_PROGRESS_ACTION_PREFIX } from "./constants"

export const dailyProgressReducer = (state, action) => {
    if (action.type.startsWith(FETCH_DAILY_PROGRESS_ACTION_PREFIX)) {
        return fetchDailyProgressReducer(state, action);
    } else if (action.type.startsWith(UPDATE_DAILY_PROGRESS_ACTION_PREFIX)) {
        return updateDailyProgressReducer(state, action);
    } else {
        throw new Error(`Unhandled action type ${action.type}`);
    }
}