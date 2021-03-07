import {apiSaveSlide} from '../API/SaveSlideAPI'
import {message} from 'antd'
/*
Saves the JWT authentication key and the current logged user.
the JWT token is provided by the server after the login has succeed.
Username is not in current use, but maybe is will be handy.

 */
const loggedUserLocalStorage = window.localStorage.getItem('loggedUser');
const jwtTokenLocalStorage = window.localStorage.getItem('jwtToken');
//const currentStoryLocalStorage = window.localStorage.getItem('currentStory');
const initState = {
    loggedUser: (loggedUserLocalStorage !== null ? loggedUserLocalStorage : null),
    jwtToken: (jwtTokenLocalStorage !== null ? jwtTokenLocalStorage : ''),
  //  currentStory :  (currentStoryLocalStorage !== null ? currentStoryLocalStorage : '')
    slidesCache : null,
    currentStory : null
    createStoryStatus : "",
    stories: {}
};

const usersReducer = (state = initState, action) => {
    switch(action.type){
        case "LOGIN":
            window.localStorage.setItem('jwtToken',action.jwtToken);
            state = {...state,
                loggedUser: action.loggedUser,
                jwtToken: action.jwtToken,
            };
            // logout- reset token
            if (action.jwtToken === ''){
            }
            break;
        case "EDIT_STORY":
            state = {...state,
                currentStory: action.payload.currentStory,
            };
 
            break;
        case "SAVE_SLIDE":
            apiSaveSlide(action.payload.slideData).then((response) => {
                if (response.status === 201){
                    message.warning(response.data)
                }
                else if (response.status === 200){
                    message.success(`Slide Saved successfully 😄`, 1.5);
                    state = {...state,
                        // TODO: add dict of saved slides 
                        slidesCache: response.data.slideId,
                    };
                
                }
            });
        case "CREATE_STORY_SUCCESS":
            state = {
                ...state,
                createStoryStatus: "success",
                currentStory:  action.payload.storyId,
                stories: {...state.stories, [action.payload.storyId]: {slides: []}}
            }
            break;
        case "CREATE_STORY_LOADING":
            state = {
                ...state,
                createStoryStatus: 'loading',
            }
            break;
        default:
            break;
    }

    return state;
};

export default usersReducer;
