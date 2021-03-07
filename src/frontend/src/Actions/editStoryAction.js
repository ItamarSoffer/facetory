export const setCurrentStoryAction = currentStory => ({
    type: "EDIT_STORY",
    payload: {
        currentStory
    }
});

export const createStorySuccessAction = storyId => ({
    type: "CREATE_STORY_SUCCESS",
    payload: {
        storyId
    }
});

export const createStoryLoadingAction = storyId => ({
    type: "CREATE_STORY_LOADING",
});
