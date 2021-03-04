import {message} from "antd";
import axios from 'axios';
import {backendAPI} from "../api_consts";

export const apiCreateStory = (userJwt, storyName, ChildName, gender, onReceive) => {
    const saveStoryApi = backendAPI.concat(`/CreateStory`);
    return axios.post(saveStoryApi,
        {
            'userId' : userJwt,
            storyName,
            ChildName,
            gender
        }).then((response) => {
            console.log("resp", response);
            if (response.status === 201){
                message.warning(response.data)
            }
            else if (response.status === 200){
                message.success(`Story Created successfully 😄`, 1.5);
                onReceive(response.data.storyId);
            }
        });
};
