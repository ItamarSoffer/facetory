import "./App.css";
import React from "react";
import "antd/dist/antd.css";
import AppRouter from "./Router/AppRouter";
import "antd/dist/antd.css";
import { checkJwt } from "./Actions/jwtActions";
import { connect } from "react-redux";
import ImageSearch from "./Components/imageComponents/imageSearch";

function App(props) {
  return (
    // <AppRouter
    //     isLogged={checkJwt(props.jwtToken)}
    // />
    <ImageSearch />
  );
}
const mapStateToProps = (state) => {
  return {
    jwtToken: state.usersReducer.jwtToken
    //darkMode: state.sitesReducer.darkMode
  };
};
export default connect(mapStateToProps, null)(App);
