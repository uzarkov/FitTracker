import { validateProduct } from "./productAddValidation"

describe('validateProduct', () => {
    it('given blank product name should throw an error', () => {
        // given
        const product = {
            name: ""
        }

        // then
        expect(() => validateProduct({ ...product })).toThrow('pusta')
    })

    it('given negative kcal should throw an error', () => {
        // given
        const product = {
            name: "abc",
            kcal: -1,
            carbs: 0,
            fats: 0,
            proteins: 0,
        }

        // then
        expect(() => validateProduct({ ...product })).toThrow('ujemne')
    })

    it('given negative carbs should throw an error', () => {
        // given
        const product = {
            name: "abc",
            kcal: 0,
            carbs: -1,
            fats: 0,
            proteins: 0,
        }

        // then
        expect(() => validateProduct({ ...product })).toThrow('ujemne')
    })

    it('given negative fats should throw an error', () => {
        // given
        const product = {
            name: "abc",
            kcal: 0,
            carbs: 0,
            fats: -1,
            proteins: 0,
        }

        // then
        expect(() => validateProduct({ ...product })).toThrow('ujemne')
    })

    it('given negative proteins should throw an error', () => {
        // given
        const product = {
            name: "abc",
            kcal: 0,
            carbs: 0,
            fats: 0,
            proteins: -1,
        }

        // then
        expect(() => validateProduct({ ...product })).toThrow('ujemne')
    })
})