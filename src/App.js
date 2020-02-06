import React from "react";

import "./App.css";
import LoginPage from "./Page/LoginPage";
import HomePage from "./Page/HomePage";
import AuthService from "./Services/AuthService";
import { getParamsFromUrl } from "./Services/AuthService";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { withApollo } from "react-apollo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount() {
    if (!sessionStorage.getItem("token") && getParamsFromUrl("code")) {
      this.authService.login(getParamsFromUrl("code")).then(response => {
        sessionStorage.setItem("token", `${response.access_token}`);
        window.location.href = "/";
      });
    }
  }

  render() {
    const token = sessionStorage.getItem("token");
    const { location } = this.props;
    if (token != null && location.pathname === "/login") {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
      </>
    );
  }
}

export default withRouter(withApollo(App));
