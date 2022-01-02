import { Timestamp } from "firebase/firestore"
import moment from "moment"
import { REMOVE_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants"
import { removeBodyMeasurementReducer } from "./removeBodyMeasurement"

describe('removeBodyMeasurementReducer', () => {
    const sampleDate = '31-12-2021'

    const sampleState = {
        bodyMeasurements: {
            [`${sampleDate}`]: {
                date: Timestamp.fromDate(moment(sampleDate, 'DD-MM-YYYY').toDate()),
                dateAsString: sampleDate,
                weight: 80,
                height: 180,
                bodyFat: 15
            }
        },
        latestBodyMeasurement: {
            date: Timestamp.fromDate(moment(sampleDate, 'DD-MM-YYYY').toDate()),
            dateAsString: sampleDate,
            weight: 80,
            height: 180,
            bodyFat: 15
        },
        fetching: false,
        adding: false,
        error: null,
    }

    it('given request action should initialize state correctly', () => {
        // given
        const startingState = {
            ...sampleState,
        }

        const action = { type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        const newState = removeBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
        })
    })

    it('given success action should add body measurement to context correctly', () => {
        // given
        const startingState = {
            ...sampleState,
        }

        const action = {
            type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
            payload: {
                date: sampleDate
            }
        }

        // when
        const newState = removeBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            bodyMeasurements: {},
        })
    })

    it('given failure action should set failure state correctly', () => {
        // given
        const startingState = {
            ...sampleState,
        }

        const action = {
            type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-failure`,
            error: "Some error message"
        }

        // when
        const newState = removeBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            error: action.error
        })
    })
})