import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Col, Image, Layout, Row } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import SlideCard from '../Components/SlideCard/SliceCard';

const { Sider } = Layout;


const StoryMainPage = withRouter((props) => {
        return (
            <Layout>
                <Sider
                style={{
                    height: '100vh',
                  }}
                  >
                        <Header>
                            Header
                        </Header>
                        <Row
                            justify="center"
                        >
                            <SlideCard cardProps={{onClick: ()=>alert('test')}} imageUrl='https://futurism.com/wp-content/uploads/2015/11/neildegrassetyson.jpg'/>
                        </Row>
                </Sider>
                <Content>
                  another test
                </Content>
            </Layout>
            // <div>
            //     StoryMainPage
            //     {props.history.location.pathname}
            //     <button
            //     onClick={() =>{props.history.push("/")}}
            //     >CLICK</button>
            //     <button
            //         onClick={() =>{console.log(props.history.location)}}
            //     >LOG</button>
            // </div>
        )
    }
);

 export default StoryMainPage;
