import {message} from "antd";
import axios from 'axios';
import {backendAPI} from "../api_consts";

export const apiCreateStory = (userJwt, storyName, childName, gender) => {
    const saveStoryApi = backendAPI.concat(`CreateStory`);
    return axios.post(saveStoryApi,
        {
            userId : userJwt,
            storyName,
            childName,
            gender
        });
};
