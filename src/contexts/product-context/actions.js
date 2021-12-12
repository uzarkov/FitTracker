import { updateDailyProgress } from "../daily-progress-context/actions/updateDailyProgress";

export const addProduct = (dailyProgressDispatch, { uid, dailyProgress, newProduct }) => {
    const updatedFields = {
        products: [...dailyProgress.products, newProduct]
    }

    updateDailyProgress(dailyProgressDispatch, { uid, dailyProgress, updatedFields })
}

export const removeProduct = (dailyProgressDispatch, { uid, dailyProgress, index }) => {
    const updatedFields = {
        products: dailyProgress.products.filter((product, idx) => idx !== index),
    }

    updateDailyProgress(dailyProgressDispatch, { uid, dailyProgress, updatedFields })
}