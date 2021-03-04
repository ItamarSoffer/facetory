import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import HomePage from "../Pages/HomePage";
import CreateStoryPage, {EditStoryCard} from "../Pages/CreateStoryPage";
import StoryViewerPage from "../Pages/StoryViewerPage";
import EditStoryPage from "../Pages/EditStoryPage";
import StoryMainPage from "../Pages/StoryMainPage";
import ImagePopup from '../Components/imageComponents/ImagePopup';


export default function AppRouter(props) {

    return (
        <Router>
            <Switch>

                {
                    !props.isLogged ?

                        <div>
                            <Route path="/" component={LoginPage} />
                        </div> :
                        <div>

                            {/* TODO: adapt url */}
                            <Route path="/story/:story_id/view" exact={true} component={StoryViewerPage} />

                             <Route path="/story/:storyId"  exact={true} component={EditStoryPage}/>
                                    
                             <Route path="/story/:storyId/main"  exact={true} component={StoryMainPage}/>

                             <Route path="/create" component={CreateStoryPage}/>
                             {/* <Route path="/edit" component={EditStoryCard}/> */}

                             {/* <Route path="/login" component={LoginPage}/> */}

                            <Route path='/image-popup' component={ImagePopup} />

                            <Route exact path="/" component={HomePage} />

                        </div>
                }
            </Switch>

        </Router>
    )

}
