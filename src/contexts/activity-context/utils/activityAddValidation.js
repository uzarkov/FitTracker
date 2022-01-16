export const validateActivity = ({ name, burnedKcal }) => {
    if (name.length === 0) {
        throw new Error("Nazwa aktywności nie może być pusta")
    }

    if (burnedKcal < 0) {
        throw new Error("Spalone kalorie nie mogą być ujemne")
    }
}