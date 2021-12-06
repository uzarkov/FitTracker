import moment from 'moment';

export const validateSignUp = (password, passwordConfirmation, name, birthDate) => {
    validateName(name);
    validatePassword(password, passwordConfirmation);
    validateBirthDate(birthDate);
}

const validateName = (name) => {
    if (name.length < 5) {
        throw new Error("Name has to be at least 5 characters long")
    }
}

const validatePassword = (password, passwordConfirmation) => {
    if (password.length < 8) {
        throw new Error("Password has to be at least 8 characters long")
    }

    if (password.search(/[a-z]+/) == -1 || password.search(/[A-Z]+/) == -1 || password.search(/[0-9]/) == -1) {
        throw new Error("Password has to contain at least one uppercase letter, one lowercase letter and one digit")
    }

    if (password.search(/[~`!@#$%^&*()_\-+={[}\]\|\:;"'<,>\.?/]+/) == -1) {
        throw new Error("Password has to contain at least one special character (~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/)")
    }

    if (passwordConfirmation !== password) {
        throw new Error("Given passwords do not match")
    }
}

const validateBirthDate = (birthDate) => {
    const date = moment(birthDate, "DD-MM-YYYY");
    const today = moment();

    if (date.isAfter(today)) {
        throw new Error("Birth date has to be a day in the past")
    }
}