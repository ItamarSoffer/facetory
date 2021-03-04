import React from 'react';
import {LoadingComponent} from "../Components/LoadingComponent/LoadingComponent";

import ReactDOM from "react-dom";
import "antd/dist/antd.css";
//import "./index.css";
import { Typography, Popconfirm, Menu, Dropdown, Tooltip, Row, Col, Divider, Button, message } from "antd";
import { QuestionCircleOutlined, EditOutlined, PlayCircleOutlined, MoreOutlined, CopyOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
//import { Appbar } from 'react-native-paper';
import SlideCard from '../Components/SlideCard/SliceCard';
import ReactPlayer from 'react-player'

const {Title, Text} = Typography;

const style = { padding: "0px" };

// class HomePageCard extends SlideCard{
//     constructor(cardProps){
//         super(cardProps);
        
//     }
// }

function handleButtonClick(e) {
    //message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    //message.info('Click on menu item.');
    console.log('click', e);
  }

const menu = (
    <Menu onClick={handleMenuClick} direction="right">
      <Menu.Item key="1" icon={<EditOutlined />}>
        ערוך
      </Menu.Item>
      <Menu.Item key="2" icon={<CopyOutlined />}>
        שכפול
      </Menu.Item>
      <Menu.Item key="3" style={{color:"red", "font-weight":"bold"}} icon={<DeleteOutlined />}>
      <Popconfirm
        title="בטוח שאתה רוצה למחוק?"
        onConfirm={() => message.error("הסיפור נמחק")}
        icon={<QuestionCircleOutlined style={{ color: 'red', "font-weight":"bold"}}
         />}
        okText="כן, תמחק"
        cancelText="בטל"
      >
        מחיקה
      </Popconfirm>
        
      </Menu.Item>
      
    </Menu>
  );
  

const homepage_style = {"padding": "20px", direction:"rtl"};
const homepage_card_style = {"margin": "0px", "width": "100%"};
//const homepage_card_bodystyle = {"borderRadius": "0px"};
const card_props = {onClick: ()=>alert('test')};

const ThreeDotsMenu = props => (<Dropdown.Button type="text" 
icon={<MoreOutlined style={{color: "white"}}/>}

buttonsRender={([leftButton, rightButton]) => [
    <Tooltip title="tooltip" key="leftButton">
    {leftButton}
    </Tooltip>,
    React.cloneElement(rightButton, { ghost: true }),
    ]} 

onClick={handleButtonClick} overlay={menu} size="small" style={{ position: "absolute", bottom: '10px'}}>

</Dropdown.Button>)

const PlayButton = props => (<Button icon={<PlayCircleOutlined />} style={{ position: "absolute", bottom: '50%', right: "50%"}}></Button>)

export default function HomePage () {
    return (
            <div offset={4} style={homepage_style}>
            <Divider orientation="right"><Title level={2}>הסיפורים שלי</Title></Divider>
            <Row justify="end">
            <a href="#" style={{padding:"8px"}}>כל הסיפורים</a>
            </Row>
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} cardStyle={homepage_card_style} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <ThreeDotsMenu></ThreeDotsMenu>
            </Col>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} cardStyle={homepage_card_style} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <ThreeDotsMenu></ThreeDotsMenu>
            </Col>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} cardStyle={homepage_card_style} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <ThreeDotsMenu></ThreeDotsMenu>
            </Col>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} cardStyle={homepage_card_style} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <ThreeDotsMenu></ThreeDotsMenu>
            </Col>
            </Row>
            <div style={{"padding-top": "40px", "padding-bottom": "30px", direction:"rtl"}}>
            <Button type="primary" shape="round" icon={<PlusOutlined />} size={"large"}>
            צור סיפור חדש
            </Button>
            </div>
            <Divider orientation="right"><Title level={3}>איך זה עובד?</Title></Divider>
            <Row gutter={16}> 
            <Col className="gutter-row" span={8}>
            <ReactPlayer 
                url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                light={true}
                playing
                controls
                />
            </Col>
            </Row>
        </div>
    )
}