import { validateBodyMeasurement } from "./bodyMeasurementValidation"

describe('validateBodyMeasurement', () => {
    it('given negative weight should throw an error', () => {
        // given
        const bodyMeasurement = {
            weight: -1,
            height: 0,
            bodyFat: 0,
        }

        // then
        expect(() => validateBodyMeasurement({ ...bodyMeasurement })).toThrow('ujemne')
    })

    it('given negative height should throw an error', () => {
        // given
        const bodyMeasurement = {
            weight: 0,
            height: -1,
            bodyFat: 0,
        }

        // then
        expect(() => validateBodyMeasurement({ ...bodyMeasurement })).toThrow('ujemne')
    })

    it('given negative bodyFat should throw an error', () => {
        // given
        const bodyMeasurement = {
            weight: 0,
            height: 0,
            bodyFat: -1,
        }

        // then
        expect(() => validateBodyMeasurement({ ...bodyMeasurement })).toThrow('ujemne')
    })
})