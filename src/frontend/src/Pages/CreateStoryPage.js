import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {INVALID_STORY} from "../api_consts"
import 'antd/dist/antd.css';
import { Radio } from 'antd';
import {apiGetSlides} from "../API/CreateStoryAPI"
import {CreateStoryForm, GenericCardWrapper} from "../Components/CreateStoryPage/CreateStoryComponent";
import { Form, Card, Input, Button } from 'antd';
import {setCurrentStoryAction} from '../Actions/editStoryAction'
//import EditStoryPage from "EditStoryPage";


/* eslint-disable no-template-curly-in-string */

const CreateStoryPage =  (props) => {
    const {history, setCurrentStory} = props;
    return (<GenericCardWrapper>
        <CreateStoryForm history={history} setCurrentStoryHandler={setCurrentStory}/>
        </GenericCardWrapper>);
};


const mapDispatchToProps = dispatch => {
    return {
        setCurrentStory: (currentStory) => {
            console.log("TEST")
            dispatch(setCurrentStoryAction(currentStory));
        }
    }
};

export default connect(null, mapDispatchToProps)(CreateStoryPage);