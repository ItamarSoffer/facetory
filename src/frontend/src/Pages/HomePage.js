import React from 'react';
import {LoadingComponent} from "../Components/LoadingComponent/LoadingComponent";

import ReactDOM from "react-dom";
import "antd/dist/antd.css";
//import "./index.css";
import { Menu, Dropdown, Tooltip, Row, Col, Divider, Button } from "antd";
import { MoreOutlined, CopyOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
//import { Appbar } from 'react-native-paper';
import SlideCard from '../Components/SlideCard/SliceCard';


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
      <Menu.Item key="1" icon={<CopyOutlined />}>
        שכפול
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        מחיקה
      </Menu.Item>
    </Menu>
  );
  

const homepage_style = {"padding": "20px", direction:"rtl"};
const homepage_card_style = {"margin": "0px", "width": "100%", "borderRadius": "0px"};
//const homepage_card_bodystyle = {"borderRadius": "0px"};
const card_props = {onClick: ()=>alert('test'), style: homepage_card_style};

export default function HomePage () {
    return (
            <div offset={4} style={homepage_style}>
            <Divider orientation="right">הסיפורים שלי</Divider>
            <Row justify="end">
            <a href="#" style={{padding:"8px"}}>כל הסיפורים</a>
            </Row>
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <Dropdown.Button type="text" 
                icon={<MoreOutlined style={{color: "white"}}/>}
                
                buttonsRender={([leftButton, rightButton]) => [
                    <Tooltip title="tooltip" key="leftButton">
                    {leftButton}
                    </Tooltip>,
                    React.cloneElement(rightButton, { ghost: true }),
                    ]} 
                
                onClick={handleButtonClick} overlay={menu} size="small" style={{ color:"white", position: "absolute", bottom: '10px'}}>

                </Dropdown.Button>
            </Col>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <Dropdown.Button type="text" 
                icon={<MoreOutlined style={{color: "white"}}/>}
                
                buttonsRender={([leftButton, rightButton]) => [
                    <Tooltip title="tooltip" key="leftButton">
                    {leftButton}
                    </Tooltip>,
                    React.cloneElement(rightButton, { ghost: true }),
                    ]} 
                
                onClick={handleButtonClick} overlay={menu} size="small" style={{ color:"white", position: "absolute", bottom: '10px'}}>

                </Dropdown.Button>
            </Col>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <Dropdown.Button type="text" 
                icon={<MoreOutlined style={{color: "white"}}/>}
                
                buttonsRender={([leftButton, rightButton]) => [
                    <Tooltip title="tooltip" key="leftButton">
                    {leftButton}
                    </Tooltip>,
                    React.cloneElement(rightButton, { ghost: true }),
                    ]} 
                
                onClick={handleButtonClick} overlay={menu} size="small" style={{ color:"white", position: "absolute", bottom: '10px'}}>

                </Dropdown.Button>
            </Col>
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={card_props} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                <Dropdown.Button type="text" 
                icon={<MoreOutlined style={{color: "white"}}/>}
                
                buttonsRender={([leftButton, rightButton]) => [
                    <Tooltip title="tooltip" key="leftButton">
                    {leftButton}
                    </Tooltip>,
                    React.cloneElement(rightButton, { ghost: true }),
                    ]} 
                
                onClick={handleButtonClick} overlay={menu} size="small" style={{ color:"white", position: "absolute", bottom: '10px'}}>

                </Dropdown.Button>
            </Col>
            </Row>
            <div style={{"padding-top": "40px", "padding-bottom": "30px", direction:"rtl"}}>
            <Button type="primary" shape="round" icon={<PlusOutlined />} size={"large"}>
            צור סיפור חדש
            </Button>
            </div>
            <Divider orientation="right">איך זה עובד?</Divider>
            <Row gutter={16}> 
            <Col className="gutter-row" span={8}>
            <div style={style}><SlideCard cardProps={card_props} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/></div>
            </Col>
            </Row>
        </div>
    )
}