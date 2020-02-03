import React from "react";
import { clientId, redirectUrl } from "../Config";

export default class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <a
                  className="btn btn-outline-primary"
                  href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${clientId}&redirect_uri=${redirectUrl}`}
                >
                  {" "}
                  Login with Github
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
