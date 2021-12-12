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