import moment from "moment";
import { validateSignUp } from "./signUpValidation";

describe('validateSignUp', () => {
    it('given name below minimal length should throw an error', () => {
        // given
        const validPassword = "!abc123DEF"
        const validPasswordConfirmation = "!abc123DEF"
        const invalidName = "Tom"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validPassword, validPasswordConfirmation, invalidName, validBirthDate)).toThrow('at least')
    })

    it('given password below minimal length should throw an error', () => {
        // given
        const invalidPassword = "abc"
        const validPasswordConfirmation = "abc"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(invalidPassword, validPasswordConfirmation, validName, validBirthDate)).toThrow('at least')
    })

    it('given password without all common characters should throw an error', () => {
        // given
        const invalidPassword = "abcDEFabc"
        const validPasswordConfirmation = "abcDEFabc"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(invalidPassword, validPasswordConfirmation, validName, validBirthDate)).toThrow('lowercase', 'uppercase', 'digit')
    })

    it('given password without special characters should throw an error', () => {
        // given
        const invalidPassword = "abc123DEF"
        const validPasswordConfirmation = "abc123DEF"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(invalidPassword, validPasswordConfirmation, validName, validBirthDate)).toThrow('special character')
    })

    it('given password confirmation that is different from a given password should throw an error', () => {
        // given
        const validPassword = "!abc123DEF"
        const invalidPasswordConfirmation = "abc"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validPassword, invalidPasswordConfirmation, validName, validBirthDate)).toThrow('not match')
    })

    it('given birthdate in the future should throw an error', () => {
        // given
        const validPassword = "!abc123DEF"
        const validPasswordConfirmation = "!abc123DEF"
        const validName = "Valid Name"
        const invalidBirthDate = moment().add(1, 'd').format("DD-MM-YYYY")

        // then
        expect(() => validateSignUp(validPassword, validPasswordConfirmation, validName, invalidBirthDate)).toThrow('day in the past')
    })
})