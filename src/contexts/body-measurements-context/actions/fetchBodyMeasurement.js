import { doc, getDoc } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { FETCH_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants";

export const fetchBodyMeasurement = (dispatch, { uid, date }) => {
    dispatch({ type: `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-request` });

    const docRef = doc(Firestore, 'users', uid, 'body-measurements', date);

    getDoc(docRef)
        .then(docSnap => {
            dispatch({
                type: `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
                payload: docSnap.exists() ? docSnap.data() : undefined,
            });
        })
}

export const fetchBodyMeasurementReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
            }
        }
        case `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-success`: {
            if (action.payload) {
                const bodyMeasurement = action.payload;
                if (bodyMeasurement === undefined) {
                    return { ...state }
                }

                return {
                    ...state,
                    fetching: false,
                    bodyMeasurements: {
                        ...state.bodyMeasurements,
                        [`${bodyMeasurement.dateAsString}`]: bodyMeasurement,
                    }
                }
            }

            return {
                ...state,
                fetching: false,
            }
        }
        case `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-failure`: {
            return {
                ...state,
                fetching: false,
                error: action.error,
            }
        }
        default: {
            throw new Error(`Unhandled exception type ${action.type}`);
        }
    }
}