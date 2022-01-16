import { GOAL_TYPES } from "../constants"
import { validateSetGoal } from "./setGoalValidation"

describe("validateSetGoal", () => {
    it('given negative caloric demand should throw an error', () => {
        // given
        const goal = {
            caloricDemand: -10
        }

        // then
        expect(() => validateSetGoal({ ...goal })).toThrow('musi być dodatnie')
    })

    it('given MAINTAIN_WEIGHT type and min weight greater than max weight should throw an error', () => {
        // given
        const goal = {
            caloricDemand: 100,
            type: GOAL_TYPES.MAINTAIN_WEIGHT,
            startingWeight: 70,
            targetWeight: 60,
        }

        // then
        expect(() => validateSetGoal({ ...goal })).toThrow('mniejsza')
    })

    it('given LOSE_WEIGHT type and target weight greater than starting weight should throw an error', () => {
        // given
        const goal = {
            caloricDemand: 100,
            type: GOAL_TYPES.LOSE_WEIGHT,
            startingWeight: 70,
            targetWeight: 80,
        }

        // then
        expect(() => validateSetGoal({ ...goal })).toThrow('mniejsza')
    })

    it('given GAIN_WEIGHT type and starting weight greater than target weight should throw an error', () => {
        // given
        const goal = {
            caloricDemand: 100,
            type: GOAL_TYPES.GAIN_WEIGHT,
            startingWeight: 70,
            targetWeight: 60,
        }

        // then
        expect(() => validateSetGoal({ ...goal })).toThrow('większa')
    })
})