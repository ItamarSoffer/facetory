import {message} from "antd";

export const setCurrentStoryAction = currentStory => ({
    type: "EDIT_STORY",
        payload: {
            currentStory
        }
  });
