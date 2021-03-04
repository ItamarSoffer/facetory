import {message} from "antd";

export const setCurrentStoryAction = currentStory => ({
    type: "EDIT_STORY",
        payload: {
            currentStory
        }
  });
/*
export const setCurrentStoryAction = (currentStory) => {
    console.log("this shit was actually called", currentStory)
    return {
        type: "EDIT_STORY",
        payload: {
            currentStory
        },
    }
    
    return async (dispatch) =>{
        console.log("aasdasdshit called", currentStory)

        return dispatch({
            type: "EDIT_STORY",
            payload: true,
            currentStory
        });
    };
};
*/
