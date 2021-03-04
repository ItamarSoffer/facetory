import {message} from "antd";
import axios from 'axios';
import {backendAPI} from "../api";

export const apiCreateStory = (userJwt, storyName, childName, gender, onReceive) => {
    const saveStoryApi = backendAPI.concat(`/CreateStory`);
    return axios.post(saveStoryApi,
        {
            'userId' : userJwt,
            storyName,
            childName,
            gender
        }).then((response) => {
            console.log("resp", response);
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(`Story saved successfully 😄`, 1.5);
                onReceive(response.data.storyId);
            }
        });
};
export const apiUpdateStory = (storyId, storyName, childName) => {
    const saveStoryApi = backendAPI.concat(`/UpdateStory`);
    return axios.post(saveStoryApi,
        {
            storyId,
            storyName,
            childName
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