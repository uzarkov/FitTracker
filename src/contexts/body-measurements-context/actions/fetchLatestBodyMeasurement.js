import { collection, getDocs, query, orderBy, limit } from "@firebase/firestore";
import { Firestore } from "../../../firebase/config";
import { FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants";

export const fetchLatestBodyMeasurement = (dispatch, { uid }) => {
    dispatch({ type: `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-request` });

    const collectionRef = collection(Firestore, 'users', uid, 'body-measurements');
    const q = query(collectionRef, orderBy('date', 'desc'), limit(1))

    getDocs(q)
        .then(querySnap => {
            const latestBodyMeasurement = querySnap.size > 0 ? querySnap.docs[0].data() : undefined
            dispatch({
                type: `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
                payload: latestBodyMeasurement,
            });
        })
        .catch(error => {
            dispatch({ type: `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-failure`, error: error })
        })
}

export const fetchLatestBodyMeasurementReducer = (state, action) => {
    switch (action.type) {
        case `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-request`: {
            return {
                ...state,
                fetching: true,
            }
        }
        case `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-success`: {
            if (action.payload) {
                const bodyMeasurement = action.payload;
                const { dateAsString } = bodyMeasurement;

                return {
                    ...state,
                    fetching: false,
                    bodyMeasurements: {
                        ...state.bodyMeasurements,
                        [`${dateAsString}`]: bodyMeasurement,
                    },
                    latestBodyMeasurement: bodyMeasurement
                }
            }

            return {
                ...state,
                fetching: false,
            }
        }
        case `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-failure`: {
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