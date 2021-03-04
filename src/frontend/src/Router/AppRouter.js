import React, {useState} from 'react';
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
import {Button} from "antd";


export default function AppRouter(props) {
    const [token, setToken] = useState(0);
    return (
        <Router>
            <Switch>
                <FirebaseAuthConsumer>
                    {({isSignedIn, user}) => {
                        return !isSignedIn ? <div>
                            <Route path="/" component={LoginPage}/>
                        </div> :
                            <div>
                                <Button type="primary" className="login-form-button" style={{width: '350px', margin: '10px'}} onClick={()=>{
                                    firebase.auth().signOut();
                                }}>
                                    Log Out
                                </Button>
                                <Button type="primary" className="login-form-button" style={{width: '350px', margin: '10px'}} onClick={()=>{
                                    user.getIdToken(true).then((t)=>{setToken(t)})
                                }}>
                                    Get token
                                </Button>

                                {token}

                                <Route path="/story/:story_id/view" exact={true} component={StoryViewerPage}/>

                                <Route path="/story/:story_id/editor" exact={true} component={SlideEditorPage}/>

                                <Route path="/story/:story_id"  exact={true} component={StoryMainPage}/>

                                <Route path="/create" component={CreateStoryPage}/>

                                <Route path="/login" component={LoginPage}/>

                                <Route exact path="/" component={HomePage}/>
                            </div>
                    }}
                </FirebaseAuthConsumer>
            </Switch>

        </Router>
    )

}
