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


export const  EditStoryPage = (props) =>
{
    console.log("mprops:", props)
    const {storyId} = props.currentStory.storyId
    const history = useHistory();
    const [slides,  setSlides] = useState([]);
    //const [storyId, setStoryId] = useState(0)
    useEffect(() => {
        // populate Slides
        const userToekn = window.localStorage.getItem('jwtToken');
        apiGetSlides(userToekn, storyId).then((response) => {
            console.log("resp", response);
            if (response.status === 201){
                console.log("error with getting slides")
            }
            else if (response.status === 200){
                console.log("returnd slides", response.data.slides)
                setSlides(response.data.slides) 
            }
        });        
        // Runs ONCE after initial rendering
      }, [storyId]);
    
   
    const AddNewSlide = () =>
    {
        console.log("added new slide")
        history.push({pathname: `/story/${storyId}/editor`, })
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
        currentStory: (state.usersReducer.currentStory),

    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         login: (email,password) => {
//             dispatch(loginAction(email,password));
//         }
//     }
// };


export default connect(mapStateToProps, null)(withRouter(EditStoryPage));
/*
const StoryMainPage = withRouter((props) => {
        return (
            <div>
                StoryMainPage
                {props.history.location.pathname}
                <button
                onClick={() =>{props.history.push("/")}}
                >CLICK</button>
                <button
                    onClick={() =>{console.log(props.history.location)}}
                >LOG</button>
            </div>
        )
    }
);

 export default StoryMainPage;*/