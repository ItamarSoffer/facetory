import {message} from "antd";
import axios from 'axios';
import {backendAPI} from "../api_consts";
          
export const apiGetStory = (userJwt, storyId) => {
    const getStoryApi = backendAPI.concat(`/GetStory/`);
    return axios.post(getStoryApi,
        {
            'userId' : userJwt,
            storyId
        })
};

export const apiUpdateStory = (userJwt, storyId, storyName, ChildName, gender) => {
    const saveStoryApi = backendAPI.concat(`/UpdateStory`);
    return axios.post(saveStoryApi,
        {
            'userId' : userJwt,
            storyId,
            storyName,
            ChildName,
            gender
        }).then((response) => {
            console.log("resp", response);
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(`Story saved successfully 😄`, 1.5);
            }
        });   
};
          
export const apiGetSlides = (userJwt, storyId) => {
    const getSlidesApi = backendAPI.concat(`/GetSlides/`);
    return axios.post(getSlidesApi,
        {
            'userId' : userJwt,
            storyId
        })
};