import { UPDATE_USER_PROFILE_ACTION_PREFIX } from "../constants"
import { updateUserProfileReducer } from "./updateUserProfile";

describe('updateUserProfileReducer', () => {
    const sampleState = {
        userProfile: {},
        fetching: false,
        error: null,
    }

    let sampleOriginalProfile = undefined;
    const sampleOriginalProfileWrapper = {
        set: (value) => sampleOriginalProfile = value,
        get: () => sampleOriginalProfile,
    }

    it('given request action should update user profile and set original user profile to previous value', () => {
        // given
        const startingState = {
            ...sampleState,
            userProfile: {
                birthDate: "12-12-2000",
                name: "John Doe"
            }
        }

        const action = {
            type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-request`,
            payload: {
                birthDate: "01-01-2000",
                name: "Jan Kowalski"
            }
        }

        sampleOriginalProfileWrapper.set({});

        // when
        const newState = updateUserProfileReducer(startingState, action, sampleOriginalProfileWrapper)

        // then
        expect(newState).toStrictEqual({
            userProfile: action.payload,
            fetching: false,
            error: null,
        })
        expect(sampleOriginalProfileWrapper.get()).toStrictEqual(startingState.userProfile)
    })

    it('given success action should do nothing', () => {
        // given
        const startingState = {
            ...sampleState,
            userProfile: {
                birthDate: "01-01-2000",
                name: "Jan Kowalski"
            }
        }

        const action = { type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-success` }

        sampleOriginalProfileWrapper.set({
            birthDate: "12-12-2000",
            name: "John Doe"
        });

        // when
        const newState = updateUserProfileReducer(startingState, action, sampleOriginalProfileWrapper)

        // then
        expect(newState).toStrictEqual(startingState)
        expect(sampleOriginalProfileWrapper.get()).toStrictEqual({})
    })

    it('given failure action should revert daily progress back to original value', () => {
        // given
        const startingState = {
            ...sampleState,
            userProfile: {
                birthDate: "01-01-2000",
                name: "Jan Kowalski"
            }
        }

        const action = { type: `${UPDATE_USER_PROFILE_ACTION_PREFIX}-failure` }

        const originalProfile = {
            birthDate: "12-12-2000",
            name: "John Doe"
        }

        sampleOriginalProfileWrapper.set(originalProfile);

        // when
        const newState = updateUserProfileReducer(startingState, action, sampleOriginalProfileWrapper)

        // then
        expect(newState).toStrictEqual({
            userProfile: originalProfile,
            fetching: false,
            error: null,
        })
        expect(sampleOriginalProfileWrapper.get()).toStrictEqual({})
    })
})