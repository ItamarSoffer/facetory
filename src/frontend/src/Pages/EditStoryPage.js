import React, { useState, useEffect } from 'react';
import {INVALID_STORY} from "../api_consts"
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Radio } from 'antd';
import {withRouter, useParams, useHistory} from 'react-router-dom' 
import {apiGetSlides} from "../API/EditStoryAPI"
import {EditStoryForm, AllSlidesView} from "../Components/EditStoryPage/EditStoryComponent";
import { Form, Card, Input, Button } from 'antd';
import {GenericCardWrapper} from "../Components/CreateStoryPage/CreateStoryComponent";
import { connect } from 'react-redux';
import { getUserId } from '../utils/auth';


export const  EditStoryPage = (props) =>
{
    const {currentStory} = props;
    const {storyId} = useParams();
    // const {storyId} = currentStory
    const history = useHistory();
    const [slides,  setSlides] = useState([]);
    //const [storyId, setStoryId] = useState(0)
    useEffect(() => {
        // populate Slides
        const userToekn = getUserId();
        apiGetSlides(userToekn, storyId).then((response) => {
            if (response.status === 201){
                console.log("error with getting slides")
            }
            else if (response.status === 200){
                setSlides(response.data.slides) 
            }
        });        
        // Runs ONCE after initial rendering
      }, [storyId]);
    
   
    const AddNewSlide = () =>
    {
        history.push({pathname: `/story/${storyId}/main`, })
    }

   return (
    <GenericCardWrapper>
           <EditStoryForm isInitialized={storyId != INVALID_STORY} currentStory={props.currentStory}
           ></EditStoryForm>
           <AllSlidesView Slides = {slides} AddSlideHandler={AddNewSlide}></AllSlidesView>
    </GenericCardWrapper>
    ) 
};

// when IsLogged is changed, run checkJwt 
const mapStateToProps = state => {
    return {    
        currentStory: state.usersReducer.currentStory,
    }
};

export default connect(mapStateToProps, null)(withRouter(EditStoryPage));
