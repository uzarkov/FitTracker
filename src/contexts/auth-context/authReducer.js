import { signInReducer } from "./actions/signIn"
import { signOutReducer } from "./actions/signOut";
import { USER_SIGN_IN_ACTION_PREFIX, USER_SIGN_OUT_ACTION_PREFIX } from "./constants"

export const authReducer = (state, action) => {
    if (action.type.startsWith(USER_SIGN_IN_ACTION_PREFIX)) {
        return signInReducer(state, action);
    } else if (action.type.startsWith(USER_SIGN_OUT_ACTION_PREFIX)) {
        return signOutReducer(state, action);
    } else {
        throw new Error(`Unhandled action type ${action.type}`);
    }
}