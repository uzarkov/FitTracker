import { doc, setDoc, Timestamp } from "@firebase/firestore";
import moment from "moment";
import { Firestore } from "../../../firebase/config";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { ADD_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants";
import { validateBodyMeasurement } from "../utils/bodyMeasurementValidation";

export const FAILURE_ERROR_MSG = "Could not add body measurement"

export const addBodyMeasurement = (dispatch, { uid, date, bodyMeasurement }) => {
    const addedBodyMeasurement = {
        ...bodyMeasurement,
        date: Timestamp.fromDate(moment(date, "DD-MM-YYYY").toDate()),
        dateAsString: date
    }

    dispatch({ type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-request` });

    try {
        validateBodyMeasurement({ ...bodyMeasurement });
    } catch (error) {
        dispatch({ type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-failure` })
        showErrorToast(error.message)
        return
    }

    const docRef = doc(Firestore, 'users', uid, 'body-measurements', date);

    setDoc(docRef, addedBodyMeasurement)
        .then(() => onSuccess(dispatch, addedBodyMeasurement), () => onFailure(dispatch))
}

const onSuccess = (dispatch, addedBodyMeasurement) => {
    dispatch({
        type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
        payload: addedBodyMeasurement
    })
    showSuccessToast("Dodano pomiar")
}

const onFailure = (dispatch) => {
    dispatch({ type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-failure` })
    showErrorToast("Nie udało się dodać pomiaru")
}

export const addBodyMeasurementReducer = (state, action) => {
    switch (action.type) {
        case `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-request`: {
            return {
                ...state,
                adding: true,
            }
        }
        case `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-success`: {
            const addedBodyMeasurement = action.payload;
            const { dateAsString } = addedBodyMeasurement

            return {
                ...state,
                adding: false,
                bodyMeasurements: {
                    ...state.bodyMeasurements,
                    [`${dateAsString}`]: addedBodyMeasurement,
                }
            }
        }
        case `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                adding: false,
                error: FAILURE_ERROR_MSG
            }
        }
        default: {
            throw new Error(`Unhandled exception type ${action.type}`);
        }
    }
}