import { GOAL_TYPES } from "./constants";

export const calculateGoalProgress = (goal, currentWeight) => {
    if (goal.isUndefined) {
        return 0;
    }

    if (goal.type === GOAL_TYPES.MAINTAIN_WEIGHT) {
        const { minWeight, maxWeight } = goal;
        return minWeight <= currentWeight && currentWeight <= maxWeight ? 100 : 0;
    }

    const { startingWeight, targetWeight } = goal;

    if (goal.type === GOAL_TYPES.LOSE_WEIGHT) {
        if (currentWeight <= targetWeight) {
            return 100;
        } else if (currentWeight >= startingWeight) {
            return 0;
        }
    }

    if (goal.type === GOAL_TYPES.GAIN_WEIGHT) {
        if (currentWeight >= targetWeight) {
            return 100;
        } else if (currentWeight <= startingWeight) {
            return 0;
        }
    }

    const ratio = (Math.max(0, currentWeight - startingWeight)) / (targetWeight - startingWeight);
    return Math.min(1, ratio) * 100;
}