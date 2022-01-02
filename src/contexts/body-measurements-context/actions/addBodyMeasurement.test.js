import { Timestamp } from "firebase/firestore"
import moment from "moment"
import { ADD_BODY_MEASUREMENT_ACTION_PREFIX } from "../constants"
import { addBodyMeasurementReducer, FAILURE_ERROR_MSG } from "./addBodyMeasurement"

describe('addBodyMeasurementReducer', () => {
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

        const action = { type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        const newState = addBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            adding: true,
        })
    })

    it('given success action should add body measurement to context correctly', () => {
        // given
        const startingState = {
            ...sampleState,
            adding: true,
        }
        const dateAsString = '31-12-2021'

        const action = {
            type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-success`,
            payload: {
                date: Timestamp.fromDate(moment(dateAsString, 'DD-MM-YYYY').toDate()),
                dateAsString: dateAsString,
                weight: 80,
                height: 180,
                bodyFat: 15
            }
        }

        // when
        const newState = addBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            adding: false,
            bodyMeasurements: {
                [`${dateAsString}`]: action.payload
            }
        })
    })

    it('given failure action should set failure state correctly', () => {
        // given
        const startingState = {
            ...sampleState,
            adding: true,
        }

        const action = { type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-failure` }

        // when
        const newState = addBodyMeasurementReducer(startingState, action)

        // then
        expect(newState).toStrictEqual({
            ...startingState,
            adding: false,
            error: FAILURE_ERROR_MSG
        })
    })
})