import './App.scss';
import React from 'react';
import 'antd/dist/antd.css';
import AppRouter from "./Router/AppRouter";
import 'antd/dist/antd.css';
import {checkJwt} from "./Actions/jwtActions";
import { connect } from 'react-redux';


function App(props) {
  return(
      <AppRouter
          isLogged={checkJwt(props.jwtToken)}
      />
  )
}
const mapStateToProps = state => {
  return {
      jwtToken: state.usersReducer.jwtToken,
      //darkMode: state.sitesReducer.darkMode
  }
};
export default connect(mapStateToProps, null)(App);
