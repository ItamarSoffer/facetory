import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AudioOutlined, PlusSquareOutlined } from '@ant-design/icons';
import {fallback_img, INVALID_STORY} from "../../api_consts"
import {ChangeStoryForm} from "../CreateStoryPage/CreateStoryComponent"
import { apiUpdateStory, apiGetStory } from '../../API/EditStoryAPI';
import {message, Typography, Space, Button, Image} from 'antd';

const { Title } = Typography;
export const EditStoryForm = (props) => {
    const EditStoryHandler = ({Title, childName, gender}) => {
        const userToekn = window.localStorage.getItem('jwtToken');
        apiUpdateStory(userToekn, props.storyId, Title, childName, gender); 
    };
  
  return <ChangeStoryForm formButtonName="שמור סיפור" formSubmitHandler={EditStoryHandler} storyData={props.currentStory}/>
  };

/* slides example
  "slides": [
    {
      "slideName": "TempA",
      "slideId": "1339",
      "text": "Super Child",
      "audio": "lol_audio.mp4",
      "picture": "lol_file.jpg"
    },
    {
      "slideName": "TempB",
      "slideId": "1340",
      "text": "Super Duper Child",
      "audio": "lol_audio2.mp4",
      "picture": "lol_file2.jpg"
    }
  ]
*/

const Slide = ({slideName, imgPath}) => 
{
    const img_url = 'https://zos.alipayobjects.com/'.concat(imgPath) 
    return (
    <Space align='center' direction="vertical">
        <Image width={100} src={img_url} fallback={fallback_img}/>
        {slideName}
    </Space>
     );
}
/*
export const SlidesView = () => {
    
    // 1 - get stories from redux store
    // 2 - get stories from backend with API call 
    
    return <div></div>
};*/
const AddSlideButton = (
    <Button type="primary" size = "default"  icon = {<PlusSquareOutlined/>} />
);
const divStyle = {}

export const AllSlidesView = ({Slides, AddSlideHandler}) => {

    console.log(Slides)  
    return (
        <div>
        <Title level={4} style={{textAlign:"left"}}>All Slides</Title>
        <Space>
        {Slides.map(s => 
        <Slide key={s.slideId} slideName={s.slideName} imgPath={s.picture}/>)
        }
        
        <Space align='center' direction="vertical">
            <Button type="dashed" size="large"  icon = {<PlusSquareOutlined/>} onClick={AddSlideHandler} style={{height : "100px", width : "100px"}}>
            </Button>
            Add Slide
        </Space>
        </Space>
        </div>
      );
  };


  