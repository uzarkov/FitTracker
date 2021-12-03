import moment from "moment";
import { validateSignUp } from "./signUpValidation";

describe('validateSignUp', () => {
    it('given name below minimal length should throw an error', () => {
        // given
        const validEmail = "test@test.com"
        const validPassword = "!abc123DEF"
        const invalidName = "Tom"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validEmail, validPassword, invalidName, validBirthDate)).toThrow('at least')
    })

    it('given password below minimal length should throw an error', () => {
        // given
        const validEmail = "test@test.com"
        const invalidPassword = "abc"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validEmail, invalidPassword, validName, validBirthDate)).toThrow('at least')
    })

    it('given password without all common characters should throw an error', () => {
        // given
        const validEmail = "test@test.com"
        const invalidPassword = "abcDEFabc"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validEmail, invalidPassword, validName, validBirthDate)).toThrow('lowercase', 'uppercase', 'digit')
    })

    it('given password without special characters should throw an error', () => {
        // given
        const validEmail = "test@test.com"
        const invalidPassword = "abc123DEF"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validEmail, invalidPassword, validName, validBirthDate)).toThrow('special character')
    })

    it('given birthdate in the future should throw an error', () => {
        // given
        const validEmail = "test@test.com"
        const validPassword = "!abc123DEF"
        const validName = "Valid Name"
        const invalidBirthDate = moment().add(1, 'd').format("DD-MM-YYYY")

        // then
        expect(() => validateSignUp(validEmail, validPassword, validName, invalidBirthDate)).toThrow('day in the past')
    })
})