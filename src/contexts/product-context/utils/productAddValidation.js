export const validateProduct = ({ name, kcal, carbs, fats, proteins }) => {
    if (name.length === 0) {
        throw new Error("Nazwa produktu nie może być pusta")
    }

    console.log(kcal, carbs, fats, proteins)
    if (kcal < 0 || carbs < 0 || fats < 0 || proteins < 0) {
        throw new Error("Wartości odżywcze nie mogą być ujemne")
    }
}