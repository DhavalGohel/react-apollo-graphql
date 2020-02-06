import React from "react";

import "./App.css";
import LoginPage from "./Page/LoginPage";
import HomePage from "./Page/HomePage";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { withApollo } from "react-apollo";
import AuthHoc from "./AuthHoc";

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={AuthHoc(HomePage)} />
        </Switch>
      </>
    );
  }
}

export default withRouter(withApollo(App));
