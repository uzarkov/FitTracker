import { validateActivity } from "./activityAddValidation"

describe('validateActivity', () => {
    it('given blank name should throw an error', () => {
        // given
        const activity = {
            name: ""
        }

        // then
        expect(() => validateActivity({ ...activity })).toThrow('pusta')
    })

    it('given negative burned kcal should throw an error', () => {
        // given
        const activity = {
            name: "abc",
            burnedKcal: -1,
        }

        // then
        expect(() => validateActivity({ ...activity })).toThrow('ujemne')
    })
})