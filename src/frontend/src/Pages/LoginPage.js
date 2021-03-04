import React from 'react';
import {LoginForm} from "../Components/LoginPage/LoginComponent";
import { connect } from 'react-redux';
import {checkJwt} from "../Actions/jwtActions";
import {loginAction} from '../Actions/loginActions';

import {
    withRouter
} from "react-router-dom";

export function LoginPage ({login, isLogged, history}) {
    
    const loginHandler = (email,password) => {
        console.log(email, password)
  
        login(email,password);
        console.log(email, password)
        if( email == "barkai")
        {
            console.log("barkai mod activated")
            history.push({pathname: `/barkai`, })
      
        }
    
        if(isLogged === true) {
            if( email == "barkai")
            {
            console.log("barkai mod activated")
              history.push({pathname: `/barkai`, })
          
            }
            else
            {
                history.push({pathname: `/`,})
            }
        }
    };
    /*return (
        <div>
            LoginPage
        </div>
    )*/
    return <LoginForm loginHandler={loginHandler} />
    
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