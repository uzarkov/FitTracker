import moment from 'moment';

export const validateSignUp = (password, email, passwordConfirmation, name, birthDate) => {
    validateBirthDate(birthDate);
    validateName(name);
    validatePassword(password, passwordConfirmation);
    validateEmail(email)
}

const validateName = (name) => {
    if (name.length < 5) {
        throw new Error("Nazwa musi się składać z conajmniej 5 znaków")
    }
}

const validatePassword = (password, passwordConfirmation) => {
    if (password.length < 8) {
        throw new Error("Hasło musi się składać z conajmniej 8 znaków")
    }

    if (password.search(/[a-z]+/) == -1 || password.search(/[A-Z]+/) == -1 || password.search(/[0-9]/) == -1) {
        throw new Error("Hasło musi zawierać conajmniej jedną dużą i małą literę oraz cyfrę")
    }

    if (password.search(/[~`!@#$%^&*()_\-+={[}\]\|\:;"'<,>\.?/]+/) == -1) {
        throw new Error("Hasło musi zawierać conajmniej jeden znak specjalny (~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/)")
    }

    if (passwordConfirmation !== password) {
        throw new Error("Podane hasła różnią się od siebie")
    }
}

const validateEmail = (email) => {
    if (email.length == 0) {
        throw new Error("Email nie może być pusty")
    }
}

const validateBirthDate = (birthDate) => {
    if (birthDate.length == 0) {
        throw new Error("Data urodzenia nie może być pusta")
    }

    if (birthDate.search(/[0-9]{2}-[0-9]{2}-[0-9]{4}/) == -1) {
        throw new Error("Data urodzenia została wprowadzona w nieprawidłowym formacie")
    }

    const date = moment(birthDate, "DD-MM-YYYY");
    const today = moment();

    if (date.isAfter(today)) {
        throw new Error("Data urodzenia musi być datą przeszłą")
    }
}