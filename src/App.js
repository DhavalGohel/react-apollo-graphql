import React from "react";

import "./App.css";
import LoginPage from "./Page/LoginPage";
import HomePage from "./Page/HomePage";
import AuthService from "./Services/AuthService";
import { getParamsFromUrl } from "./Services/AuthService";
import { Switch, Route, withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { withApollo } from "react-apollo";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  componentDidMount() {
    this.authService.login(getParamsFromUrl("code"));
  }

  render() {
    const token = sessionStorage.getItem("token");
    const { location } = this.props;
    if (token == null && location.pathname !== "/login") {
      return <Redirect to="/login" />;
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
