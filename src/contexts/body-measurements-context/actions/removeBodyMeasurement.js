import { doc, deleteDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { showErrorToast, showSuccessToast } from "../../../utils/toasts";
import { REMOVE_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants";

export const removeBodyMeasurement = (dispatch, { uid, date }) => {
    dispatch({ type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-request` });

    const docRef = doc(Firestore, 'users', uid, 'body-measurements', date);

    deleteDoc(docRef)
        .then(() => {
            dispatch({
                type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
                payload: {
                    date: date
                }
            })
            showSuccessToast("Usunięto pomiar pomyślnie")
        })
        .catch((error) => {
            dispatch({
                type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-failure`,
                error: error
            })
            showErrorToast("Nie udało się usunąć pomiaru")
        })
}

export const removeBodyMeasurementReducer = (state, action) => {
    switch (action.type) {
        case `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-request`: {
            return {
                ...state,
            }
        }
        case `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-success`: {
            const { date } = action.payload;

            return {
                ...state,
                bodyMeasurements: objectWithDeletedProperty(state.bodyMeasurements, date)
            }
        }
        case `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                adding: false,
                error: action.error
            }
        }
        default: {
            throw new Error(`Unhandled exception type ${action.type}`);
        }
    }
}

const objectWithDeletedProperty = (object, propertyName) => {
    const objCopy = { ...object };
    delete objCopy[`${propertyName}`];
    return objCopy;
}