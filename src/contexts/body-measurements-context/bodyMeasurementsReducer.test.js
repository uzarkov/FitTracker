import { bodyMeasurementsReducer } from "./bodyMeasurementsReducer"
import { ADD_BODY_MEASUREMENT_ACTION_PREFIX, FETCH_BODY_MEASUREMENT_ACTION_PREFIX, FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX, REMOVE_BODY_MEASUREMENT_ACTION_PREFIX } from "./constants"

jest.mock('./actions/addBodyMeasurement')
jest.mock('./actions/fetchBodyMeasurement')
jest.mock('./actions/fetchLatestBodyMeasurement')
jest.mock('./actions/removeBodyMeasurement')

const { addBodyMeasurementReducer } = require('./actions/addBodyMeasurement')
const { fetchBodyMeasurementReducer } = require('./actions/fetchBodyMeasurement')
const { fetchLatestBodyMeasurementReducer } = require('./actions/fetchLatestBodyMeasurement')
const { removeBodyMeasurementReducer } = require('./actions/removeBodyMeasurement')

describe('bodyMeasurementsReducer', () => {
    const sampleState = {
        bodyMeasurements: {},
        latestBodyMeasurement: {},
        fetching: false,
        adding: false,
        error: null,
    }

    beforeEach(() => {
        addBodyMeasurementReducer.mockReset()
        fetchBodyMeasurementReducer.mockReset()
        fetchLatestBodyMeasurementReducer.mockReset()
        removeBodyMeasurementReducer.mockReset()
    })

    it('given add action should call correct reducer', () => {
        // given
        const action = { type: `${ADD_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        bodyMeasurementsReducer({ ...sampleState }, action)

        // then
        expect(addBodyMeasurementReducer).toBeCalled()
    })

    it('given fetch action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        bodyMeasurementsReducer({ ...sampleState }, action)

        // then
        expect(fetchBodyMeasurementReducer).toBeCalled()
    })

    it('given fetch latest action should call correct reducer', () => {
        // given
        const action = { type: `${FETCH_LATEST_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        bodyMeasurementsReducer({ ...sampleState }, action)

        // then
        expect(fetchLatestBodyMeasurementReducer).toBeCalled()
    })

    it('given remove action should call correct reducer', () => {
        // given
        const action = { type: `${REMOVE_BODY_MEASUREMENT_ACTION_PREFIX}-request` }

        // when
        bodyMeasurementsReducer({ ...sampleState }, action)

        // then
        expect(removeBodyMeasurementReducer).toBeCalled()
    })
})