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


export default function AppRouter() {

        return(
            <Router>
                    <Switch>

                        {
                            // !this.props.isLogged ?
                            false ?

                                <div>
                                    <Route path="/" component={LoginPage}/>
                                </div> :
                                <div>

                                    {/* TODO: adapt url */}
                                    <Route path="/view" component={StoryViewerPage}/>

                                    <Route path="/editor" component={SlideEditorPage}/>

                                    <Route path="/create" component={CreateStoryPage}/>

                                    <Route path="/login" component={LoginPage}/>

                                    <Route exact={true} path="/" component={HomePage}/>

                                </div>
                        }
                    </Switch>

            </Router>
        )

}
