import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import CreateStoryPage from "../Pages/CreateStoryPage";
import SlideEditorPage from "../Pages/SlideEditorPage";
import StoryViewerPage from "../Pages/StoryViewerPage";
import StoryMainPage from "../Pages/StoryMainPage";


export default function AppRouter(props) {

        return(
            <Router>
                    <Switch>

                        {
                            ! props.isLogged ?

                                <div>
                                    <Route path="/" component={LoginPage}/>
                                </div> :
                                <div>

                                    {/* TODO: adapt url */}
                                    <Route path="/story/:story_id/view" exact={true} component={StoryViewerPage}/>

                                    <Route path="/story/:story_id/editor" exact={true} component={SlideEditorPage}/>

                                    <Route path="/story/:storyId"  exact={true} component={StoryMainPage}/>

                                    <Route path="/create" component={CreateStoryPage}/>

                                    <Route path="/login" component={LoginPage}/>

                                    <Route exact path="/" component={HomePage}/>

                                </div>
                        }
                    </Switch>

            </Router>
        )

}
