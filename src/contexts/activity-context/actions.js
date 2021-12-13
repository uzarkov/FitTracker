import { updateDailyProgress } from "../daily-progress-context/actions/updateDailyProgress";

export const addActivity = (dailyProgressDispatch, { uid, dailyProgress, newActivity }) => {
    const updatedFields = {
        activities: [...dailyProgress.activities, newActivity]
    }

    updateDailyProgress(dailyProgressDispatch, { uid, dailyProgress, updatedFields })
}

export const removeActivity = (dailyProgressDispatch, { uid, dailyProgress, index }) => {
    const updatedFields = {
        activities: dailyProgress.activities.filter((activity, idx) => idx !== index)
    }

    updateDailyProgress(dailyProgressDispatch, { uid, dailyProgress, updatedFields })
}