import { fetchUserProfileReducer } from "./actions/fetchUserProfile";
import { updateUserProfileReducer } from "./actions/updateUserProfile";
import { FETCH_USER_PROFILE_ACTION_PREFIX, UPDATE_USER_PROFILE_ACTION_PREFIX } from "./constants"

export const userProfileReducer = (state, action) => {
    if (action.type.startsWith(FETCH_USER_PROFILE_ACTION_PREFIX)) {
        return fetchUserProfileReducer(state, action);
    } else if (action.type.startsWith(UPDATE_USER_PROFILE_ACTION_PREFIX)) {
        return updateUserProfileReducer(state, action);
    } else {
        throw new Error(`Unhandled action type ${action.type}`);
    }
}