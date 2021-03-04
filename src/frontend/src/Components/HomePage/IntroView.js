import React from 'react';
import ReactPlayer from 'react-player';
import { Typography, Row, Col, Divider } from "antd";


const { Title } = Typography;


const IntroView = props => {return <> 
    <Divider orientation="right"><Title level={3}>איך זה עובד?</Title></Divider>
    <Row gutter={16}>
        <Col className="gutter-row" span={8}>
            <ReactPlayer
                url={props.url}
                light={true}
                playing
                controls
            />
        </Col>
    </Row>
</>
};

export default IntroView;