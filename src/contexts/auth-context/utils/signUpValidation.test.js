import moment from "moment";
import { validateSignUp } from "./signUpValidation";

describe('validateSignUp', () => {
    it('given name below minimal length should throw an error', () => {
        // given
        const validPassword = "!abc123DEF"
        const validPasswordConfirmation = "!abc123DEF"
        const validEmail = "test@test.test"
        const invalidName = "Tom"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validPassword, validEmail, validPasswordConfirmation, invalidName, validBirthDate)).toThrow('conajmniej')
    })

    it('given password below minimal length should throw an error', () => {
        // given
        const invalidPassword = "abc"
        const validPasswordConfirmation = "abc"
        const validEmail = "test@test.test"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(invalidPassword, validEmail, validPasswordConfirmation, validName, validBirthDate)).toThrow('conajmniej')
    })

    it('given password without all common characters should throw an error', () => {
        // given
        const invalidPassword = "abcDEFabc"
        const validPasswordConfirmation = "abcDEFabc"
        const validEmail = "test@test.test"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(invalidPassword, validEmail, validPasswordConfirmation, validName, validBirthDate)).toThrow('małą', 'dużą', 'cyfrę')
    })

    it('given password without special characters should throw an error', () => {
        // given
        const invalidPassword = "abc123DEF"
        const validPasswordConfirmation = "abc123DEF"
        const validEmail = "test@test.test"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(invalidPassword, validEmail, validPasswordConfirmation, validName, validBirthDate)).toThrow('znak specjalny')
    })

    it('given password confirmation that is different from a given password should throw an error', () => {
        // given
        const validPassword = "!abc123DEF"
        const invalidPasswordConfirmation = "abc"
        const validEmail = "test@test.test"
        const validName = "Valid Name"
        const validBirthDate = "12-12-1999"

        // then
        expect(() => validateSignUp(validPassword, validEmail, invalidPasswordConfirmation, validName, validBirthDate)).toThrow('różnią się')
    })

    it('given birthdate in the future should throw an error', () => {
        // given
        const validPassword = "!abc123DEF"
        const validPasswordConfirmation = "!abc123DEF"
        const validEmail = "test@test.test"
        const validName = "Valid Name"
        const invalidBirthDate = moment().add(1, 'd').format("DD-MM-YYYY")

        // then
        expect(() => validateSignUp(validPassword, validEmail, validPasswordConfirmation, validName, invalidBirthDate)).toThrow('datą przeszłą')
    })
})