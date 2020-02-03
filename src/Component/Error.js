import React from "react";
const ErrorMessage = ({ error }) => (
  <div className="alert alert-danger">
    <small>{error.toString()}</small>
  </div>
);

export default ErrorMessage;
