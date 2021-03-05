import React from 'react';
import {LoginForm} from "../Components/LoginPage/LoginComponent";
import { connect } from 'react-redux';
import {checkJwt} from "../Actions/jwtActions";
import {loginAction} from '../Actions/loginActions';

import {
    withRouter
} from "react-router-dom";
import {IfFirebaseAuthed} from "@react-firebase/auth";

export function LoginPage ({login, isLogged, history}) {

    const loginHandler = ({email,password}) => {
        login(email,password);
        if(isLogged === true) {
            history.push({pathname: `/`,})
        }
    };
    /*return (
        <div>
            LoginPage
        </div>
    )*/
    return <div>
        <LoginForm loginHandler={loginHandler} />
    </div>

}

// when IsLogged is changed, run checkJwt
const mapStateToProps = state => {
    return {
        isLogged: checkJwt(state.usersReducer.jwtToken),

    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email,password) => {
            dispatch(loginAction(email,password));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
