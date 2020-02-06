import React from "react";
import Login from "../Component/Login";
import AuthService, { getParamsFromUrl } from "../Services/AuthService";
import { Redirect } from "react-router";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }
  async componentDidMount() {
    if (!sessionStorage.getItem("token") && getParamsFromUrl("code")) {
      await this.authService.login(getParamsFromUrl("code")).then(response => {
        sessionStorage.setItem("token", `${response.access_token}`);
        window.location.href = "/";
      });
    }
  }
  render() {
    if (sessionStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    return <Login />;
  }
}
