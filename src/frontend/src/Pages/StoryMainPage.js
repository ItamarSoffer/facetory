import React from 'react';
import {withRouter} from 'react-router-dom';

const StoryMainPage = withRouter((props) => {
        return (
            <div>
                StoryMainPage
                {props.history.location.pathname}
                <button
                onClick={() =>{props.history.push("/")}}
                >CLICK</button>
                <button
                    onClick={() =>{console.log(props.history.location)}}
                >LOG</button>
            </div>
        )
    }
);

 export default StoryMainPage;