import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, withRouter } from 'react-router-dom';
import { Image, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import SlideCard from '../Components/SlideCard/SliceCard';
import SlideEditor from '../Components/SlideEditor/SlideEditor';
import {
    ApartmentOutlined,
  } from '@ant-design/icons';
import { getQueryStringParams } from '../Actions/queryStringActions';
import axios from 'axios';
import NewSquare from '../Components/NewSquare/NewSqure';
import { LoadingComponent } from '../Components/LoadingComponent/LoadingComponent';

const { Sider } = Layout;

const editUrl = (history, newId) => {
    const pathName = history.location.pathname;
    let currentSearchQuery = getQueryStringParams(history.location.search);
    currentSearchQuery.slideId = newId ? newId : 0;
    history.push({
        pathname: pathName,
        search: "?" + new URLSearchParams(
            {...currentSearchQuery}
        ).toString()
    });
}

const StoryMainPage = withRouter((props) => {
    const query = getQueryStringParams(useLocation().search);
    const history = useHistory();
    const { storyId } = useParams();

    const [slides, setSlides] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const currentId = query.slideId;
    useEffect(async () => {
        setLoading(true);
        axios.post(`http://localhost:1337/GetSlides/`, {storyId, userId:123}).then(res => {
            setSlides(res.data.slides);
            setLoading(false)
        }).catch( err => console.log(err));
    }, [storyId]);

    const currentImageUrl = slides[currentId] ? slides[currentId].picture : 0;
    return (
        isLoading
        ? <LoadingComponent/>
        : <Layout>
            <Sider
            style={{
                height: '100vh',
                backgroundColor: '#ffffff',
                boxShadow: '10px 0px 10px 10px',
                }}
                >
                <Row justify='center' style={{marginTop: '10px'}}>
                    <ApartmentOutlined style={{ fontSize: '24px', color: 'black' }} />
                </Row>
                {
                    slides.map((slide, index) => (
                        <Row justify='center'>
                            <SlideCard
                                cardProps={{onClick: ()=>editUrl(history, index)}}
                                imageUrl={slide.picture}
                                cardStyle={index === parseInt(currentId) ? {boxShadow: '0 0 2px 1px #02A9DA'} : {}}
                            />
                        </Row>
                    ))
                }
                <div style={{height: '7px'}}/>
                <Row justify='center'>
                    <NewSquare style={{marginTop: '10px'}} onClick={() => console.log('newSlide')}/>
                </Row>
            </Sider>
                <SlideEditor/>
            {/* <Content>
            </Content> */}
        </Layout>
    )}
);

export default StoryMainPage;
