import React from "react";
import Home from "../Component/Home";
import Header from "../Component/Header";
import { Redirect } from "react-router-dom";

export default class HomePage extends React.Component {
  render() {
    const token = sessionStorage.getItem("token");
    const { location } = this.props;
    if (token == null && location.pathname !== "/login") {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Header></Header>
        <Home />
      </>
    );
  }
}
