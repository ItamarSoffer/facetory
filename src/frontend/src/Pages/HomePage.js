import React, { useEffect, useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';

import IntroView from '../Components/HomePage/IntroView';
import StoriesView from '../Components/HomePage/StoriesView';
import NewStoryButton from '../Components/HomePage/CreateNewStory';
import "antd/dist/antd.css";


const homepage_style = { "padding": "20px", direction: "rtl" };

const HomePage = withRouter((props) => {
    const [stories, setStories] = useState([]);
    const userId = 0;
    const history = useHistory();

    useEffect(() => {
        axios.post("http://localhost:1337/Stories/", { userId }).then(res => {
            const stories = res.data.stories;
            setStories(stories);
        })
    }, []);
    console.log(stories);
    return (
        <div offset={4} style={homepage_style}> 
            <StoriesView stories={stories} history={history}></StoriesView>
            <NewStoryButton history={history}></NewStoryButton>
            {/* The URL should be replaced with the tutorial video for the system  */}
            <IntroView url='https://www.youtube.com/watch?v=ysz5S6PUM-U'></IntroView>;
        </div>
    )
});

export default HomePage;