
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { AudioOutlined } from '@ant-design/icons';
import {INVALID_STORY} from "../../api_consts"
import { apiCreateStory } from '../../API/CreateStoryAPI';
import {Card, Radio, Tooltip, Typography, Space, Form, Input, Button} from 'antd';
import {setCurrentStoryAction} from '../../Actions/editStoryAction'
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


// This function is used for both edit and create story - in edit i receive a valid story id and null setStoryId
// in create i receive a valid storyId and setStoryId which i create with useState in CreateStoryPage

export const CreateStoryForm = (props) => {
    const {history, setCurrentStoryHandler} = props;
    const createStoryHandler = (values) => {
        var {Title, childName, gender} = values;
    const userToekn = window.localStorage.getItem('jwtToken');
    if (gender == undefined) 
    {
        // fix bug where default seleciton is not passed in values
        gender = 'male'
    }
    apiCreateStory(userToekn, Title, childName, gender, (storyId) => {
        // redirect to story editor!!
        setCurrentStoryHandler({storyId, storyName : Title, childName, gender})
        history.push({pathname: `/story/${storyId}/`, })
    });
  };
  return <ChangeStoryForm formButtonName="צור סיפור" formSubmitHandler={createStoryHandler}/>
};

export const GenericCardWrapper = props => {
    return (  <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute', left: '50%', top: '40%',
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
            {props.children}
        </Card>
        </div>
        )
}
export const ChangeStoryForm = (props) =>
{
    const {formButtonName, formSubmitHandler, storyData = {storyName : '', childName : '', gender : 'male'}} = props
    const [genderRadioValue, setGenderRadioValue] = useState(storyData.gender)
      return (
        <div>
        
        <Form {...layout} name="nest-messages" onFinish={formSubmitHandler} validateMessages={validateMessages}>
        <Title level={4} style={{textAlign:"left"}}>צור סיפור</Title>
        
          <Form.Item
            name={['Title']}
          >
            <Input placeholder="שם הסיפור" defaultValue={storyData.storyName}/>
            
          </Form.Item>
          <Form.Item
            name={['childName']}
          >
            <Input placeholder="שם הילד" defaultValue={storyData.childName} suffix={AudioSuffix} />

          </Form.Item>
         <Form.Item
         name={['gender']}
         >
          <Space>מין:
         <Radio.Group onChange={(item) => {setGenderRadioValue(item.target.value);} }
          value={genderRadioValue}
          optionType="button"
          buttonStyle="solid"
        >
        <Space>
        <Radio.Button value="male" buttonStyle="solid">בן</Radio.Button>
        <Radio.Button value="female" buttonStyle="solid">בת</Radio.Button>
        </Space>
        </Radio.Group>

        </Space>
         </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
        <Button type="primary" htmlType="submit">
            {formButtonName}
        </Button>
        </Form.Item>

        </Form>
        </div>
      );
};

