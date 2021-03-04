import {message} from "antd";
import axios from 'axios';
import {backendAPI} from "../api_consts";

export const apiCreateStory = (userJwt, storyName, childName, gender, onReceive) => {
    const saveStoryApi = backendAPI.concat(`/CreateStory`);
    return axios.post(saveStoryApi,
        {
            'userId' : userJwt,
            storyName,
            childName,
            gender
        }).then((response) => {
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(`Story Created successfully 😄`, 1.5);
                onReceive(response.data.storyId);
            }
        });
};
