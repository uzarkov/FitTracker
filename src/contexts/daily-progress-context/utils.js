export const getDailyProgressPlaceholder = (date, caloricDemand) => {
    return {
        activities: [],
        date: date,
        products: [],
        targetKcal: caloricDemand,
        totalCarbs: 0,
        totalFats: 0,
        totalKcal: 0,
        totalProteins: 0,
        isPlaceholder: true,
    }
}

export const countTotalsOf = (dailyProgress) => {
    const productsKcal = dailyProgress.products.reduce((acc, v) => acc + v.kcal, 0)
    const burnedKcal = dailyProgress.activities.reduce((acc, v) => acc + v.burnedKcal, 0)

    return {
        totalKcal: productsKcal - burnedKcal,
        totalCarbs: dailyProgress.products.reduce((acc, v) => acc + v.carbs, 0),
        totalProteins: dailyProgress.products.reduce((acc, v) => acc + v.proteins, 0),
        totalFats: dailyProgress.products.reduce((acc, v) => acc + v.fats, 0),
    }
}