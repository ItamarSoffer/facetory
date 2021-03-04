<<<<<<< HEAD
import "./App.css";
import React from "react";
import "antd/dist/antd.css";
import AppRouter from "./Router/AppRouter";
import "antd/dist/antd.css";
import { checkJwt } from "./Actions/jwtActions";
import { connect } from "react-redux";

function App(props) {
  return (
    <AppRouter
        isLogged={checkJwt(props.jwtToken)}
    />
  );
=======
import './App.scss';
import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from "./Router/AppRouter";
import 'antd/dist/antd.css';
import { checkJwt } from "./Actions/jwtActions";
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';
import './Styles/index'

function App(props) {
  return (
    <ConfigProvider direction='rtl'>
      <AppRouter
        isLogged={checkJwt(props.jwtToken)}
      />
    </ConfigProvider>
  )
>>>>>>> 3b89579d3f37c83ca8e1de5e63dddbdffdd42597
}
const mapStateToProps = (state) => {
  return {
<<<<<<< HEAD
    jwtToken: state.usersReducer.jwtToken
    //darkMode: state.sitesReducer.darkMode
  };
=======
    jwtToken: state.usersReducer.jwtToken,
    //darkMode: state.sitesReducer.darkMode
  }
>>>>>>> 3b89579d3f37c83ca8e1de5e63dddbdffdd42597
};
export default connect(mapStateToProps, null)(App);
