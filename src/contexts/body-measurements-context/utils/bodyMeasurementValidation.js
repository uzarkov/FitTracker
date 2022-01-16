export const validateBodyMeasurement = ({ weight, bodyFat, height }) => {
    if (weight < 0 || bodyFat < 0 || height < 0) {
        throw new Error("Podane wartości nie mogą być ujemne")
    }
}