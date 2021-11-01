import { fetchUserProfileReducer } from "./actions/fetchUserProfile";
import { FETCH_USER_PROFILE_ACTION_PREFIX } from "./constants"

export const userProfileReducer = (state, action) => {
    if (action.type.startsWith(FETCH_USER_PROFILE_ACTION_PREFIX)) {
        return fetchUserProfileReducer(state, action);
    } else {
        throw new Error(`Unhandled exception type ${action.type}`);
    }
}