import React from "react";
import Home from "../Component/Home";
import Header from "../Component/Header";

export default class HomePage extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <>
        <Header></Header>
        <Home />
      </>
    );
  }
}
