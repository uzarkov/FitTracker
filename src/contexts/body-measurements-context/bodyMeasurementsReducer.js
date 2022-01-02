import { addBodyMeasurementReducer } from "./actions/addBodyMeasurement";
import { fetchBodyMeasurementReducer } from "./actions/fetchBodyMeasurement";
import { fetchLatestBodyMeasurementReducer } from "./actions/fetchLatestBodyMeasurement";
import { removeBodyMeasurementReducer } from "./actions/removeBodyMeasurement";
import { ADD_BODY_MEASUREMENT_ACTION_PREFIX, FETCH_BODY_MEASUREMENT_ACTION_PREFIX, FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX, REMOVE_BODY_MEASUREMENT_ACTION_PREFIX } from "./constants";

export const bodyMeasurementsReducer = (state, action) => {
    if (action.type.startsWith(ADD_BODY_MEASUREMENT_ACTION_PREFIX)) {
        return addBodyMeasurementReducer(state, action);
    } else if (action.type.startsWith(FETCH_BODY_MEASUREMENT_ACTION_PREFIX)) {
        return fetchBodyMeasurementReducer(state, action);
    } else if (action.type.startsWith(FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX)) {
        return fetchLatestBodyMeasurementReducer(state, action);
    } else if (action.type.startsWith(REMOVE_BODY_MEASUREMENT_ACTION_PREFIX)) {
        return removeBodyMeasurementReducer(state, action);
    } else {
        throw new Error(`Unhandled action type ${action.type}`);
    }
}