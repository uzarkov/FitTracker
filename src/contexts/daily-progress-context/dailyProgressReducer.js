import { fetchSingleDayProgressReducer } from "./actions/fetchSingleDayProgress";
import { FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX } from "./constants"

export const dailyProgressReducer = (state, action) => {
    if (action.type.startsWith(FETCH_SINGLE_DAY_PROGRESS_ACTION_PREFIX)) {
        return fetchSingleDayProgressReducer(state, action);
    } else {
        throw new Error(`Unhandled action type ${action.type}`);
    }
}