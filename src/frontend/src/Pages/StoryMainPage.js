import React, { useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import { Image, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import SlideCard from '../Components/SlideCard/SliceCard';
import { connect } from 'react-redux';
import {
    ApartmentOutlined,
  } from '@ant-design/icons';
import { getQueryStringParams } from '../Actions/queryStringActions';

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

    const { slides } = props;
    const currentImageUrl = slides[query.slideId] ? slides[query.slideId].imageUrl : 0;
        return (
            <Layout>
                <Sider
                style={{
                    height: '100vh',
                    backgroundColor: '#ffffff',
                    boxShadow: '10px',
                  }}
                  >
                    <Row justify='center' style={{marginTop: '10px'}}>
                        <ApartmentOutlined style={{ fontSize: '24px', color: 'black' }} />
                    </Row>
                    {
                        slides.map((slide, index) => (
                            <Row justify='center' style={{height: '150px'}}>
                                <SlideCard cardProps={{onClick: ()=>editUrl(history, index)}} imageUrl={slide.imageUrl}/>
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
        )
    }
);
const mapStateToProps = state => ({
    slides: [
        {imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=853&q=80'},
        {imageUrl: 'https://static.toiimg.com/photo/72975551.cms'},
    ],
})

export default connect(mapStateToProps)(StoryMainPage);
