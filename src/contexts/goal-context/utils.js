import { GOAL_TYPES } from "./constants";

export const calculateGoalProgress = (goal, currentWeight) => {
    console.log(currentWeight, goal)

    if (goal.isUndefined) {
        return 0;
    }

    if (goal.type === GOAL_TYPES.MAINTAIN_WEIGHT) {
        const { minWeight, maxWeight } = goal;
        return minWeight <= currentWeight && currentWeight <= maxWeight ? 100 : 0;
    }

    const { startingWeight, targetWeight } = goal;
    const ratio = (Math.max(0, currentWeight - startingWeight)) / (targetWeight - startingWeight);

    return Math.min(1, ratio) * 100;
}