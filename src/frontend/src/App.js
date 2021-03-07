import './App.scss';
import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from "./Router/AppRouter";
import 'antd/dist/antd.css';
import {checkJwt} from "./Actions/jwtActions";
import {connect} from 'react-redux';
import {ConfigProvider} from 'antd';
import firebase from "firebase/app";
import "firebase/auth";
import {
    FirebaseAuthProvider,
    FirebaseAuthConsumer
} from "@react-firebase/auth";
import {firebaseCreds} from './firebase_creds';


function App(props) {
    return (
        <FirebaseAuthProvider {...firebaseCreds} firebase={firebase}>
            <ConfigProvider direction="rtl">
                <AppRouter />
            </ConfigProvider>
        </ FirebaseAuthProvider>
    )
}

const mapStateToProps = state => {
    return {
        jwtToken: state.usersReducer.jwtToken,
        //darkMode: state.sitesReducer.darkMode
    }
};
export default connect(mapStateToProps, null)(App);
