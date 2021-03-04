import React, { useState, useEffect } from 'react';
import {INVALID_STORY} from "../api_consts"
import 'antd/dist/antd.css';
import { Radio } from 'antd';
import {apiGetSlides} from "../API/CreateStoryAPI"
import {CreateStoryForm, GenericCardWrapper} from "../Components/CreateStoryPage/CreateStoryComponent";
import { Form, Card, Input, Button } from 'antd';
//import EditStoryPage from "EditStoryPage";


/* eslint-disable no-template-curly-in-string */

export default function CreateStoryPage (props) {
    return (<GenericCardWrapper>
        <CreateStoryForm history={props.history}/>

        </GenericCardWrapper>);
};
