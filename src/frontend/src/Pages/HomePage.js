import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

import { Typography, Row, Col, Divider, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactPlayer from 'react-player'
import SlideCard from '../Components/SlideCard/SliceCard';
import ThreeDotsMenu from '../Components/HomePage/ThreeDotMenu';
import "antd/dist/antd.css";

const { Title, Text } = Typography;

const style = { padding: "0px" };

const homepage_style = { "padding": "20px", direction: "rtl" };
const homepage_card_style = { "margin": "0px", "width": "100%" };

const HomePage = withRouter((props) => {
    const [stories, setStories] = useState([]);
    const userId = 0;
    const history = useHistory();

    useEffect(() => {
        axios.post("http://localhost:1337/Stories/", { userId }).then(res => {
            const stories = res.data.stories;
            setStories(stories);
        })
    }, []);
    console.log(stories);
    return (
        <div offset={4} style={homepage_style}>
            <Divider orientation="right"><Title level={2}>הסיפורים שלי</Title></Divider>
            <Row justify="end">
                <a href="#" style={{ padding: "8px" }}>כל הסיפורים</a>
            </Row>
            <Row gutter={16}>
                {stories.map(story => (
                    <Col className="gutter-row" span={6}>
                        <SlideCard cardProps={{ onClick: () => history.push({ pathname: `/story/${story.storyId}` }) }} cardStyle={homepage_card_style} imageUrl={story.thumbnail} />
                        <ThreeDotsMenu></ThreeDotsMenu>
                    </Col>
                ))}
            </Row>
            <div style={{ "padding-top": "40px", "padding-bottom": "30px", direction: "rtl" }}>
                <Button onClick={() => { history.push({ pathname: "/create" }) }} type="primary" shape="round" icon={<PlusOutlined />} size={"large"}>
                    צור סיפור חדש
            </Button>
            </div>

            {/* The URL should be replaced with the tutorial video for the system  */}
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
});

export default HomePage;