import React from 'react';
import {LoadingComponent} from "../Components/LoadingComponent/LoadingComponent";

import ReactDOM from "react-dom";
import "antd/dist/antd.css";
//import "./index.css";
import { Row, Col, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
//import { Appbar } from 'react-native-paper';


const style = { background: "#0092ff", padding: "8px 0" };


export default function HomePage () {
    return (
            <div offset={4}>
            <a href="#">All stories</a>
            <Divider orientation="left">My stories</Divider>
            <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
            </Col>
            <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
            </Col>
            </Row>
            <Divider orientation="left" />
            <Button type="primary" shape="round" icon={<PlusOutlined />} size={"large"}>
            Create a new story
            </Button>
            <Divider orientation="left">How it works?</Divider>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>
                <div style={style}>col-6</div>
            </Col>
            </Row>
            HomePage
            <LoadingComponent/>
        </div>
    )
}