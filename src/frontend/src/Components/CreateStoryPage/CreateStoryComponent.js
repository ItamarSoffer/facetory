
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AudioOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { apiCreateStory, apiUpdateStory } from '../../API/CreateStoryAPI';
import {fallback_img} from "../../api"



//import './index.css';
import {Tooltip, Typography, Space, Form, Input, Button, Image} from 'antd';
const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
   size: 'large'
};

const AudioSuffix = (
<Tooltip title="audio">
    <Button type="primary" size = "default" shape="circle"  icon = {<AudioOutlined/>} />
</Tooltip>
/*{
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
} />*/
  );


/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
  };
  /* eslint-enable no-template-curly-in-string */


export const CreateStoryForm = ({isInitialized, setIsInitialized, storyId, setStoryId}) => {
    const onFinish = ({Title, ChildName}) => {
        if (!isInitialized)
        {
            console.log("finished create story form")
            const userToekn = window.localStorage.getItem('jwtToken');
            apiCreateStory(userToekn, Title, ChildName, (storyId) => {
                setIsInitialized(true); 
                setStoryId(storyId);
            });
        }else
        {
            console.log("finished update story form")
            apiUpdateStory(storyId, Title, ChildName); 
        }
        };
    
      return (
        <div>
        
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Space>
        <Title level={4} style={{textAlign:"left"}}>New Story </Title>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              {isInitialized ? "Save Story" : "Create Story"}
            </Button>
          </Form.Item>
        </Space>
          <Form.Item
            name={['Title']}
            label="Name"
            rules={[
              {
              },
            ]}
          >
            <Input />
            
          </Form.Item>
          <Form.Item
            name={['ChildName']}
            label="Child Name"
            rules={[
              {
              },
            ]}
          >
            <Input suffix={AudioSuffix} />

          </Form.Item>
         
        </Form>
        </div>
      );
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
        <text> {slideName} </text>
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
        <Slide slideName={s.slideName} imgPath={s.picture}/>)
        }
        
        <Space align='center' direction="vertical">
        <Button type="dashed" size="large"  icon = {<PlusSquareOutlined/>} onClick={AddSlideHandler} style={{height : "100px", width : "100px"}}>
            </Button>
            <text>Add Slide</text>
        </Space>
        </Space>
        </div>
      );
  };


  