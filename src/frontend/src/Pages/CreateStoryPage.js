import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {apiGetSlides} from "../API/CreateStoryAPI"
import {CreateStoryForm, AllSlidesView} from "../Components/CreateStoryPage/CreateStoryComponent";
import { Form, Card, Input, Button } from 'antd';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */



  export default function CreateStoryPage (props) {
    const [slides,  setSlides] = useState([]);
    const [shouldRenderSlides,  setShouldRenderSlides] = useState(false);
    const [storyId, setStoryId] = useState(0)
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
      }, [shouldRenderSlides]);
    
   
    const AddNewSlide = () =>
    {
        console.log("added new slide")
        const story_id = 1
        props.history.push({pathname: `/story/:story_id/editor`,})
    }

   return (
    <div
    style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', left: '50%', top: '30%',
        transform: 'translate(-50%, -50%)'

    }}>
    <Card
    style={{
        width: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        borderColor: '#ddd',
        minHeight: 300
            
    }}>
           <CreateStoryForm isInitialized={shouldRenderSlides} setIsInitialized = {setShouldRenderSlides} storyId={storyId} setStoryId={setStoryId}
           ></CreateStoryForm>
           { shouldRenderSlides ?
           <AllSlidesView createStoryHanler ={setShouldRenderSlides} setShouldRenderSlides Slides = {slides} AddSlideHandler={AddNewSlide}></AllSlidesView> : <div/>}
    </Card>
    </div>
    ) 
  };
