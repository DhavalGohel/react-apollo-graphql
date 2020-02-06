import React from "react";

export default function(ComposedComponent) {
  class AuthHoc extends React.Component {
    componentWillMount() {
      if (!sessionStorage.getItem("token")) {
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!sessionStorage.getItem("token")) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return AuthHoc;
}
