import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {useHistory, withRouter} from 'react-router-dom'
import {INVALID_STORY} from "../api_consts"
import 'antd/dist/antd.css';
import { Radio } from 'antd';
import {apiGetSlides} from "../API/CreateStoryAPI"
import {CreateStoryForm, GenericCardWrapper} from "../Components/CreateStoryPage/CreateStoryComponent";
import { Form, Card, Input, Button } from 'antd';
import {setCurrentStoryAction} from '../Actions/editStoryAction'
import { createStoryThunk } from '../thunks/userThunks';
//import EditStoryPage from "EditStoryPage";


/* eslint-disable no-template-curly-in-string */

const CreateStoryPage =  (props) => {
    const history = useHistory();
    const {createStory, createStoryStatus, storyId} = props;
    useEffect(() => {
        if (createStoryStatus === 'success') {
            history.push(`/story/${storyId}`)
        }
    }, [createStoryStatus])

    return (
        <GenericCardWrapper>
            <CreateStoryForm history={history} createStory={createStory} isLoading={createStoryStatus === 'loading'}/>
        </GenericCardWrapper>
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        createStoryStatus: state.usersReducer ? state.usersReducer.createStoryStatus : "",
        storyId: state.usersReducer ? state.usersReducer.currentStory : null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createStory: createStoryThunk(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateStoryPage);
