import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, withRouter } from 'react-router-dom';
import { Image, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import SlideCard from '../Components/SlideCard/SliceCard';
import {
    ApartmentOutlined,
  } from '@ant-design/icons';
import { getQueryStringParams } from '../Actions/queryStringActions';
import axios from 'axios';

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
    const currentId = query.slideId;
    useEffect(() => {
        axios.post(`http://localhost:1337/GetSlides/${storyId}`, {storyId, userId:123}).then(res => {
            setSlides(res.data.slides);
        }).catch(err => console.log(err))
    }, [storyId]);

    const currentImageUrl = slides[currentId] ? slides[currentId].picture : 0;
    return (
        <Layout>
            <Sider
            style={{
                height: '100vh',
                backgroundColor: '#ffffff',
                boxShadow: '10px 10px 10px 10px',
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
            </Sider>
            <Content>
                <div>
                    <Image src={currentImageUrl}/>
                </div>
            </Content>
        </Layout>
    )}
);

export default (StoryMainPage);
