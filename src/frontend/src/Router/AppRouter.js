import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import CreateStoryPage, {EditStoryCard} from "../Pages/CreateStoryPage";
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

                                    <Route path="/story/:story_id"  exact={true} component={StoryMainPage}/>

                                    <Route path="/create" component={CreateStoryPage}/>
                                    {/* <Route path="/edit" component={EditStoryCard}/> */}

                                    {/* <Route path="/login" component={LoginPage}/> */}

                                    <Route exact path="/" component={HomePage}/>

                                </div>
                        }
                    </Switch>

            </Router>
        )

}
