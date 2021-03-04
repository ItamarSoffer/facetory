import './App.css';
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
}
const mapStateToProps = state => {
  return {
    jwtToken: state.usersReducer.jwtToken,
    //darkMode: state.sitesReducer.darkMode
  }
};
export default connect(mapStateToProps, null)(App);
