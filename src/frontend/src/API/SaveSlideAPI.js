import {message} from "antd";
import axios from 'axios';
import {backendAPI} from "../api_consts";

export const apiSaveSlide = (slideData) => {
    const saveSlideApi = backendAPI.concat(`/SaveSlide`);
    return axios.post(saveSlideApi,
       slideData)
};
