import React, { useState, useEffect } from 'react';
import {INVALID_STORY} from "../api_consts"
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Radio } from 'antd';
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
   const [storyId, setStoryId] = useState(INVALID_STORY)
    return <EditStoryCard history={props.history} storyId={storyId} setStoryId={setStoryId}/>
};

export const EditStoryCard = ({history, storyId, setStoryId}) => 
{
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
           <CreateStoryForm isInitialized={storyId != INVALID_STORY} storyId={storyId} setStoryId={setStoryId}
           ></CreateStoryForm>
           { storyId != INVALID_STORY ?
           <AllSlidesView Slides = {slides} AddSlideHandler={AddNewSlide}></AllSlidesView> : ""}
    </Card>
    </div>
    ) 
}
