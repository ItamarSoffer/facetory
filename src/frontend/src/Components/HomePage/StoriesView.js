import React from 'react';
import { Typography, Row, Col, Divider, Button } from "antd";
import {connect} from 'react-redux'
import SlideCard from '../SlideCard/SliceCard';
import ThreeDotsMenu from './ThreeDotMenu';
import {setCurrentStoryAction} from '../../Actions/editStoryAction'
const {Title} = Typography;
const homepage_card_style = { "margin": "0px", "width": "100%" };


const StoriesView = props => (<>
    <Divider orientation="right"><Title level={2}>הסיפורים שלי</Title></Divider>
    <Row justify="end">
        <Button type="link">
            כל הסיפורים
        </Button>
    </Row>
    <Row gutter={16}>
        {props.stories.map(story => (
            <Col className="gutter-row" span={6}>
                <SlideCard cardProps={{ onClick: () => {
                    props.setCurrentStory(story);
                    props.history.push({ pathname: `/story/${story.storyId}` })
                }
             }} cardStyle={homepage_card_style} imageUrl={story.thumbnail} />
                <ThreeDotsMenu></ThreeDotsMenu>
            </Col>
        ))}
    </Row>
</>
);
const mapDispatchToProps = dispatch => {
    return {
        setCurrentStory: (currentStory) => {
            dispatch(setCurrentStoryAction(currentStory));
        }
    }
};

export default connect(null, mapDispatchToProps)(StoriesView);
