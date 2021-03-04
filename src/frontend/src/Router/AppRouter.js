import React, {useState} from 'react';
import {
    LoginOutlined,
    RedditOutlined
} from '@ant-design/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import CreateStoryPage from "../Pages/CreateStoryPage";
import SlideEditorPage from "../Pages/SlideEditorPage";
import StoryViewerPage from "../Pages/StoryViewerPage";
import StoryMainPage from "../Pages/StoryMainPage";
import {FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed} from "@react-firebase/auth";
import firebase from "firebase";
import {Breadcrumb, Button, Layout, Menu} from "antd";
import {Header} from "antd/lib/layout/layout";
import {Content, Footer} from "antd/es/layout/layout";


export default function AppRouter(props) {
    const [token, setToken] = useState(0);
    return (
        <Router>
            <Switch>
                <FirebaseAuthConsumer>
                    {({isSignedIn, user}) => {
                        return !isSignedIn ?
                            <div>
                                <Route path="/" component={LoginPage}/>
                            </div> :
                            <div>
                                <div className="logo"/>
                                <Menu theme="dark" mode="horizontal" selectable={false}>
                                    <Menu.Item key="logout" onClick={() => {
                                        firebase.auth().signOut();
                                    }}>
                                        <LoginOutlined/>
                                    </Menu.Item>
                                    <RedditOutlined style={{float: "left", fontSize: "32px", marginTop: "5px"}}/>
                                </Menu>
                                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                                    <div>
                                        <Route path="/story/:story_id/view" exact={true}
                                               component={StoryViewerPage}/>
                                        <Route path="/story/:story_id/editor" exact={true}
                                               component={SlideEditorPage}/>
                                        <Route path="/story/:story_id" exact={true} component={StoryMainPage}/>
                                        <Route path="/create" component={CreateStoryPage}/>
                                        <Route path="/login" component={LoginPage}/>
                                        <Route exact path="/" component={HomePage}/>
                                    </div>
                                </Content>
                            </div>
                    }}
                        </FirebaseAuthConsumer>
                        </Switch>

                        </Router>
                        )

                    }
