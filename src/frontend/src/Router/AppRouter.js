import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import CreateStoryPage, {EditStoryCard} from "../Pages/CreateStoryPage";
import StoryViewerPage from "../Pages/StoryViewerPage";
import EditStoryPage from "../Pages/EditStoryPage";
import StoryMainPage from "../Pages/StoryMainPage";
import ImagePopup from '../Components/imageComponents/ImagePopup';

import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {LoadingComponent} from '../Components/LoadingComponent/LoadingComponent';
import AppMenu from '../Components/HomePage/AppMenu';
import SlideEditor from '../Components/SlideEditor/SlideEditor';


export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <FirebaseAuthConsumer>
                    {({isSignedIn, providerId}) => {
                        if (providerId === null) {
                            return <LoadingComponent/>;
                        }
                        if (!isSignedIn) {
                            return <div>
                                <Route path="/" component={LoginPage}/>
                            </div>;
                        }
                        return <div>
                            {/* {AppMenu()} */}
                            {/* TODO: adapt url */}
                            <Route path="/story/:story_id/view" exact={true} component={StoryViewerPage}/>

                            <Route path="/story/:story_id/editor" exact={true} component={SlideEditor}/>

                            <Route path="/story/:storyId"  exact={true} component={EditStoryPage}/>
                                    
                             <Route path="/story/:storyId/main"  exact={true} component={StoryMainPage}/>

                             <Route path="/create" component={CreateStoryPage}/>
                             {/* <Route path="/edit" component={EditStoryCard}/> */}

                             {/* <Route path="/login" component={LoginPage}/> */}

                            <Route path='/image-popup' component={ImagePopup} />

                            <Route exact path="/" component={HomePage} />

                        </div>
                    }
                }
             </FirebaseAuthConsumer>
        </Switch>
    </Router>
    )
}
