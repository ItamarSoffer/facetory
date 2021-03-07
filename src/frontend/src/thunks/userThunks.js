import { CssBaseline } from "@material-ui/core"
import { apiCreateStory } from "../API/CreateStoryAPI"
import { getUserId } from "../utils/auth"
import { createStorySuccessAction, createStoryLoadingAction } from "../Actions/editStoryAction";

export const createStoryThunk = outerDispatch => (storyName, childName, gender) => {
  outerDispatch(dispatch => {
    dispatch(createStoryLoadingAction());

    apiCreateStory(getUserId(), storyName, childName, gender)
      .then(res => {
        dispatch(createStorySuccessAction(res.data.storyId))
      })
      .catch(err => console.log(err))
  })
}
