import React from 'react';
import { Typography, Row, Col, Divider } from "antd";

import SlideCard from '../SlideCard/SliceCard';
import ThreeDotsMenu from './ThreeDotMenu';

const {Title} = Typography;
const homepage_card_style = { "margin": "0px", "width": "100%" };


const StoriesView = props => (<>
    <Divider orientation="right"><Title level={2}>הסיפורים שלי</Title></Divider>
    <Row justify="end">
        <a href="#" style={{ padding: "8px" }}>כל הסיפורים</a>
    </Row>
    <Row gutter={16}>
        {props.stories.map(story => (
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={{ onClick: () => props.history.push({ pathname: `/story/${story.storyId}` }) }} cardStyle={homepage_card_style} imageUrl={story.thumbnail} />
                <ThreeDotsMenu></ThreeDotsMenu>
            </Col>
        ))}
    </Row>
</>
);

export default StoriesView;