import { UPDATE_DAILY_PROGRESS_ACTION_PREFIX } from "../constants"
import { getDailyProgressPlaceholder } from "../utils"
import { updateDailyProgressReducer } from "./updateDailyProgress"

describe('updateDailyProgressReducer', () => {
    const sampleState = {
        days: {},
        fetching: false,
        error: null,
    }

    let sampleOriginalDailyProgress = undefined;
    const sampleOriginalDailyProgressWrapper = {
        set: (value) => sampleOriginalDailyProgress = value,
        get: () => sampleOriginalDailyProgress,
    }

    it('given request action should update daily progress and set original daily progress to previous value', () => {
        // given
        const startingState = {
            ...sampleState,
            days: {
                ...sampleState.days,
                "01-11-2021": getDailyProgressPlaceholder("01-11-2021", 0)
            }
        }

        const action = {
            type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-request`,
            payload: {
                ...getDailyProgressPlaceholder("01-11-2021", 0),
                targetKcal: 3000,
                totalKcal: 1500,
            }
        }

        sampleOriginalDailyProgressWrapper.set(undefined);

        // when
        const newState = updateDailyProgressReducer(startingState, action, sampleOriginalDailyProgressWrapper)

        // then
        expect(newState).toStrictEqual({
            days: {
                "01-11-2021": action.payload,
            },
            fetching: false,
            error: null,
        })
        expect(sampleOriginalDailyProgressWrapper.get()).toStrictEqual(startingState.days["01-11-2021"])
    })

    it('given success action should do nothing', () => {
        // given
        const startingState = {
            ...sampleState,
            days: {
                ...sampleState.days,
                "01-11-2021": {
                    ...getDailyProgressPlaceholder("01-11-2021", 0),
                    targetKcal: 3000,
                    totalKcal: 1500,
                }
            }
        }

        const action = { type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-success` }

        sampleOriginalDailyProgressWrapper.set(startingState.days["01-11-2021"]);

        // when
        const newState = updateDailyProgressReducer(startingState, action, sampleOriginalDailyProgressWrapper)

        // then
        expect(newState).toStrictEqual(startingState)
        expect(sampleOriginalDailyProgressWrapper.get()).toStrictEqual(undefined)
    })

    it('given failure action should revert daily progress back to original value', () => {
        // given
        const startingState = {
            ...sampleState,
            days: {
                ...sampleState.days,
                "01-11-2021": {
                    ...getDailyProgressPlaceholder("01-11-2021", 0),
                    targetKcal: 3000,
                    totalKcal: 1500,
                }
            }
        }

        const action = {
            type: `${UPDATE_DAILY_PROGRESS_ACTION_PREFIX}-failure`,
            payload: {
                ...getDailyProgressPlaceholder("01-11-2021", 0),
                targetKcal: 3000,
                totalKcal: 1500,
            }
        }

        const originalDailyProgress = getDailyProgressPlaceholder("01-11-2021", 0);
        sampleOriginalDailyProgressWrapper.set(originalDailyProgress);

        // when
        const newState = updateDailyProgressReducer(startingState, action, sampleOriginalDailyProgressWrapper)

        // then
        expect(newState).toStrictEqual({
            days: {
                "01-11-2021": originalDailyProgress
            },
            fetching: false,
            error: null,
        })
        expect(sampleOriginalDailyProgressWrapper.get()).toStrictEqual(undefined)
    })
})