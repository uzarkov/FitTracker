import { GOAL_TYPES } from "../constants"

export const validateSetGoal = ({ type, caloricDemand, startingWeight, targetWeight }) => {
    if (caloricDemand <= 0) {
        throw new Error("Zapotrzebowanie kaloryczne musi być dodatnie")
    }

    if (type === GOAL_TYPES.MAINTAIN_WEIGHT && startingWeight > targetWeight) {
        throw new Error("Waga maksymalna nie może być mniejsza niż waga minimalna")
    }

    if (type === GOAL_TYPES.GAIN_WEIGHT && startingWeight > targetWeight) {
        throw new Error("Waga początkowa nie może być większa niż waga końcowa")
    }

    if (type === GOAL_TYPES.LOSE_WEIGHT && startingWeight < targetWeight) {
        throw new Error("Waga początkowa nie może być mniejsza niż waga początkowa")
    }
}