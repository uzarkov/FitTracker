import { Timestamp } from "firebase/firestore"
import moment from "moment"
import { FETCH_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants"
import { fetchBodyMeasurementReducer } from "./fetchBodyMeasurement"

describe('fetchBodyMeasurementReducer', () => {
    const sampleState = {
        bodyMeasurements: {},
        latestBodyMeasurement: {},
        fetching: false,
        adding: false,
        error: null,
    }

    it('given request action should initialize state correctly', () => {
        // given
        const startingState = {
            ...sampleState,
        }

        const action = { type: `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        const newState = fetchBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            fetching: true,
        })
    })

    it('given success action should fetch body measurement correctly', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }
        const dateAsString = '31-12-2021'

        const action = {
            type: `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
            payload: {
                date: Timestamp.fromDate(moment(dateAsString, 'DD-MM-YYYY').toDate()),
                dateAsString: dateAsString,
                weight: 80,
                height: 180,
                bodyFat: 15
            }
        }

        // when
        const newState = fetchBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            fetching: false,
            bodyMeasurements: {
                [`${dateAsString}`]: action.payload
            }
        })
    })

    it('given failure action should set failure state correctly', () => {
        // given
        const startingState = {
            ...sampleState,
            fetching: true,
        }

        const action = {
            type: `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-failure`,
            error: "Some error message"
        }

        // when
        const newState = fetchBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            fetching: false,
            error: action.error
        })
    })
})